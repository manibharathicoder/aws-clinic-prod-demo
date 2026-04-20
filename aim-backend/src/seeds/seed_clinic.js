// src/seeds/seed_clinic.js
const pool = require('../config/db');

async function seedClinic() {
  try {
    console.log('🌱 Seeding clinic data...');

    // 1. Get a family user
    const familyRes = await pool.query("SELECT id FROM users WHERE role = 'family' LIMIT 1");
    if (familyRes.rows.length === 0) throw new Error('No family user found');
    const familyUserId = familyRes.rows[0].id;

    // 2. Create Family record
    const famInsert = await pool.query(
      `INSERT INTO families (user_id, full_name, phone, address) 
       VALUES ($1, 'The Johnson Family', '555-0123', '123 Maple St, Brampton')
       ON CONFLICT DO NOTHING RETURNING id`,
      [familyUserId]
    );
    const familyId = famInsert.rows[0]?.id || (await pool.query("SELECT id FROM families LIMIT 1")).rows[0].id;

    // 3. Create Children
    const child1 = await pool.query(
      `INSERT INTO children (family_id, first_name, last_name, date_of_birth, diagnosis)
       VALUES ($1, 'Liam', 'Johnson', '2017-05-12', 'Speech Delay') RETURNING id`,
      [familyId]
    );
    const child2 = await pool.query(
      `INSERT INTO children (family_id, first_name, last_name, date_of_birth, diagnosis)
       VALUES ($1, 'Ava', 'Johnson', '2019-08-20', 'Motor Coordination') RETURNING id`,
      [familyId]
    );

    // 4. Get a therapist user
    const therapistUserRes = await pool.query("SELECT id FROM users WHERE role = 'therapist' LIMIT 1");
    const therapistUserId = therapistUserRes.rows[0].id;

    // 5. Create Therapist record
    const therapistInsert = await pool.query(
      `INSERT INTO therapists (user_id, full_name, specialties, specialty, hourly_rate)
       VALUES ($1, 'Dr. Sarah Mitchell', '{"Speech Therapy", "Language Development"}', 'Senior SLP', 120.00) RETURNING id`,
      [therapistUserId]
    );
    const therapistId = therapistInsert.rows[0].id;

    // 6. Create Service
    const serviceInsert = await pool.query(
      `INSERT INTO services (name, code, rate_per_hour)
       VALUES ('Speech Assessment', 'SLP-001', 150.00) ON CONFLICT (code) DO NOTHING RETURNING id`
    );
    const serviceId = serviceInsert.rows[0]?.id || (await pool.query("SELECT id FROM services LIMIT 1")).rows[0].id;

    // 7. Create Sessions
    await pool.query(
      `INSERT INTO sessions (child_id, therapist_id, service_id, scheduled_at, duration_min, status)
       VALUES 
       ($1, $3, $4, NOW() + interval '1 day', 60, 'scheduled'),
       ($2, $3, $4, NOW() - interval '2 days', 60, 'completed')`,
      [child1.rows[0].id, child2.rows[0].id, therapistId, serviceId]
    );

    console.log('✅ Clinic data seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err.message);
    process.exit(1);
  }
}

seedClinic();
