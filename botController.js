const Bot = require('../models/Bot');

exports.createBot = async (req, res) => {
  const bot = await Bot.create({ userId: req.userId, ...req.body });
  res.status(201).json(bot);
};

exports.getBotByUser = async (req, res) => {
  const bots = await Bot.find({ userId: req.userId });
  res.json(bots);
};

exports.startBot = async (req, res) => {
  const bot = await Bot.findByIdAndUpdate(req.params.botId, { status: 'RUNNING' }, { new: true });
  res.json(bot);
};

exports.stopBot = async (req, res) => {
  const bot = await Bot.findByIdAndUpdate(req.params.botId, { status: 'STOPPED' }, { new: true });
  res.json(bot);
};

exports.updateBotStrategy = async (req, res) => {
  const bot = await Bot.findByIdAndUpdate(req.params.botId, { strategy: req.body }, { new: true });
  res.json(bot);
};
