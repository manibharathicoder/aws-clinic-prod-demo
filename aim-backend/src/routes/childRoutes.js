// src/routes/childRoutes.js
const express = require('express');
const router = express.Router();
const childController = require('../controllers/childController');
const { verifyToken, requireRole } = require('../middleware/auth');

// Middleware to verify token for all child routes
router.use(verifyToken);

router.get('/', childController.getChildren);
router.post('/', requireRole('super_admin', 'admin'), childController.createChild);

module.exports = router;
