const express = require('express');
const path = require('path');
const chatbotRoutes = require('./routes/chatbot');
const dataLoader = require('./dataLoader');
const playersRoutes = require('./routes/players');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.static('static'));

// Rota principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'index.html'));
});

// Carrega dados e inicia servidor
const PORT = process.env.PORT || 3000;

dataLoader.loadAll().then(() => {
    // Só registra as rotas do chatbot depois dos dados carregados!
    app.use('/api', chatbotRoutes);
    app.use('/api', playersRoutes);

    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}).catch(err => {
    console.error("Erro ao carregar dados:", err);
    process.exit(1);
});
