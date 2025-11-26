const express = require('express');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const app = express();

app.use(express.json());


app.post('/iniciar', async (req, res) => {
  try {
    const initialValue = req.body.valor;
    
    if (typeof initialValue !== 'number') {
      return res.status(400).json({ error: 'Valor debe ser numérico' });
    }

    
    const mensaje = {
      _id: uuidv4(),
      power_level: initialValue,
      audit_trail: []
    };

    
    const response = await axios.post('http://nodo-b:3000/procesar', mensaje);

    
    const mensajeFinal = response.data;
    const valorFinal = mensajeFinal.power_level;

    console.log(`CICLO COMPLETADO: ${valorFinal}`);
    res.json({ resultado: valorFinal, mensaje: mensajeFinal });
  } catch (error) {
    console.error('Error en Nodo A:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(2000, () => console.log('Nodo-A escuchando en puerto 2000'));