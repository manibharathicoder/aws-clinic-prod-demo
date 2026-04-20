const fs = require('fs');
const path = require('path');
const { Pool, Client } = require('pg');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const sslConfig = { rejectUnauthorized: false };

async function ensureDatabaseExists() {
  // Connect to the default 'postgres' DB to check/create 'aim_dev'
  const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: 'postgres',        // always exists on every PG server
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: sslConfig,
  });

  await client.connect();
  console.log('✅ Connected to postgres (default) database.');

  const res = await client.query(
    `SELECT 1 FROM pg_database WHERE datname = $1`,
    [process.env.DB_NAME]
  );

  if (res.rows.length === 0) {
    // CREATE DATABASE cannot be run inside a transaction, so we use raw query
    await client.query(`CREATE DATABASE "${process.env.DB_NAME}"`);
    console.log(`✅ Database "${process.env.DB_NAME}" created.`);
  } else {
    console.log(`✅ Database "${process.env.DB_NAME}" already exists.`);
  }

  await client.end();
}

async function runMigration() {
  try {
    console.log('🔄 Starting database migration...');

    // Step 1: Make sure the database exists
    await ensureDatabaseExists();

    // Step 2: Now connect to the actual app database
    const pool = new Pool({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      ssl: sslConfig,
    });

    // Step 3: Create tables by running all SQL files in the migrations directory
    const migrationsDir = path.join(__dirname, 'migrations');
    const migrationFiles = fs.readdirSync(migrationsDir)
      .filter(file => file.endsWith('.sql'))
      .sort(); // Run in alphabetical order (001, 002, etc.)

    console.log(`📂 Found ${migrationFiles.length} migration files.`);

    for (const file of migrationFiles) {
      console.log(`🚀 Running migration: ${file}...`);
      const sqlPath = path.join(migrationsDir, file);
      const sql = fs.readFileSync(sqlPath, 'utf8');
      await pool.query(sql);
    }
    console.log('✅ All migrations executed (or already exist).');

    // Step 4: Seed if empty
    const checkUser = await pool.query('SELECT * FROM users LIMIT 1');
    if (checkUser.rows.length === 0) {
      console.log('🌱 Database is empty — seeding default users...');
      const hash = await bcrypt.hash('password', 12);
      await pool.query(
        `INSERT INTO users (email, password_hash, role, name) VALUES
          ('superadmin@aim.com', $1, 'super_admin', 'Super Admin'),
          ('admin@aim.com',      $1, 'admin',       'Admin User'),
          ('accounting@aim.com', $1, 'accounting',  'Accountant'),
          ('therapist@aim.com',  $1, 'therapist',   'Therapist'),
          ('family@aim.com',     $1, 'family',      'Family Member')`,
        [hash]
      );
      console.log('✅ Users seeded successfully!');
    } else {
      console.log('✅ Users already seeded — skipping.');
    }

    // Step 5: Seed clinic data if families empty
    const checkFamily = await pool.query('SELECT * FROM families LIMIT 1');
    if (checkFamily.rows.length === 0) {
      console.log('🌱 Families table is empty — seeding clinic data...');
      // We can just require and run the seeder logic or run the SQL directly.
      // For simplicity, I will just run the insert here.
      const users = await pool.query("SELECT id, role FROM users");
      const familyUser = users.rows.find(u => u.role === 'family');
      const therapistUser = users.rows.find(u => u.role === 'therapist');

      if (familyUser && therapistUser) {
        const famRes = await pool.query(
          "INSERT INTO families (user_id, full_name, phone) VALUES ($1, 'Johnson Family', '555-0101') RETURNING id",
          [familyUser.id]
        );
        const childRes = await pool.query(
          "INSERT INTO children (family_id, first_name, last_name, diagnosis) VALUES ($1, 'Liam', 'Johnson', 'Speech Delay') RETURNING id",
          [famRes.rows[0].id]
        );
        const therapistRes = await pool.query(
          "INSERT INTO therapists (user_id, full_name, specialty) VALUES ($1, 'Dr. Sarah Mitchell', 'Speech-Language Pathologist') RETURNING id",
          [therapistUser.id]
        );
        await pool.query(
          "INSERT INTO sessions (child_id, therapist_id, scheduled_at, status) VALUES ($1, $2, NOW() + interval '1 day', 'scheduled')",
          [childRes.rows[0].id, therapistRes.rows[0].id]
        );
        console.log('✅ Clinic data seeded successfully!');
      }
    }

    await pool.end();
    console.log('✅ Migration complete!');
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1); // non-zero = real failure
  }
}

runMigration();
