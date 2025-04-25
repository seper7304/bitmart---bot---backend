// routes/botRoutes.js placeholder
const express = require('express');
const router = express.Router();
const {
  createBot,
  startBot,
  stopBot,
  getBotByUser,
  updateBotStrategy
} = require('../controllers/bot.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/', authMiddleware, createBot);
router.get('/', authMiddleware, getBotByUser);
router.post('/:botId/strategy/start', authMiddleware, startBot);
router.post('/:botId/strategy/stop', authMiddleware, stopBot);
router.put('/:botId/strategy', authMiddleware, updateBotStrategy);

module.exports = router;
