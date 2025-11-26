const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());


app.post('/procesar', async (req, res) => {
  try {
    const mensaje = req.body;

 
    if (mensaje.power_level % 2 === 0) {
     
      mensaje.power_level *= 2;
    } else {
      
      mensaje.power_level += 1;
    }

    
    mensaje.audit_trail.push('B_processed');

  
    const response = await axios.post('http://nodo-c:4000/verificar', mensaje);

  
    res.json(response.data);
  } catch (error) {
    console.error('Error en Nodo B:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log('Nodo-B escuchando en puerto 3000'));
