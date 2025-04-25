const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Ruta para registrar un nuevo usuario
router.post('/register', authController.register);

// Ruta para login
router.post('/login', authController.login);

// Ruta para verificar token
router.get('/verify', authController.verify);

module.exports = router;
