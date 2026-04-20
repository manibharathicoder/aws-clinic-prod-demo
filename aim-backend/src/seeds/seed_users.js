const pool = require('../config/db');
const bcrypt = require('bcryptjs');

async function seed() {
  try {
    const hash = await bcrypt.hash('password', 12);
    
    await pool.query(`
      INSERT INTO users (email, password_hash, role, name) VALUES
      ('superadmin@aim.com', $1, 'super_admin', 'Super Admin'),
      ('admin@aim.com',      $1, 'admin',        'Admin User'),
      ('accounting@aim.com', $1, 'accounting',   'Accountant'),
      ('therapist@aim.com',  $1, 'therapist',    'Therapist'),
      ('family@aim.com',     $1, 'family',       'Family Member')
      ON CONFLICT (email) DO NOTHING
    `, [hash]);
    
    console.log('✅ Users seeded successfully!');
  } catch (error) {
    console.error('Error seeding users:', error);
  } finally {
    process.exit(0);
  }
}

seed();