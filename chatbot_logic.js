// chatbot_logic.js
const dataLoader = require("./dataLoader"); // Importa o dataLoader que está na mesma pasta

function getRandom(arr) {
    if (!arr || arr.length === 0) return null;
    return arr[Math.floor(Math.random() * arr.length)];
}

// Curiosidades manuais por jogador/técnico
const playerCuriosities = {
    "FalleN": [
        "Começou a jogar Counter-Strike aos 12 anos, influenciado por seu irmão e pelo ambiente familiar ligado à tecnologia. Seus pais eram donos de uma loja de informática, o que facilitou seu acesso aos jogos eletrônicos.",
        "Seu nick \"FalleN\" foi inspirado na carta \"Fallen Angel\" do jogo de cartas Magic: The Gathering, que ele jogava antes de se dedicar ao Counter-Strike.",
        "Conquistou dois títulos de Major consecutivos: MLG Columbus 2016 e ESL One Cologne 2016, sendo reconhecido como um dos melhores AWPers e líderes do mundo.",
        "Fundou a Games Academy, uma plataforma de ensino para jogadores de CS, que posteriormente se fundiu à Gamers Club. Também possui sua própria linha de periféricos, a Fallen Gear, além da sua loja, a Fallen Store.",
        "Revelou possuir mais de 50 mil horas jogadas em todas as versões do Counter-Strike, o equivalente a aproximadamente 5 anos e 7 meses de jogo contínuo. Ele planeja alcançar 52 mil horas antes de considerar a aposentadoria.",
        "Durante o Major de Xangai, FalleN liderou a FURIA até as quartas de final, destacando-se por uma jogada memorável contra a equipe alemã BIG, adversário que nunca havia vencido anteriormente.",
    ],
    "kscerato": [
        "Durante o PGL Major Stockholm 2021, KSCERATO homenageou seu irmão, Kauan \"KNCERATO\" Cerato, incluindo seu nome em seu adesivo oficial do torneio. Ele expressou que seu irmão foi fundamental para sua entrada no mundo do Counter-Strike e que juntos sonhavam em viver do jogo.",
        "Foi eleito o melhor atleta de CS:GO no Prêmio eSports Brasil 2023, destacando-se como o principal jogador brasileiro da modalidade naquele ano.",
        "É considerado um dos melhores riflers do Brasil e é conhecido por sua habilidade em situações de clutch. Durante sua carreira, venceu mais de 40 situações de 1x1 e possui um rating positivo em todos os grandes eventos que disputou.",
        "skullz já chegou a afirmar que KSCERATO é o jogador mais talentoso com quem já jogou, destacando sua habilidade e impacto no jogo.",
    ],
    "yuurih": [
        "É o jogador mais antigo da line-up e peça fundamental da FURIA desde 2017.",
        "Durante a IEM Cologne 2024, utilizou uma AK-47 Blue Gem emprestada por Neymar, avaliada em aproximadamente R$ 280 mil.",
        "É fã de animes e já chegou a comparar o FalleN ao personagem All Might de \"My Hero Academia\", destacando sua importância como um mentor e líder dentro da equipe."
    ],
    "molodoy":[
        "É natural do Cazaquistão, país que já revelou talentos como Abay \"HObbit\" Khassenov e Aleksei \"Qikert\" Golubev.",
        "Iniciou sua trajetória competitiva aos 15 anos, jogando em LAN houses locais e enfrentando desafios como ping superior a 100ms, mas ainda assim conseguiu superar os 3.500 de elo na FACEIT.",
        "Antes de ingressar na FURIA, atuou por equipes como ALLINNERS, DMS e AMKAL.",
        "Sua estreia oficial pela FURIA está prevista para o PGL Astana 2025, que acontecerá entre os dias 10 e 18 de maio, no Cazaquistão, seu país natal."
    ],
    "YEKINDAR":[
        "Nascido em 4 de outubro de 1999, na Letônia, iniciou sua carreira profissional no Counter-Strike em 2017, passando por equipes como Elements Pro Gaming, pro100 e Virtus.pro.",
        "Reconhecido como um dos entry fraggers mais agressivos do mundo, YEKINDAR se destacou por abrir espaços com inteligência e timing preciso, especialmente durante sua passagem pela Virtus.pro.",
        "Entre suas principais conquistas estão os títulos da Flashpoint Season 2, DreamHack Open December 2020 e cs_summit 7, além de desempenhos de destaque em torneios como IEM Katowice e PGL Major Stockholm 2021.",
    ],
    "chelo": [
        "Começou sua trajetória profissional no Counter-Strike em 2015, passando por equipes como Army5 Gaming, paiN Gaming, Luminosity Gaming, INTZ e MIBR antes de ingressar na FURIA em julho de 2023.",
        "Durante sua passagem pela FURIA, chelo participou de 37 campeonatos, conquistando títulos como o BGS Esports 2023 e o Elisa Masters Espoo 2023.",
        "Conhecido por sua intensidade, chelo afirmou em entrevista que é \"movido a base do ódio para jogar\", destacando sua motivação extra em partidas decisivas."
    ],
    "skullz": [
        "Começou sua trajetória profissional no Counter-Strike em 2017, passando por equipes como YeaH Gaming, W7M Gaming, Team oNe e paiN Gaming.",
        "Durante sua passagem pela FURIA, skullz participou de diversos campeonatos, incluindo o PGL Bucharest 2025 e o BLAST Open Lisbon 2025.",
        "Em julho de 2024, ingressou na FURIA como parte de uma renovação na equipe."
    ],
    "sidde": [
        "Ingressou na FURIA em 2023, assumindo o cargo de treinador principal. Sua contratação foi parte de uma reestruturação da equipe.",
        "Enfatiza a importância de uma mentalidade sólida e de processos bem definidos para o sucesso da equipe. Ele acredita que a consistência e o trabalho árduo são fundamentais para alcançar altos níveis de desempenho.",
        "Sua ascensão sem experiência prévia como jogador profissional serve de inspiração para muitos aspirantes a treinadores, demonstrando que dedicação, estudo e visão estratégica podem levar ao sucesso no competitivo mundo dos esports."
    ]
};

// Frases de introdução para curiosidades de jogadores
const curiosidadeIntros = [
    "Você sabia?<br>",
    "Olha só essa:<br>",
    "Curiosidade quente!<br>",
    "Fato interessante:<br>",
    "Essa é boa:<br>",
    "Atenção para essa:<br>",
    "Anota aí:<br>",
    "Surpreenda-se:<br>",
    "PanteraBot conta:<br>",
    "Direto do servidor:<br>"
];

// Variações de saudação
const saudacoes = [
    "Opa! Sou o PanteraBot da FURIA! Como posso ajudar você hoje? Pode perguntar, fica a vontade!",
    "Fala, FURIOSO! 👊 Pronto para saber tudo sobre a FURIA? Tô aqui pra isso! Manda a boa!",
    "E aí, torcedor(a)! O que você quer saber sobre a FURIA? Estou aqui para te ajudar",
    "E aê! Aqui é o PanteraBot. Estou pronto pra passar todas as infos da FURIA pra você!",
    "Seja bem-vindo ao PanteraBot! Aqui você fica por dentro de tudo sobre o seu time do coração!"
];

async function processMessage(message, context = {}) {
    // Garante que os dados estejam carregados
    if (!dataLoader.data || Object.keys(dataLoader.data).length === 0) {
        return {
            response: "Desculpe, ainda estou carregando as informações da FURIA. Tente novamente em alguns segundos!",
            actions: null,
            context,
            showFeedback: false
        };
    }

    const msg = message.toLowerCase();
    // --- Geração dinâmica dos nomes dos jogadores do elenco atual ---
    const elencoPlayers = [
        ...(dataLoader.data.players || [])
    ];
    // Extrai nomes e nicks únicos
    const nomesJogadores = Array.from(new Set(
        elencoPlayers.flatMap(p => [p.name, p.nick, p.slug, p.fullname])
            .filter(Boolean)
            .map(n => n.toLowerCase())
    ));
    // Monta regex dinâmica (corrigido para não escapar excessivamente)
    const jogadoresRegex = nomesJogadores.length > 0 ? new RegExp(`(${nomesJogadores.map(n => n.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")).join("|")})`, "i") : null;

    // Inicializa contador de feedback se não existir
    if (typeof context.feedbackCounter !== 'number') {
        context.feedbackCounter = 0;
    }
    // Função para decidir se mostra feedback
    function shouldShowFeedback(tipoMensagem) {
        if (tipoMensagem === 'saudacao') return false;
        context.feedbackCounter++;
        return context.feedbackCounter % 3 === 0;
    }

    // Saudações
    if (/^(oi|olá|eae|fala|hey)/i.test(msg)) {
        const saudacao = getRandom(saudacoes);
        return {
            response: `${saudacao}\n\nDica: Use os botões de acesso rápido abaixo para navegar entre as principais informações!`,
            actions: null,
            context,
            showFeedback: false
        };
    }
    // Ranking atual
    if (/(ranking|posição|posicao|classificação|classificacao|rank|colocação|colocacao|top|ranking atual)/i.test(msg)) {
        let ranking = dataLoader.data.ranking;
        if (ranking) {
            let pontos = ranking.points ? `com ${ranking.points} pontos` : "";
            return {
                response: `A FURIA está atualmente na ${ranking.place}ª posição do ranking mundial da HLTV ${pontos}!\n\nSeguimos juntos na torcida para subir ainda mais! 🤍🖤`,
                actions: [
                    { label: "Ver Próximos Jogos", message: "próxima partida" },
                    { label: "Membros da Equipe", message: "elenco" },
                    { label: "Ver Títulos", message: "títulos furia" }
                ],
                context,
                showFeedback: shouldShowFeedback('normal')
            };
        }
        return {
            response: "Não consegui acessar o ranking agora, mas logo logo trago essa info pra você!",
            actions: [
                { label: "Ver Próximos Jogos", message: "próxima partida" },
                { label: "Ver Notícias", message: "notícias" }
            ],
            context,
            showFeedback: shouldShowFeedback('normal')
        };
    }
    // Últimas notícias
    if (/(notícias|noticias|news|novidades|acontecendo)/i.test(msg)) {
        // Corrigir: garantir que dataLoader.data.news está preenchido corretamente
        // e que o frontend está esperando um array de notícias no formato correto.
        const news = dataLoader.data.news;
        let offset = context.newsOffset || 0;
        if (!news || !Array.isArray(news) || news.length === 0) {
            return {
                response: "No momento não consegui acessar as notícias da HLTV sobre a FURIA. Tente novamente em alguns minutos ou acesse diretamente em <a href='https://www.hltv.org/search?query=furia' target='_blank'>HLTV.org</a>.",
                actions: [
                    { label: "Ver Próximos Jogos", message: "próxima partida" },
                    { label: "Membros da Equipe", message: "elenco" },
                    { label: "Ver Ranking", message: "ranking atual" }
                ],
                context,
                showFeedback: shouldShowFeedback('normal')
            };
        }
        // Garante que cada notícia tem title e link válidos
        const newsToShow = news.slice(offset, offset + 5).filter(n => n && n.title && n.link);
        let infoText = "As notícias são coletadas diretamente do site da HLTV e estão em inglês. Clique no título para ler a notícia completa.";
        let newsText = newsToShow.map((n, i) => {
            let finalLink = n.link;
            if (finalLink && typeof finalLink === 'string' && finalLink.startsWith('/news/')) {
                finalLink = `https://www.hltv.org${finalLink}`;
            }
            if (finalLink && typeof finalLink === 'string' && finalLink.startsWith('http://localhost:3000/news/')) {
                finalLink = `https://www.hltv.org${finalLink.substring('http://localhost:3000'.length)}`;
            }
            // Adiciona classe furia-link para estilização no frontend
            return `${offset + i + 1}. <a href='${finalLink}' target='_blank' class='furia-link'>${n.title}</a>`;
        }).join("<br>");
        let actions = [
            { label: "Ver Próximos Jogos", message: "próxima partida" },
            { label: "Membros da Equipe", message: "elenco" },
            { label: "Ver Ranking", message: "ranking atual" }
        ];
        return {
            response: `${infoText}<br><br>Últimas notícias relacionadas a FURIA (HLTV):<br>${newsText}`,
            actions,
            context: { ...context, newsOffset: offset + 5 },
            showFeedback: shouldShowFeedback('normal')
        };
    }

    // Informações sobre jogadores específicos (dinâmico)
    if (jogadoresRegex && jogadoresRegex.test(msg)) {
        const playerName = msg.match(jogadoresRegex)[0].toLowerCase();
        const curiosidadeKey = Object.keys(playerCuriosities).find(
            key => key.toLowerCase() === playerName
        );
        if (curiosidadeKey) {
            const curiosidade = getRandom(playerCuriosities[curiosidadeKey]);
            const intro = getRandom(curiosidadeIntros);
            return {
                response: `${intro} <b>${curiosidadeKey.toUpperCase()}</b>:\n${curiosidade}`,
                actions: [
                    { label: "Quero outra curiosidade", message: `outra curiosidade sobre ${curiosidadeKey}`, isPrimary: true }
                ],
                context: { ...context, lastPlayer: curiosidadeKey },
                showFeedback: shouldShowFeedback('normal')
            };
        }
        let player = elencoPlayers.find(p => {
            return [p.name, p.nick, p.slug, p.fullname].filter(Boolean).map(n => n.toLowerCase()).includes(playerName);
        });
        if (player) {
            return {
                response: `Info sobre ${player.name || player.nick || player.slug}:\n• Função: ${player.role || player.type || "Não disponível"}\n• Nacionalidade: ${player.nationality || (player.country && player.country.name) || "Não disponível"}\n• Mapas jogados: ${player.mapsPlayed || "Não disponível"}\n• Tempo no time: ${player.timeOnTeam || "Não disponível"}`,
                actions: [
                    { label: "Quero uma curiosidade desse jogador", message: `curiosidade sobre ${player.nick || player.name}` }
                ],
                context,
                showFeedback: shouldShowFeedback('normal')
            };
        }
        return {
            response: "Não consegui encontrar informações sobre esse jogador.",
            actions: [
                { label: "Membros da Equipe", message: "elenco" },
                { label: "Ver Próximos Jogos", message: "próxima partida" }
            ],
            context,
            showFeedback: shouldShowFeedback('normal')
        };
    }

    // Se usuário pedir outra curiosidade (usando contexto)
    if (/outra curiosidade/.test(msg) && context.lastPlayer) {
        const curiosidadeKey = context.lastPlayer;
        const curiosidades = playerCuriosities[curiosidadeKey];
        // Busca as já exibidas para esse jogador
        const exibidas = (context.curiosidadesExibidas && context.curiosidadesExibidas[curiosidadeKey]) || [];
        // Filtra as curiosidades restantes
        const restantes = curiosidades.filter(c => !exibidas.includes(c));
        if (restantes.length === 0) {
            // Lista de outros jogadores para sugerir
            const outrosJogadores = elencoPlayers
                .map(p => p.nick || p.name || p.fullname)
                .filter(Boolean)
                .filter(j => j.toLowerCase() !== curiosidadeKey.toLowerCase());
            return {
                response: `Você já viu todas as curiosidades sobre <b>${curiosidadeKey.toUpperCase()}</b>! No momento não tenho mais novidades desse membro.<br><br>Que tal escolher outro jogador ou o técnico para saber mais?`,
                actions: [
                    { label: "Ver outros jogadores", message: "elenco", isPrimary: true },
                    { label: "Ver Próximos Jogos", message: "próxima partida" },
                    { label: "Ver Títulos", message: "títulos furia" }
                ],
                jogadores: outrosJogadores,
                context: { ...context, lastPlayer: undefined },
                showFeedback: shouldShowFeedback('normal')
            };
        }
        // Sorteia uma curiosidade que ainda não foi exibida
        const curiosidade = getRandom(restantes);
        const intro = getRandom(curiosidadeIntros);
        // Atualiza contexto para não repetir
        const novoContexto = { ...context };
        if (!novoContexto.curiosidadesExibidas) novoContexto.curiosidadesExibidas = {};
        if (!novoContexto.curiosidadesExibidas[curiosidadeKey]) novoContexto.curiosidadesExibidas[curiosidadeKey] = [];
        novoContexto.curiosidadesExibidas[curiosidadeKey].push(curiosidade);
        novoContexto.lastPlayer = curiosidadeKey;
        return {
            response: `${intro} <b>${curiosidadeKey.toUpperCase()}</b>:\n${curiosidade}`,
            actions: [
                { label: "Quero mais uma!", message: `outra curiosidade sobre ${curiosidadeKey}`, isPrimary: true }
            ],
            context: novoContexto,
            showFeedback: shouldShowFeedback('normal')
        };
    }

    // Curiosidade individual de jogador/técnico (com controle de repetição)
    const nomesValidos = elencoPlayers.map(p => (p.nick || p.name || p.fullname || "").toLowerCase());
    for (const nome of Object.keys(playerCuriosities)) {
        const nomeRegex = new RegExp(`\\b${nome.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")}\\b`, "i");
        if (nomeRegex.test(msg) && nomesValidos.some(n => n.includes(nome))) {
            // Controle de curiosidades já exibidas
            let curiosidades = playerCuriosities[nome];
            let exibidas = (context.curiosidadesExibidas && context.curiosidadesExibidas[nome]) || [];
            let restantes = curiosidades.filter(c => !exibidas.includes(c));
            if (restantes.length === 0) {
                // Mostra mensagem de fim e botão para ver outros jogadores
                // Lista de jogadores disponíveis (nicks)
                const outrosJogadores = elencoPlayers
                    .map(p => p.nick || p.name || p.fullname)
                    .filter(Boolean)
                    .filter(j => j.toLowerCase() !== nome.toLowerCase());
                return {
                    response: `Você já viu todas as curiosidades sobre <b>${nome.toUpperCase()}</b>! No momento não tenho mais novidades desse membro.<br><br>Que tal escolher outro jogador ou o técnico para saber mais?`,
                    actions: [
                        { label: "Ver outros jogadores", message: "elenco", isPrimary: true },
                        { label: "Ver Próximos Jogos", message: "próxima partida" },
                        { label: "Ver Títulos", message: "títulos furia" }
                    ],
                    jogadores: outrosJogadores,
                    context,
                    showFeedback: shouldShowFeedback('normal')
                };
            }
            const curiosidade = getRandom(restantes);
            const intro = getRandom(curiosidadeIntros);
            // Atualiza contexto
            const novoContexto = { ...context };
            if (!novoContexto.curiosidadesExibidas) novoContexto.curiosidadesExibidas = {};
            if (!novoContexto.curiosidadesExibidas[nome]) novoContexto.curiosidadesExibidas[nome] = [];
            novoContexto.curiosidadesExibidas[nome].push(curiosidade);
            novoContexto.lastPlayer = nome;
            return {
                response: `${intro} <b>${nome.toUpperCase()}</b>:\n${curiosidade}`,
                actions: [
                    { label: "Quero outra curiosidade", message: `outra curiosidade sobre ${nome}`, isPrimary: true }
                ],
                context: novoContexto,
                showFeedback: shouldShowFeedback('normal')
            };
        }
    }

    // Se usuário disser "não" após curiosidade
    if ((/não|nao|chega/i.test(msg)) && context.lastPlayer) {
        return {
            response: "Beleza! Se quiser saber mais sobre outro jogador ou qualquer coisa da FURIA, é só perguntar! 🦊",
            actions: [
                { label: "Membros da Equipe", message: "elenco" },
                { label: "Ver Próximos Jogos", message: "próxima partida" }
            ],
            context: { ...context, lastPlayer: undefined },
            showFeedback: shouldShowFeedback('normal')
        };
    }

    // Sugestão de elenco atual
    if (/(jogadores|jogador|player|players|elenco|time|plantel|roster|squad)/i.test(msg)) {
        const elencoPlayers = dataLoader.data.players || [];
        const nomes = elencoPlayers.map(p => p.nick || p.name || p.fullname).filter(Boolean);
        return {
            response: "Quer saber mais sobre algum dos nossos guerreiros? Clique no nick que eu te conto algo interessante!",
            actions: [
                { label: "Ver Próximos Jogos", message: "próxima partida" },
                { label: "Ver Ranking", message: "ranking atual" },
                { label: "Ver Títulos", message: "títulos furia" }
            ],
            context,
            jogadores: nomes,
            showFeedback: shouldShowFeedback('normal')
        };
    }

    // Curiosidades e conteúdo de fãs
    if (/(curiosidade|fato|conta|interessante)/i.test(msg)) {
        const fanCuriosidades = (dataLoader.data.fanContent && dataLoader.data.fanContent.curiosidades) ? dataLoader.data.fanContent.curiosidades : [];
        const marcos = dataLoader.data.historicoFuria.marcos || [];
        const elenco = dataLoader.data.historicoFuria.elenco || [];
        const melhores = dataLoader.data.historicoFuria.melhoresColocacoes || [];
        const majors = dataLoader.data.historicoFuria.majors || [];
        // Monta um array de curiosidades únicas e envolventes
        let todas = [];
        todas.push(...fanCuriosidades.map(c => ({ tipo: 'curiosidade', texto: c })));
        todas.push(...marcos.map(m => ({ tipo: 'marco', texto: `Em ${m.ano}, a FURIA marcou história: ${m.descricao}` })));
        todas.push(...elenco.map(e => ({ tipo: 'elenco', texto: `No ano de ${e.ano}: ${e.descricao}` })));
        todas.push(...melhores.map(m => ({ tipo: 'melhor', texto: `Melhor resultado: ${m.evento} - ${m.resultado}${m.destaque ? ' | Destaque: ' + m.destaque : ''}${m.detalhe ? ' | Detalhe: ' + m.detalhe : ''}` })));
        todas.push(...majors.map(m => ({ tipo: 'major', texto: `Participação em ${m.nome} (${m.ano}): ${m.colocacao}` })));
        // Controle de repetição
        let exibidas = context.curiosidadesFuriaExibidas || [];
        let restantes = todas.filter(c => !exibidas.includes(c.texto));
        if (restantes.length === 0) {
            return {
                response: "Você já descobriu todas as curiosidades e fatos marcantes da FURIA por enquanto! Em breve teremos mais novidades para você! 🦊✨",
                actions: [
                    { label: "Ver Próximos Jogos", message: "próxima partida" },
                    { label: "Membros da Equipe", message: "elenco" }
                ],
                context,
                showFeedback: shouldShowFeedback('normal')
            };
        }
        const curiosidade = getRandom(restantes);
        let novoContexto = { ...context };
        novoContexto.curiosidadesFuriaExibidas = [...(novoContexto.curiosidadesFuriaExibidas || []), curiosidade.texto];
        let intro = '';
        let responseHtml = '';
        switch (curiosidade.tipo) {
            case 'marco': 
                intro = 'Momento marcante da FURIA:'; 
                responseHtml = `
                    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;">
                        <div style="background:rgba(42,42,42,0.92);border:2px solid #FFD700;border-radius:16px;padding:0.7rem 1rem;max-width:95%;margin-bottom:0.3rem;box-shadow:0 2px 8px 0 rgba(0,0,0,0.13);text-align:center;">
                            <b>${intro}</b> ${curiosidade.texto}
                        </div>
                    </div>
                `;
                break;
            case 'elenco': 
                intro = '👥 Mudança de elenco:'; 
                responseHtml = `
                    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;">
                        <div style="background:rgba(42,42,42,0.92);border:2px solid #FFD700;border-radius:16px;padding:0.7rem 1rem;max-width:95%;margin-bottom:0.3rem;box-shadow:0 2px 8px 0 rgba(0,0,0,0.13);text-align:center;">
                            <b>${intro}</b> ${curiosidade.texto}
                        </div>
                    </div>
                `;
                break;
            case 'melhor': 
                intro = '🏅 Resultados relevantes:'; 
                responseHtml = `
                    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;">
                        <div style="background:rgba(42,42,42,0.92);border:2px solid #FFD700;border-radius:16px;padding:0.7rem 1rem;max-width:95%;margin-bottom:0.3rem;box-shadow:0 2px 8px 0 rgba(0,0,0,0.13);text-align:center;">
                            <b>${intro}</b> ${curiosidade.texto}
                        </div>
                    </div>
                `;
                break;
            case 'major': {
                const match = curiosidade.texto.match(/^Participação marcante em (.+) \((\d{4})\): (.+)$/);
                let majorText = '';
                if (match) {
                    const nome = match[1];
                    const ano = match[2];
                    const colocacao = match[3];
                    majorText = `A FURIA participou do <b>${nome}</b>, realizado no ano de <b>${ano}</b>, e conquistou a colocação <b>${colocacao}</b> no campeonato.`;
                } else {
                    majorText = curiosidade.texto;
                }
                intro = '🌍 Major:';
                responseHtml = `
                    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;">
                        <div style="background:rgba(42,42,42,0.92);border:2px solid #FFD700;border-radius:16px;padding:0.7rem 1rem;max-width:95%;margin-bottom:0.3rem;box-shadow:0 2px 8px 0 rgba(0,0,0,0.13);text-align:center;">
                            <b>${intro}</b> ${majorText}
                        </div>
                    </div>
                `;
                break;
            }
            default: 
                intro = '✨ Fato curioso:'; 
                responseHtml = `
                    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;">
                        <div style="background:rgba(42,42,42,0.92);border:2px solid #FFD700;border-radius:16px;padding:0.7rem 1rem;max-width:95%;margin-bottom:0.3rem;box-shadow:0 2px 8px 0 rgba(0,0,0,0.13);text-align:center;">
                            <b>${intro}</b> ${curiosidade.texto}
                        </div>
                    </div>
                `;
                break;
        }
        return {
            response: responseHtml,
            actions: [
                { label: "Quero outra curiosidade", message: "curiosidade sobre FURIA", isPrimary: true }
            ],
            context: novoContexto,
            showFeedback: shouldShowFeedback('normal')
        };
    }

    // Mensagens de apoio e torcida
    if (/(vamo|torcida|apoio|força)/i.test(msg)) {
        const frasesTorcida = (dataLoader.data.fanContent && dataLoader.data.fanContent.frasesTorcida) ? dataLoader.data.fanContent.frasesTorcida : [];
        const randomFrase = getRandom(frasesTorcida);
        return {
            response: randomFrase,
            actions: [
                { label: "Quero outra frase de torcida", message: "frase de torcida" },
                { label: "Ver Próximos Jogos", message: "próxima partida" }
            ],
            context,
            showFeedback: shouldShowFeedback('normal')
        };
    }

    // === Consultas históricas e institucionais FURIA ===
    if (/(fundação|fundacao|fundadores|origem|história|historia|sede|quando a furia foi criada|quem criou a furia|quem são os fundadores|quem sao os fundadores|onde fica a sede|onde nasceu a furia|fundou a furia|criou a furia|fundador da furia|fundadores da furia|historia da furia|histórico da furia|histórico furia|historia furia)/i.test(msg)) {
        return { response: dataLoader.getFuriaFundacao(), actions: [
            { label: "Membros da Equipe", message: "elenco" },
            { label: "Ver Próximos Jogos", message: "próxima partida" },
            { label: "Ver Títulos", message: "títulos furia" }
        ], context, showFeedback: shouldShowFeedback('normal') };
    }
    if (/(mudança|mudancas|elenco|transferência|transferencias|reforço|reforcos|reformulação|reformulacao|contratação|contratacao|contratações|contratacoes|quem entrou|quem saiu|quem chegou|quem foi contratado|quem foi movido|quem foi para o banco|quem saiu do time|mudou o elenco|mudanças no time|mudanças no elenco|mudanças furia|mudou furia|elenco furia|elenco atual|elenco antigo|elenco base|elenco principal)/i.test(msg)) {
        return { response: dataLoader.getFuriaElenco(), actions: [
            { label: "Ver Próximos Jogos", message: "próxima partida" },
            { label: "Ver Ranking", message: "ranking atual" }
        ], context, showFeedback: shouldShowFeedback('normal') };
    }
    if (/(marco|marcos|feito|feitos|conquista|conquistas|histórico|historico|momento marcante|momentos marcantes|fatos marcantes|fato marcante|marcante|histórico furia|historia furia|histórico da furia|historia da furia|fatos históricos|fatos historicos|acontecimentos marcantes|acontecimento marcante)/i.test(msg)) {
        return { response: dataLoader.getFuriaMarcos(), actions: [
            { label: "Ver Títulos", message: "títulos furia" },
            { label: "Ver Próximos Jogos", message: "próxima partida" }
        ], context, showFeedback: shouldShowFeedback('normal') };
    }
    if (/(major|majors|mundial|valve|campeonato grande|participação em major|participacoes em major|quais majors|quais mundiais|furia em major|furia em mundial|furia major|furia mundial|participou de major|participou de mundial|lista de majors|lista de mundiais|todos os majors|todos os mundiais)/i.test(msg)) {
        return { response: dataLoader.getFuriaMajors(), actions: [
            { label: "Ver Melhores Colocações", message: "melhores colocações" },
            { label: "Ver Próximos Jogos", message: "próxima partida" }
        ], context, showFeedback: shouldShowFeedback('normal') };
    }
    if (/(melhor colocação|melhores colocações|melhor resultado|melhores resultados|melhor campanha|melhores campanhas|resultado histórico|resultado historico|resultado marcante|campanha marcante|campanhas marcantes|melhor desempenho|melhores desempenhos|melhor posição|melhores posições|melhor colocacao|melhores colocacoes)/i.test(msg)) {
        return { response: dataLoader.getFuriaMelhoresColocacoes(), actions: [
            { label: "Ver Títulos", message: "títulos furia" },
            { label: "Ver Próximos Jogos", message: "próxima partida" }
        ], context, showFeedback: shouldShowFeedback('normal') };
    }
    if (/(título|titulos|campeão|campea|campeonatos ganhos|campeonatos conquistados|quais títulos|quais titulos|quais campeonatos|furia campeã|furia campea|furia ganhou|furia venceu|furia foi campeã|furia foi campea|títulos furia|titulos furia|campeonatos furia|campeonatos que a furia ganhou|campeonatos que a furia venceu|campeonatos que a furia foi campeã|campeonatos que a furia foi campea|campeonatos que a furia conquistou|campeonatos conquistados furia|campeonatos ganhos furia)/i.test(msg)) {
        const titulosData = dataLoader.getFuriaTitulos(true);
        let titulos = titulosData.titulos || [];
        // Monta visualmente cada título, incluindo destaque com texto dinâmico
        let titulosHtml = titulos.map((t, idx) => {
            let ano = t.datas ? (t.datas.match(/\d{4}/)?.[0] || '') : '';
            let destaqueHtml = '';
            if (t.destaque) {
                destaqueHtml = `<div class="titulo-destaque" style="margin-top:0.25rem;color:#FFD700;font-size:0.98em;white-space:normal;word-break:break-word;">${gerarTextoDinamicoDestaque(t.destaque, t.nome, ano)}</div>`;
            }
            return `<div class="titulo-item" style="margin-bottom:1.1rem;">
                <div class="titulo-nome" style="font-weight:bold;font-size:1.13em;color:#FFD700;">${idx+1}. 🏆 ${t.nome}${ano ? ` (${ano})` : ''}</div>
                <div class="titulo-final" style="margin-left:1.1em;">• Final: ${t.final}</div>
                ${destaqueHtml}
            </div>`;
        }).join('');
        return {
            response: {
                type: 'card',
                className: 'bot-card',
                title: 'A FURIA já levantou vários canecos! Veja os principais títulos abaixo:<br>',
                desc: titulosHtml
            },
            actions: [
                { label: "Ver Próximos Jogos", message: "próxima partida" },
                { label: "Ver Ranking", message: "ranking atual" },
                { label: "Membros da Equipe", message: "elenco" }
            ],
            context: { ...context, titulos: titulos },
            showFeedback: shouldShowFeedback('normal')
        };
    }
    if (/(glossário|glossario|gíria|giria|gírias|girias|termo|termos|iniciante|iniciante cs|iniciante no cs|palavras do cs|palavras do jogo|como funciona o ranking|o que é rating|o que é hltv|o que significa|não entendo|nao entendo|explica|explicação|explicacao|como funciona|como é|como e|como se fala|como se chama|como se diz|palavras comuns|palavras usadas|palavras do chat|palavras da transmissão|palavras da galera|palavras do csgo|palavras do cs2|dicionário cs|dicionario cs|dicionário do cs|dicionario do cs|dicionário furia|dicionario furia|dicionário do furia|dicionario do furia)/i.test(msg)) {
        const glossario = dataLoader.data.historicoFuria.glossario;
        const termos = [
            ...glossario.termos.map(t => ({ tipo: 'termo', termo: t.termo, descricao: t.descricao })),
            { tipo: 'extra', termo: 'HLTV', descricao: glossario.hltv },
            { tipo: 'extra', termo: 'Ranking', descricao: glossario.ranking },
            { tipo: 'extra', termo: 'Rating', descricao: glossario.rating },
            ...dataLoader.data.historicoFuria.tiposCampeonatos.map(tc => ({ tipo: 'tipoCampeonato', termo: tc.tipo, descricao: tc.descricao }))
        ];
        let exibidos = context.termosExibidos || [];
        let isFirstTime = exibidos.length === 0;
        let restantes = termos.filter(t => !exibidos.includes(t.termo));
        if (restantes.length === 0) {
            return {
                response: "Você já viu todos os termos e conceitos do CS por enquanto! 🧠💡 Em breve trarei mais novidades para você se divertir e aprender.",
                actions: [
                    { label: "Ver Próximos Jogos", message: "próxima partida" },
                    { label: "Membros da Equipe", message: "elenco" }
                ],
                context,
                showFeedback: shouldShowFeedback("normal")
            };
        }
        const termo = getRandom(restantes);
        let novoContexto = { ...context };
        novoContexto.termosExibidos = [...exibidos, termo.termo];
        const icones = {
            'HLTV': '📊',
            'Ranking': '🏅',
            'Rating': '⭐',
            'tipoCampeonato': '🏆',
            'termo': '🎯',
            'extra': '💡'
        };
        let tipoIcone = icones[termo.tipo] || '🎯';
        // Título com ícone e texto juntos, ambos em amarelo e na mesma linha
        const card = {
            type: 'card',
            className: 'cs-term-card',
            title: `<span style="color:#FFD700;font-size:1.3em;vertical-align:middle;">${tipoIcone}</span> <span style="color:#FFD700;font-weight:bold;font-size:1.1em;vertical-align:middle;">${termo.termo}</span>`,
            desc: `<span class=\"cs-term-desc\">${termo.descricao}</span>`
        };
        // Adiciona legenda explicativa na primeira vez
        if (isFirstTime) {
            return {
                introText: "📚 Bem-vindo ao Glossário do CS! Aqui você encontra explicações sobre gírias e termos comuns do jogo. Veja o primeiro termo abaixo:",
                response: card,
                actions: [
                    { label: "Quero outro termo", message: "termos do cs", isPrimary: true }
                ],
                context: novoContexto,
                showFeedback: shouldShowFeedback('normal')
            };
        }
        return {
            response: card,
            actions: [
                { label: "Quero outro termo", message: "termos do cs", isPrimary: true }
            ],
            context: novoContexto,
            showFeedback: shouldShowFeedback('normal')
        };
    }

    // Próximas partidas
    if (/(próxima partida|proxima partida|próximo jogo|proximo jogo|quando a furia joga|qual o próximo jogo|qual a próxima partida)/i.test(msg)) {
        const partidas = dataLoader.data.upcomingMatches;
        if (partidas && partidas.length > 0) {
            const partidasText = partidas.map((p, i) => {
                // Tradução do formato
                let formato = p.format;
                if (typeof formato === 'string') {
                    const lower = formato.toLowerCase();
                    if (lower === 'best of 1' || lower === 'bo1') formato = 'Melhor de 1 (MD1)';
                    else if (lower === 'best of 3' || lower === 'bo3') formato = 'Melhor de 3 (MD3)';
                    else if (lower === 'best of 5' || lower === 'bo5') formato = 'Melhor de 5 (MD5)';
                }
                return (
                    `🔥 <b>${i + 1}. ${p.team1?.name || "FURIA"} vs ${p.team2?.name || "Adversário"}</b> 🔥\n` +
                    `📅 ${p.date || "Data não definida"}\n` +
                    `⏰ ${p.time || "Horário não definido"}\n` +
                    `🏆 ${p.event?.name || "Evento não definido"}\n` +
                    `🎲 Formato: ${formato || "Não definido"}\n` +
                    `📍 Etapa: ${p.stage || "Não definida"}\n` +
                    (p.stream ? `📺 Transmissão: ${p.stream}\n` : "")
                );
            }).join("\n\n");
            return {
                response: `<b>PRÓXIMAS PARTIDAS DA FURIA</b>\n\n${partidasText}\nEm breve a nossa seleção entrará no servidor! Não esqueça de acompanhar e torcer! 🐾`,
                actions: [
                    { label: "Membros da Equipe", message: "elenco" },
                    { label: "Ver Ranking", message: "ranking atual" },
                    { label: "Ver Títulos", message: "títulos furia" }
                ],
                context,
                showFeedback: shouldShowFeedback('normal')
            };
        }
        return {
            response: "Ainda não tenho a agenda completa das próximas partidas, mas estou de olho!",
            actions: [
                { label: "Membros da Equipe", message: "elenco" },
                { label: "Ver Notícias", message: "notícias" }
            ],
            context,
            showFeedback: shouldShowFeedback('normal')
        };
    }

    // Próximos campeonatos/eventos (sem conflitar com próximos jogos)
    if (/(próxim[oa]s? campeonatos?|eventos?|próxim[oa]s? torneios?|próxim[oa]s? competições?|próxim[oa]s? disputas?)/i.test(msg)) {
        const eventos = dataLoader.getUpcomingEvents();
        return {
            response: eventos,
            actions: [
                { label: "Ver Próximos Jogos", message: "próxima partida" },
                { label: "Membros da Equipe", message: "elenco" },
                { label: "Ver Notícias", message: "notícias" }
            ],
            context,
            showFeedback: shouldShowFeedback('normal')
        };
    }

    // Comandos "escondidos" (não estão nos quick buttons)
    if (/(comando|comandos|comando disponível|comandos disponíveis|comando disponivel|comandos disponiveis|comando oculto|comandos ocultos|comando secreto|comandos secretos)/i.test(msg)) {
        const comandos = [
            { cmd: "limpar chat", desc: "Limpa todo o histórico da conversa." },
            { cmd: "desenvolvedor", desc: "Mostra informações de contato do criador do bot." },
            { cmd: "fundador", desc: "Saiba um pouco mais sobre a fundação da organização." },
        ];
        let resposta = "<b>Comandos Escondidos do PanteraBot 🐾</b><br><br>";
        resposta += "Além dos botões rápidos, você pode digitar:<br>";
        resposta += comandos.map(c => `<b>${c.cmd}</b>: ${c.desc}`).join("<br>");
        resposta += "<br><br>Experimente digitar um deles!";
        return {
            response: resposta,
            actions: [
                { label: "Limpar Chat", message: "limpar chat" },
                { label: "Contato do Dev", message: "contato do desenvolvedor" }
            ],
            context,
            showFeedback: false
        };
    }

    // Comando para limpar chat
    if (/(limpar chat|apagar conversa|resetar chat|limpar histórico|limpar historico|resetar conversa|apagar histórico|apagar historico)/i.test(msg)) {
        return {
            response: "O chat foi limpo! Pode começar uma nova conversa. 🧹",
            actions: null,
            context: {},
            showFeedback: false,
            clearChat: true // Sinaliza ao frontend para limpar o histórico
        };
    }
    // Comando para desenvolvedor
    if (/(desenvolvedor|sobre o projeto|sobre o bot|contato do dev|contato desenvolvedor|quem fez|quem criou|quem é o dev|quem é o desenvolvedor|quem é o criador|quem fez o bot|quem criou o bot|contato do criador|contato do desenvolvedor)/i.test(msg)) {
        return {
            response: `<b>Sobre o projeto PanteraBot 🐾</b><br><br>Este chatbot foi desenvolvido por André Torres, apaixonado por tecnologia, esportes eletrônicos e inovação!<br><br><b>Contato para feedbacks, sugestões e parcerias:</b><br>📧 <a href='mailto:andrectorres17@gmail.com'>andrectorres17@gmail.com</a><br>🔗 <a href='https://www.linkedin.com/in/andrectorress/' target='_blank'>LinkedIn: andrectorress</a><br><br>Fique à vontade para entrar em contato! 😃`,
            actions: null,
            context,
            showFeedback: false
        };
    }

    // Se não reconhecer a mensagem
    return {
        response: "Desculpe, não entendi. Pode perguntar de outra forma? Estou aqui para ajudar! 🤖",
        actions: null,
        context,
        showFeedback: shouldShowFeedback('normal')
    };
}

// Função auxiliar para deixar o destaque mais dinâmico e interessante
function gerarTextoDinamicoDestaque(destaque, nome, ano) {
    if (!destaque) return '';
    // Exemplos de frases dinâmicas, pode ser expandido conforme criatividade
    const prefixos = [
        `O que marcou esse título:`,
        `Fato marcante desse campeonato:`,
        `Motivo para a torcida rugir:`,
        `Curiosidade desse caneco:`,
        `O diferencial dessa conquista:`
    ];
    // Escolhe um prefixo aleatório
    const prefixo = prefixos[Math.floor(Math.random() * prefixos.length)];
    // Personaliza ainda mais se quiser, por exemplo, usando o nome do campeonato
    return `${prefixo} ${destaque}`;
}

module.exports = { processMessage };
