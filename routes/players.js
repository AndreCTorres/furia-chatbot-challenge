const express = require('express');
const router = express.Router();
const dataLoader = require('../dataLoader');

// Todos os jogadores do time (Titular, Reserva, Técnico)
router.get('/players', (req, res) => {
    res.json(dataLoader.data.players || []);
});

module.exports = router;