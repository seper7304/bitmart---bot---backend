const mongoose = require('mongoose');

const BotSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  pair: { type: String, default: 'BTC/USDT' },
  exchange: { type: String, default: 'bitmart' },
  status: { type: String, enum: ['RUNNING', 'STOPPED'], default: 'STOPPED' },
  strategy: {
    baseAmount: Number,
    safetyOrderVolume: Number,
    maxOrders: Number,
    takeProfit: Number,
    cooldown: Number,
  },
}, { timestamps: true });

module.exports = mongoose.model('Bot', BotSchema);
