const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB conectado'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

// Rutas de ejemplo
app.get('/', (req, res) => {
  res.send('Bitmart Bot Backend is Running');
});

// Endpoint de métricas
app.get('/api/metrics', (req, res) => {
  res.json({ message: 'Métricas simuladas' });
});

// Endpoint de configuración de estrategia
app.get('/api/strategy/config', (req, res) => {
  res.json({ message: 'Configuración de estrategia simulada' });
});

// Endpoint para órdenes activas
app.get('/api/orders/active', (req, res) => {
  res.json({ orders: [] });
});

// Endpoint para historial de órdenes
app.get('/api/orders/history', (req, res) => {
  res.json({ orders: [] });
});

// Iniciar y detener la estrategia (simulados)
app.post('/api/strategy/start', (req, res) => {
  res.json({ status: 'started' });
});

app.post('/api/strategy/stop', (req, res) => {
  res.json({ status: 'stopped' });
});

// Puerto
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
