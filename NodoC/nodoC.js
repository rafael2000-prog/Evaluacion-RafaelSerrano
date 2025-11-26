const express = require('express');
const app = express();

app.use(express.json());

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});


app.post('/verificar', async (req, res) => {
  try {
    const mensaje = req.body;

    
    mensaje.power_level -= 5;

    
    mensaje.audit_trail.push('C_verified');

    
    res.json(mensaje);
  } catch (error) {
    console.error('Error en Nodo C:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(4000, () => console.log('Nodo-C escuchando en puerto 4000'));

