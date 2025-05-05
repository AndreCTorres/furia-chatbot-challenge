const express = require('express');
const router = express.Router();
const dataLoader = require('../dataLoader');

// Endpoint para retornar as notícias da FURIA (cache)
router.get('/news', (req, res) => {
    res.json(dataLoader.data.news || []);
});

module.exports = router;
