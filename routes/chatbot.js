// routes/chatbot.js
const express = require("express");
const router = express.Router();
const dataLoader = require("../dataLoader");
const { processMessage } = require("../chatbot_logic.js");

// Middleware para garantir respostas JSON
router.use(express.json());

// Nova rota mais direta
router.post("/send_message", async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ 
            error: "Mensagem não fornecida",
            response: "Por favor, envie uma mensagem válida."
        });
    }

    try {
        const botResponse = await processMessage(message);
        res.json(botResponse);
    } catch (error) {
        console.error("Erro ao processar mensagem:", error);
        res.status(500).json({
            error: "Erro interno",
            response: "Desculpe, tive um problema para processar sua mensagem. Pode tentar novamente?"
        });
    }
});

module.exports = router;

