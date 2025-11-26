const express = require('express');
const app = express();

app.use(express.json());


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

