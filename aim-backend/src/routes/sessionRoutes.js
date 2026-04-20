// src/routes/sessionRoutes.js
const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');
const { verifyToken, requireRole } = require('../middleware/auth');

router.use(verifyToken);

router.get('/', sessionController.getSessions);
router.post('/', requireRole('super_admin', 'admin'), sessionController.createSession);

module.exports = router;
