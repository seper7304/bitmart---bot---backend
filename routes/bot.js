const express = require('express');
const router = express.Router();
const botController = require('../controllers/botController');
const auth = require('../middleware/auth');

// Proteger todas las rutas del bot con middleware de autenticación
router.post('/start', auth, botController.startBot);
router.post('/stop', auth, botController.stopBot);
router.get('/status', auth, botController.getBotStatus);
router.post('/config', auth, botController.updateConfig);
router.get('/config', auth, botController.getConfig);
router.get('/orders/active', auth, botController.getActiveOrders);
router.get('/orders/history', auth, botController.getOrderHistory);
router.get('/metrics', auth, botController.getMetrics);

module.exports = router;
