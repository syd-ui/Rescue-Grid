const express = require('express');
const app = express();

// Middleware pour lire le JSON envoyé par l'IoT
app.use(express.json());

app.post('/api/iot/hello', (req, res) => {
    console.log("Message reçu de l'IoT :", req.body);
    
    // Réponse au format JSON
    res.status(200).json({
        status: "success",
        message: "Bonjour reçu, bienvenu sur le serveur Rescue Grid !"
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur prêt sur le port ${PORT}`);
});