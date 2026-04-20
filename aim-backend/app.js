require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

// ─── Security Middleware ───────────────────────────────────────────────────────
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));

// ─── Body Parsers ──────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Routes ───────────────────────────────────────────────────────────────────
const authRoutes = require('./src/routes/authRoutes');
const childRoutes = require('./src/routes/childRoutes');
const therapistRoutes = require('./src/routes/therapistRoutes');
const sessionRoutes = require('./src/routes/sessionRoutes');
const { verifyToken } = require('./src/middleware/auth');

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/children', childRoutes);
app.use('/api/v1/therapists', therapistRoutes);
app.use('/api/v1/sessions', sessionRoutes);

app.get('/api/v1/health', (req, res) => {
  res.status(200).json({ success: true, message: 'AIM API running' });
});

app.get('/', (req, res) => {
  res.status(200).send('Elastic Beanstalk Health Check OK');
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// ─── Start Server ──────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅  AIM API running on http://localhost:${PORT}`);
  console.log(`   Health check → http://localhost:${PORT}/api/v1/health`);
});

module.exports = app;
