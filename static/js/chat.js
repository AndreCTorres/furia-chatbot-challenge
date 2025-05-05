// Gerenciamento do histórico de chat
let chatHistory = [];
const MAX_HISTORY = 100;

// Carregar histórico do sessionStorage
function loadChatHistory() {
    const savedHistory = sessionStorage.getItem("furiaChat");
    if (savedHistory) {
        try {
            chatHistory = JSON.parse(savedHistory);
            if (!Array.isArray(chatHistory)) {
                chatHistory = [];
            }
        } catch (e) {
            console.error("Erro ao carregar histórico:", e);
            chatHistory = [];
            sessionStorage.removeItem("furiaChat");
        }
    } else {
        chatHistory = [];
    }
    displayHistory();
}

// Limpar histórico do chat
function clearChatHistory() {
    chatHistory = [];
    sessionStorage.removeItem("furiaChat");
    displayHistory();
}

// Salvar histórico no sessionStorage
function saveChatHistory() {
    if (chatHistory.length > MAX_HISTORY) {
        chatHistory = chatHistory.slice(-MAX_HISTORY);
    }
    try {
        sessionStorage.setItem("furiaChat", JSON.stringify(chatHistory));
    } catch (e) {
        console.error("Erro ao salvar histórico:", e);
    }
}

// Exibir histórico completo
function displayHistory() {
    const chatBox = document.getElementById("chat-box");
    chatBox.innerHTML = "";
    if (chatHistory && chatHistory.length > 0) {
        chatHistory.forEach(msg => {
            const timestamp = msg.timestamp || new Date().toISOString();
            const profile = (msg.type === "user") ? getUserProfile() : null;
            const messageDiv = createMessageElement(msg.text, msg.type, timestamp, msg.data, profile);
            chatBox.appendChild(messageDiv);
        });
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}

// Criar elemento de mensagem com timestamp (PADRONIZADO)
function createMessageElement(text, type, timestamp, data = null, userProfile = null) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${type}-message`;

    const messageContent = document.createElement("div");
    messageContent.className = "message-content";

    // Adiciona avatar (bot ou user)
    if (type === "bot") {
        const avatar = document.createElement("img");
        avatar.src = "/images/user_bot.png"; 
        avatar.alt = "PanteraBot";
        avatar.className = "bot-avatar";
        messageDiv.appendChild(avatar);
    } else if (type === "user" && userProfile) {
        let avatarEl;
        // Verifica se o avatar é um caminho de imagem ou um emoji/texto
        if (userProfile.avatar && userProfile.avatar.startsWith("/")) {
            avatarEl = document.createElement("img");
            avatarEl.src = userProfile.avatar;
            avatarEl.alt = userProfile.nickname;
            avatarEl.className = "bot-avatar"; // Reutiliza a classe ou cria uma específica
        } else {
            avatarEl = document.createElement("span");
            avatarEl.textContent = userProfile.avatar || "🦊"; // Emoji padrão
            avatarEl.className = "bot-avatar";
            // Estilos básicos para emoji/texto como avatar
        }
        messageDiv.appendChild(avatarEl);
    }

    // Adiciona nome do usuário (se for user)
    if (type === "user" && userProfile) {
        const nameEl = document.createElement("div");
        nameEl.className = "message-nickname";
        nameEl.textContent = userProfile.nickname;
        // Estilos podem ser definidos no CSS para .message-nickname
        messageContent.appendChild(nameEl); // Adiciona ANTES do texto
    }

    // --- Tratamento Padronizado do Texto --- 
    const textSpan = document.createElement("span");
    if (typeof text === "string") {
        // Substitui \n por <br> e usa innerHTML para renderizar HTML (como <b>)
        textSpan.innerHTML = text.replace(/\n/g, "<br>");
        // Melhora visual dos links de notícias (remove azul, aplica classe customizada)
        textSpan.querySelectorAll?.("a").forEach(link => {
            link.classList.add("furia-link");
        });
    } else if (typeof text === "object" && text !== null) {
        // Lógica para renderizar objetos (cards, imagens, etc.)
        if (text.type === "image") {
            const img = document.createElement("img");
            img.src = text.src;
            img.alt = text.alt || "Imagem";
            img.style.maxWidth = "100%";
            img.style.borderRadius = "8px";
            img.style.marginTop = "5px";
            textSpan.appendChild(img);
            if (text.caption) {
                const caption = document.createElement("div");
                caption.textContent = text.caption;
                caption.style.fontSize = "0.9em";
                caption.style.color = "#aaa";
                textSpan.appendChild(caption);
            }
        } else if (text.type === "card") {
            // Exemplo de renderização de card
            const card = document.createElement("div");
            card.className = text.className || "bot-card";
            if (text.img) {
                const img = document.createElement("img");
                img.src = text.img;
                img.alt = text.title || "Card image";
                card.appendChild(img);
            }
            if (text.title) {
                const title = document.createElement("div");
                title.className = "card-title";
                // Permite HTML seguro para ícones e destaques
                title.innerHTML = text.title;
                card.appendChild(title);
            }
            if (text.desc) {
                const desc = document.createElement("div");
                desc.className = "card-desc";
                // Permite HTML seguro para destaques
                desc.innerHTML = text.desc;
                card.appendChild(desc);
            }
            if (text.link) {
                const link = document.createElement("a");
                link.href = text.link;
                link.textContent = text.linkLabel || "Saiba mais";
                link.target = "_blank";
                link.className = "card-link";
                card.appendChild(link);
            }
            textSpan.appendChild(card);
        } else {
            // Fallback para outros objetos: mostra como JSON
            textSpan.textContent = JSON.stringify(text);
        }
    } else {
        // Fallback para outros tipos (números, etc.)
        textSpan.textContent = text;
    }

    messageContent.appendChild(textSpan);

    // Add event listeners for dynamically created 'saiba-mais-btn'
    const saibaMaisButtons = textSpan.querySelectorAll('.saiba-mais-btn');
    saibaMaisButtons.forEach(button => {
        button.onclick = () => {
            const tituloIndex = button.getAttribute('data-titulo');
            if (tituloIndex !== null) {
                sendMessage(`saiba mais título ${tituloIndex}`); // Call sendMessage directly
            }
        };
    });

    // Botões customizados (ex: "Saiba mais" em títulos)
    if (data && Array.isArray(data.buttons)) {
        const btnContainer = document.createElement("div");
        btnContainer.style.display = "flex";
        btnContainer.style.flexDirection = "column";
        btnContainer.style.gap = "0.7rem";
        data.buttons.forEach(btnData => {
            const btn = document.createElement("button");
            btn.className = "quick-reply-btn";
            btn.innerHTML = btnData.label;
            btn.onclick = () => sendMessage(btnData.message);
            btnContainer.appendChild(btn);
        });
        messageContent.appendChild(btnContainer);
    }

    // Adiciona botões de jogador se existirem em `data`
    if (data && data.jogadores && Array.isArray(data.jogadores)) {
        const btnContainer = document.createElement("div");
        btnContainer.className = "player-btn-container"; // Use uma classe CSS para estilizar
        data.jogadores.forEach(nome => {
            const btn = document.createElement("button");
            btn.className = "player-btn"; // Use uma classe CSS para estilizar
            btn.textContent = nome;
            btn.onclick = () => {
                // Simula o envio da mensagem com o nome do jogador
                sendMessage(nome);
            };
            btnContainer.appendChild(btn);
        });
        messageContent.appendChild(btnContainer);
    }

    // Adiciona quick replies (actions) se existirem e for mensagem do bot
    if (type === "bot" && data && Array.isArray(data.actions)) { // Verifica data.actions em vez de data
        const quickReplies = document.createElement("div");
        quickReplies.className = "quick-replies-panel"; // Classe para estilização
        data.actions.forEach(action => {
            const btn = document.createElement("button");
            btn.className = "quick-reply-btn"; // Classe para estilização
            // Adiciona ícone se existir
            const iconHtml = action.icon ? `<span class="action-icon">${action.icon}</span> ` : '';
            btn.innerHTML = `${iconHtml}<span class='reply-label'>${action.label}</span>`;
            btn.onclick = () => sendMessage(action.message);
            quickReplies.appendChild(btn);
        });
        // Adiciona o painel de quick replies APÓS o conteúdo da mensagem
        messageContent.appendChild(quickReplies);
    }

    // Adiciona o timestamp
    const timeElement = document.createElement("div");
    timeElement.className = "message-timestamp";
    timeElement.textContent = new Date(timestamp).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
    messageContent.appendChild(timeElement);

    messageDiv.appendChild(messageContent);
    return messageDiv;
}

// Adicionar mensagem ao chat
function addMessage(text, type, data = null) {
    const timestamp = new Date().toISOString();
    const profile = (type === "user") ? getUserProfile() : null;

    // Handle introText separately if it exists (for Termos CS)
    if (data && data.introText) {
        const introTimestamp = new Date(timestamp); // Use same timestamp or slightly earlier
        introTimestamp.setMilliseconds(introTimestamp.getMilliseconds() - 10); // Ensure it appears just before
        const introDiv = createMessageElement(data.introText, type, introTimestamp.toISOString(), null, profile);
        document.getElementById("chat-box").appendChild(introDiv);
        // Now, the main message will be the card object in 'text' (originally data.response)
        text = data.response; 
    }

    const messageDiv = createMessageElement(text, type, timestamp, data, profile);
    document.getElementById("chat-box").appendChild(messageDiv);

    // Ajuste: rolar para o topo da nova mensagem (e não para o final do chat)
    messageDiv.scrollIntoView({ behavior: "smooth", block: "start" });

    // Exibir feedback de forma discreta, abaixo da mensagem, apenas se showFeedback vier true do backend
    if (type === "bot" && data && data.showFeedback) {
        const feedbackDiv = document.createElement("div");
        feedbackDiv.className = "feedback-container";
        feedbackDiv.innerHTML = `<span>Esta resposta foi útil?</span> <span class="feedback-icon" data-feedback="up">👍</span> <span class="feedback-icon" data-feedback="down">👎</span>`;
        const likeBtn = feedbackDiv.querySelector("[data-feedback='up']");
        const dislikeBtn = feedbackDiv.querySelector("[data-feedback='down']");
        likeBtn.onclick = () => handleFeedback("like", text, feedbackDiv);
        dislikeBtn.onclick = () => handleFeedback("dislike", text, feedbackDiv);
        messageDiv.appendChild(feedbackDiv);
    }

    if (type !== "system") {
        chatHistory.push({ text, type, timestamp, data });
        saveChatHistory();
    }
}

// Função para obter perfil do usuário (Exemplo - ajuste conforme sua necessidade)
function getUserProfile() {
    return {
        nickname: localStorage.getItem("userNickname") || "FURIOSO",
        avatar: localStorage.getItem("userAvatar") || "🦊"
    };
}

// Função para exibir modal de perfil se não houver nick/avatar salvos
function checkAndShowProfileModal() {
    if (!localStorage.getItem("userNickname") || !localStorage.getItem("userAvatar")) {
        document.getElementById("profileModal").style.display = "flex";
    }
}

// Função para salvar perfil do usuário
function saveUserProfile(nickname, avatar) {
    localStorage.setItem("userNickname", nickname);
    localStorage.setItem("userAvatar", avatar);
}

// Inicialização do modal de perfil
function setupProfileModal() {
    const modal = document.getElementById("profileModal");
    const closeBtn = document.getElementById("closeProfileModal");
    const form = document.getElementById("profileForm");
    if (!modal || !form) return;
    closeBtn.onclick = () => { modal.style.display = "none"; };
    form.onsubmit = (e) => {
        e.preventDefault();
        const nickname = document.getElementById("nickname").value.trim() || "FURIOSO";
        const avatar = form.avatar.value || "🦊";
        saveUserProfile(nickname, avatar);
        modal.style.display = "none";
        // Atualiza o chat para refletir novo perfil
        displayHistory();
    };
    // Preenche campos se já houver dados
    document.getElementById("nickname").value = localStorage.getItem("userNickname") || "";
    const avatarVal = localStorage.getItem("userAvatar") || "🦊";
    const avatarInputs = form.querySelectorAll('input[name="avatar"]');
    avatarInputs.forEach(input => {
        if (input.value === avatarVal) input.checked = true;
    });
}

// Permitir alteração de perfil pelo usuário (ex: botão no chat header)
document.addEventListener("DOMContentLoaded", () => {
    setupProfileModal();
    checkAndShowProfileModal();
    clearChatHistory();
    renderQuickActions();

    // Saudação inicial dinâmica do backend
    fetch("/api/send_message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: "oi" })
    })
    .then(res => res.json())
    .then(data => {
        addMessage(data.response, "bot", data);
    });

    const sendButton = document.getElementById("send-btn");
    const messageInput = document.getElementById("user-input");

    if (sendButton && messageInput) {
        sendButton.addEventListener("click", () => sendMessage());
        messageInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") sendMessage();
        });
    }

    // Garante que o botão de perfil não seja duplicado
    if (document.getElementById("profileEditBtn")) {
        document.getElementById("profileEditBtn").remove();
    }
    const profileBtn = document.createElement("button");
    profileBtn.innerHTML = '<i class="fas fa-user-edit"></i>';
    profileBtn.title = "Editar perfil";
    profileBtn.className = "profile-edit-btn";
    profileBtn.id = "profileEditBtn";
    profileBtn.onclick = () => {
        document.getElementById("profileModal").style.display = "flex";
        document.getElementById("nickname").value = localStorage.getItem("userNickname") || "";
        const avatarVal = localStorage.getItem("userAvatar") || "🦊";
        const avatarInputs = document.querySelectorAll('#profileForm input[name="avatar"]');
        avatarInputs.forEach(input => {
            input.checked = (input.value === avatarVal);
        });
    };
    const chatHeader = document.querySelector("#furia-chatbot-widget .chat-header");
    const statusIndicator = document.querySelector("#furia-chatbot-widget .status-indicator");
    if (chatHeader && statusIndicator) {
        statusIndicator.insertAdjacentElement('afterend', profileBtn);
    }

    // Fechar chatbot com ESC
    document.addEventListener("keydown", function(e) {
        if (e.key === "Escape") {
            const widget = document.getElementById("furia-chatbot-widget");
            if (widget && widget.classList.contains("furia-chatbot-visible")) {
                widget.classList.remove("furia-chatbot-visible");
                widget.classList.add("furia-chatbot-hidden");
            }
        }
    });
});

// Enviar mensagem para o backend
let chatContext = {}; // Armazena contexto da conversa (ex: último jogador consultado)

async function sendMessage(msg = null, isAction = false) {
    const input = document.getElementById("user-input");
    const message = msg || input.value.trim();
    if (!message) return;

    // Adiciona mensagem do usuário ao chat
    addMessage(message, "user");
    input.value = "";
    
    // Adiciona indicador de digitação
    addTypingIndicator();

    try {
        const res = await fetch("/api/send_message", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({ message })
        });

        if (!res.ok) {
            throw new Error(`Erro na requisição: ${res.status}`);
        }

        const data = await res.json();
        removeTypingIndicator();
        // Limpa chat se backend sinalizar
        if (data.clearChat) {
            clearChatHistory();
        }
        addMessage(data.response, "bot", data);

    } catch (error) {
        console.error("Erro ao enviar mensagem:", error);
        removeTypingIndicator();
        addMessage("Desculpe, tive um problema para processar sua mensagem. Pode tentar novamente?", "bot");
    }
}

// Indicador de digitação
let typingIndicator;
function addTypingIndicator() {
    if (typingIndicator) return; // Já existe um
    const chatBox = document.getElementById("chat-box");
    typingIndicator = document.createElement("div");
    typingIndicator.className = "message bot-message typing-indicator";
    // Adiciona avatar e pontos animados (estilos devem estar no CSS)
    typingIndicator.innerHTML = `
        <img src="/images/user_bot.png" alt="PanteraBot" class="bot-avatar">
        <div class="message-content">
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
        </div>
    `;
    chatBox.appendChild(typingIndicator);
}

function removeTypingIndicator() {
    if (typingIndicator) {
        typingIndicator.remove();
        typingIndicator = null;
    }
}

// Função para renderizar botões de atalho no painel quick-actions
function renderQuickActions() {
    // Lista de atalhos relevantes para fãs da FURIA
    const quickActions = [
        { label: "Próximos Jogos", message: "próxima partida", icon: "🎮" },
        { label: "Curiosidades", message: "curiosidade sobre FURIA", icon: "✨" },
        { label: "Notícias", message: "notícias", icon: "📰" },
        { label: "Títulos", message: "títulos furia", icon: "🏆" },
        { label: "Ranking", message: "ranking atual", icon: "📈" },
        { label: "Termos do CS", message: "glossário", icon: "📚" },
        { label: "Próximos Campeonatos", message: "próximos campeonatos", icon: "🏟️" },
    ];
    const panel = document.getElementById("quick-actions-panel");
    if (!panel) return;
    panel.innerHTML = "";
    quickActions.forEach(action => {
        const btn = document.createElement("button");
        btn.className = "quick-action-btn furia-action-btn";
        btn.innerHTML = `<span class="action-icon">${action.icon}</span> <span class="action-label">${action.label}</span>`;
        btn.setAttribute("data-message", action.message);
        btn.addEventListener("click", () => sendMessage(action.message));
        panel.appendChild(btn);
    });
}

// Função para adicionar mensagem ao chat com suporte a ações
function addMessageToChat(message, sender = "user", actions = null) {
    addMessage(message, sender, actions);
}

// --- Funções Adicionais (Exemplos: Feedback, Notificações, Limpar Histórico) ---

// Função para lidar com feedback
function handleFeedback(type, responseText, feedbackDiv) {
    // Salva feedback no localStorage (pode ser expandido para backend futuramente)
    const feedbacks = JSON.parse(localStorage.getItem("furiaFeedbacks") || "[]");
    feedbacks.push({ type, response: responseText, date: new Date().toISOString() });
    localStorage.setItem("furiaFeedbacks", JSON.stringify(feedbacks));
    // Mostra agradecimento
    feedbackDiv.innerHTML = `<span class='feedback-thanks'>Obrigado pelo feedback! 🖤</span>`;
    setTimeout(() => feedbackDiv.remove(), 2000);
}

