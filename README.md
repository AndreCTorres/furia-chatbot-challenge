# FURIA Fanbot

Este projeto é um chatbot para fãs da equipe FURIA, focado em fornecer informações sobre o time, jogadores, partidas e conteúdo de fãs. O projeto utiliza Node.js com Express para o backend e serve páginas estáticas e dinâmicas para interação dos usuários.

## Justificativa da Stack

**Por que Node.js/Express?**

O projeto foi desenvolvido utilizando Node.js e Express como backend principal, pois:
- Permite integração direta e eficiente com a biblioteca oficial da HLTV para dados de CS.
- Facilita a comunicação com o front-end, que também utiliza JavaScript, tornando o desenvolvimento mais ágil e consistente.
- É uma stack moderna, muito utilizada em aplicações web em tempo real, chats e bots.
- Permite fácil expansão para recursos como WebSockets, integração com Telegram e deploy em serviços cloud.

A escolha por Node.js/Express visa entregar uma experiência fluida, moderna e alinhada com as melhores práticas do mercado para aplicações interativas.

## Funcionalidades

- 🎮 **Próximos Jogos**: Acompanhe a agenda de partidas da FURIA.
- 👥 **Membros da Equipe**: Veja informações sobre os jogadores atuais da equipe (anteriormente "Ver Elenco Atual").
- 🏆 **Títulos**: Conheça o histórico de vitórias do time.
- ✨ **Curiosidades**: Descubra fatos interessantes sobre a FURIA e seus jogadores. 
- 📚 **Termos do CS**: Aprenda gírias e termos comuns do Counter-Strike.
- 📰 **Notícias**: Veja as últimas notícias da HLTV sobre a FURIA.
- 📈 **Ranking**: Confira a posição atual da FURIA no ranking mundial.
- 💬 **Chat Interativo**: Converse sobre o time e receba atualizações. Botões de sugestão (quick replies) abaixo das mensagens ajudam o usuário a conhecer as funcionalidades do chatbot.

## Tecnologias Utilizadas

- Frontend:
  - HTML5/CSS3 com design responsivo
  - JavaScript (ES6+)
  - Web Notifications API
  - LocalStorage para histórico de chat e perfil do usuário
  
- Backend:
  - Node.js
  - Express.js
  - API do HLTV (via biblioteca `hltv`)
  - Sistema de cache em memória (`node-cache`)

## Configuração e Instalação

1.  **Pré-requisitos:** Certifique-se de ter o Node.js (versão 14 ou superior) e o npm instalados.
2.  **Clonar o repositório:**
    ```bash
    git clone <url-do-repositorio>
    cd furia-fanbot
    ```
3.  **Instalar dependências:**
    ```bash
    npm install
    ```
4.  **Iniciar o servidor:**
    - Para produção:
      ```bash
      npm start
      ```
    - Para desenvolvimento (com reinício automático usando `nodemon`):
      ```bash
      npm run dev 
      ```
      *(Observação: Pode ser necessário ajustar permissões de execução para o nodemon no ambiente de desenvolvimento: `chmod +x node_modules/.bin/nodemon`. Atenção: Durante o desenvolvimento, podem ocorrer erros de sintaxe temporários devido a edições no código.)*

O projeto estará rodando por padrão em `http://localhost:3000`.

## Estrutura do Projeto

```
furia-fanbot/
├── dataLoader.js       # Módulo para carregar e cachear dados (HLTV, JSONs)
├── chatbot_logic.js    # Lógica principal do chatbot (processamento de mensagens)
├── routes/
│   ├── chatbot.js      # Rota da API para o chat
│   └── players.js      # Rota da API para dados de jogadores
├── static/
│   ├── css/            # Arquivos CSS (style.css, chatbot.css, cards.css)
│   ├── js/             # Arquivos JavaScript do frontend (chat.js, index.js)
│   └── images/         # Imagens estáticas (logos, backgrounds)
├── templates/
│   └── index.html      # Arquivo HTML principal com a interface do chat
├── server.js           # Arquivo principal do servidor Express
├── package.json        # Metadados do projeto e dependências
├── package-lock.json   # Lockfile das dependências
└── README.md           # Este arquivo
```

## APIs e Endpoints
-   API não oficial encontrada no github para manipular os dados do HLTV. Porém, com algumas limitações.
-   `POST /api/send_message`: Endpoint principal do chatbot. Recebe a mensagem do usuário no corpo da requisição (`{ "message": "sua mensagem" }`) e retorna a resposta do bot em JSON, incluindo o texto da resposta e possíveis ações (`{ "response": "...", "actions": [...] }`). Pode incluir `introText` para mensagens introdutórias.
-   Outros endpoints podem existir em `routes/` para buscar dados específicos (ex: jogadores, notícias), mas a interação principal ocorre via `/api/send_message`.

## Features Planejadas

- [ ] Integração com Telegram
- [ ] Alertas de partidas ao vivo
- [ ] Estatísticas em tempo real
- [ ] Enquetes e predictions
- [ ] Sistema de achievements para fãs

## Licença

Distribuído sob a licença MIT.

## Contato

Desenvolvedor:
André Torres - [LinkedIn]: (https://www.linkedin.com/in/andrectorress/) 
               [E-mail:]: andrectorres17@gmail.com

