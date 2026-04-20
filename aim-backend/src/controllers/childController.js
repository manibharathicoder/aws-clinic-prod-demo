// src/controllers/childController.js
const pool = require('../config/db');

async function getChildren(req, res) {
  try {
    let query = `
      SELECT c.*, f.full_name as family_name
      FROM children c
      JOIN families f ON c.family_id = f.id
      WHERE c.is_active = true
    `;
    const params = [];

    // Simple role-based isolation (placeholder for full implementation)
    if (req.user.role === 'family') {
        // Find family linked to this user
        const famRes = await pool.query('SELECT id FROM families WHERE user_id = $1', [req.user.id]);
        if (famRes.rows.length === 0) return res.json({ children: [] });
        query += ' AND c.family_id = $1';
        params.push(famRes.rows[0].id);
    }

    const result = await pool.query(query + ' ORDER BY c.last_name', params);
    res.json({ success: true, children: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
}

async function createChild(req, res) {
  const { family_id, first_name, last_name, date_of_birth, diagnosis, notes } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO children (family_id, first_name, last_name, date_of_birth, diagnosis, notes)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [family_id, first_name, last_name, date_of_birth, diagnosis, notes]
    );
    res.status(201).json({ success: true, child: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
}

module.exports = { getChildren, createChild };
