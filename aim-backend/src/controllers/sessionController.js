// src/controllers/sessionController.js
const pool = require('../config/db');

async function getSessions(req, res) {
  const { from, to, therapist_id, child_id, status } = req.query;
  try {
    let query = `
      SELECT s.*, 
             c.first_name as child_first_name, c.last_name as child_last_name,
             t.full_name as therapist_name,
             srv.name as service_name
      FROM sessions s
      JOIN children c ON s.child_id = c.id
      JOIN therapists t ON s.therapist_id = t.id
      LEFT JOIN services srv ON s.service_id = srv.id
      WHERE 1=1
    `;
    const params = [];
    let pCount = 1;

    if (from) {
      query += ` AND s.scheduled_at >= $${pCount++}`;
      params.push(from);
    }
    if (to) {
      query += ` AND s.scheduled_at <= $${pCount++}`;
      params.push(to);
    }
    if (therapist_id) {
      query += ` AND s.therapist_id = $${pCount++}`;
      params.push(therapist_id);
    }
    if (child_id) {
      query += ` AND s.child_id = $${pCount++}`;
      params.push(child_id);
    }
    if (status) {
      query += ` AND s.status = $${pCount++}`;
      params.push(status);
    }

    // Role-based access control
    if (req.user.role === 'therapist') {
      const tRes = await pool.query('SELECT id FROM therapists WHERE user_id = $1', [req.user.id]);
      if (tRes.rows.length > 0) {
        query += ` AND s.therapist_id = $${pCount++}`;
        params.push(tRes.rows[0].id);
      }
    } else if (req.user.role === 'family') {
      const cRes = await pool.query('SELECT id FROM children WHERE family_id = (SELECT id FROM families WHERE user_id = $1)', [req.user.id]);
      const childIds = cRes.rows.map(r => r.id);
      if (childIds.length > 0) {
        query += ` AND s.child_id = ANY($${pCount++})`;
        params.push(childIds);
      } else {
        return res.json({ success: true, sessions: [] });
      }
    }

    const result = await pool.query(query + ' ORDER BY s.scheduled_at DESC', params);
    res.json({ success: true, sessions: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
}

async function createSession(req, res) {
  const { child_id, therapist_id, service_id, scheduled_at, duration_min, location, notes } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO sessions (child_id, therapist_id, service_id, scheduled_at, duration_min, location, notes)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [child_id, therapist_id, service_id, scheduled_at, duration_min, location, notes]
    );
    res.status(201).json({ success: true, session: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
}

module.exports = { getSessions, createSession };
