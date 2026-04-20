// src/routes/therapistRoutes.js
const express = require('express');
const router = express.Router();
const therapistController = require('../controllers/therapistController');
const { verifyToken, requireRole } = require('../middleware/auth');

router.use(verifyToken);

router.get('/', therapistController.getTherapists);
router.get('/me', requireRole('therapist'), therapistController.getMyProfile);

module.exports = router;
