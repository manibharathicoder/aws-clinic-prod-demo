// src/config/index.js
// Central configuration — extend as needed when DB/JWT are wired up.

module.exports = {
  port: process.env.PORT || 5000,
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  jwt: {
    secret: process.env.JWT_SECRET || 'changeme',
    expiresIn: process.env.JWT_EXPIRES_IN || '8h',
  },
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    name: process.env.DB_NAME || 'aim_dev',
    user: process.env.DB_USER || 'aim_admin',
    password: process.env.DB_PASSWORD || '',
  },
};
