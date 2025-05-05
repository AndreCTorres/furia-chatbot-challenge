const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

router.get('/players', (req, res) => {
    const filePath = path.join(__dirname, '../static/data/players.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler players.json:', err);
            return res.status(500).json({ erro: 'Erro ao carregar jogadores' });
        }
        res.json(JSON.parse(data));
    });
});

module.exports = router;
