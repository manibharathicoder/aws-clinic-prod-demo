// src/controllers/therapistController.js
const pool = require('../config/db');

async function getTherapists(req, res) {
  try {
    const result = await pool.query(
      'SELECT id, full_name, specialties, specialty, bio, is_active, hire_date FROM therapists WHERE is_active = true ORDER BY full_name'
    );
    res.json({ success: true, therapists: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
}

async function getMyProfile(req, res) {
  try {
    const result = await pool.query(
      'SELECT * FROM therapists WHERE user_id = $1',
      [req.user.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Therapist profile not found' });
    }
    res.json({ success: true, therapist: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
}

module.exports = { getTherapists, getMyProfile };
