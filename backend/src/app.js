const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/iot/hello', (req, res) => {
  console.log('Message reçu de l\'IoT :', req.body);

  res.status(200).json({
    status: 'success',
    message: 'Bonjour reçu, bienvenu sur le serveur Rescue Grid !'
  });
});

app.use('/api', require('./routes/deviceRoutes'));
app.use('/api', require('./routes/alertRoutes'));

module.exports = app;