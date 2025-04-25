const Bot = require('../models/Bot');
const User = require('../models/User');

// Iniciar el bot
exports.startBot = async (req, res) => {
  try {
    const userId = req.user.id;
    // Lógica para iniciar el bot (cronjob, etc.)
    await Bot.findOneAndUpdate({ user: userId }, { status: 'RUNNING' });
    res.status(200).json({ message: 'Bot iniciado.' });
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar el bot.' });
  }
};

// Detener el bot
exports.stopBot = async (req, res) => {
  try {
    const userId = req.user.id;
    await Bot.findOneAndUpdate({ user: userId }, { status: 'STOPPED' });
    res.status(200).json({ message: 'Bot detenido.' });
  } catch (error) {
    res.status(500).json({ error: 'Error al detener el bot.' });
  }
};

// Obtener estado del bot
exports.getBotStatus = async (req, res) => {
  try {
    const userId = req.user.id;
    const bot = await Bot.findOne({ user: userId });
    res.status(200).json({ status: bot?.status || 'UNKNOWN' });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el estado del bot.' });
  }
};

// Obtener configuración actual
exports.getConfig = async (req, res) => {
  try {
    const userId = req.user.id;
    const bot = await Bot.findOne({ user: userId });
    res.status(200).json(bot?.strategyConfig || {});
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la configuración.' });
  }
};

// Actualizar configuración
exports.updateConfig = async (req, res) => {
  try {
    const userId = req.user.id;
    const newConfig = req.body;
    const bot = await Bot.findOneAndUpdate(
      { user: userId },
      { strategyConfig: newConfig },
      { upsert: true, new: true }
    );
    res.status(200).json(bot.strategyConfig);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la configuración.' });
  }
};

// Órdenes activas
exports.getActiveOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const bot = await Bot.findOne({ user: userId });
    res.status(200).json(bot?.activeOrders || []);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener órdenes activas.' });
  }
};

// Historial de órdenes
exports.getOrderHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const bot = await Bot.findOne({ user: userId });
    res.status(200).json(bot?.orderHistory || []);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener historial de órdenes.' });
  }
};

// Métricas generales
exports.getMetrics = async (req, res) => {
  try {
    const userId = req.user.id;
    const bot = await Bot.findOne({ user: userId });

    const metrics = {
      totalCycles: bot?.orderHistory?.length || 0,
      activeOrders: bot?.activeOrders?.length || 0,
      profit: bot?.profit || 0,
    };

    res.status(200).json(metrics);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener métricas.' });
  }
};
