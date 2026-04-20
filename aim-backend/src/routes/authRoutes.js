// src/routes/authRoutes.js
const router = require('express').Router();
const { body } = require('express-validator');
const { login, getMe } = require('../controllers/authController');
const { verifyToken } = require('../middleware/auth');

router.post('/login',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty().isLength({ min: 6 }),
  ],
  login
);

router.get('/me', verifyToken, getMe);

module.exports = router;
