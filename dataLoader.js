// dataLoader.js - Centraliza o carregamento e armazenamento dos dados dinâmicos
const { HLTV } = require('hltv');
const NodeCache = require('node-cache');
const hltvCache = new NodeCache({ stdTTL: 1800, checkperiod: 120 }); // 30 minutos

const data = {
    players: null,
    team: null,
    ranking: null,
    news: null,
    fanContent: {
        curiosidades: [
            "A FURIA foi o primeiro time brasileiro a chegar ao Top 3 do ranking mundial da HLTV em 2020.",
            "O projeto FURIA começou em 2017 e rapidamente se tornou referência em inovação e comunicação no cenário de esports.",
            "O CEO Jaime Pádua já foi jogador profissional de poker antes de fundar a FURIA.",
            "A organização investe em diversas modalidades além do CS, como League of Legends, Valorant e até xadrez profissional.",
            "A FURIA foi a primeira equipe brasileira a disputar uma semifinal de Major em solo nacional (IEM Rio 2022)."
        ],
    },
    upcomingEvents: [
        {
            name: "PGL Astana 2025",
            dates: "10 de Maio - 18 de Maio",
            logo: "/images/events/pgl_astana_2025.png",
            type: "Major",
            teams: [
                { name: "FURIA", logo: "/images/logo_furia.png" },
                { name: "The MongolZ", logo: "/images/teams/themongolz.png" },
                { name: "FaZe", logo: "/images/teams/faze.png" },
                { name: "NAVI", logo: "/images/teams/navi.png" },
                { name: "G2", logo: "/images/teams/g2.png" },
                { name: "Vitality", logo: "/images/teams/vitality.png" }
            ],
            location: "Astana, Cazaquistão",
            prizePool: "$1,250,000",
            status: "confirmed"
        },
        {
            name: "IEM Dallas 2025",
            dates: "19 de Maio - 25 de Maio",
            logo: "/images/events/iem_dallas_2025.png",
            type: "IEM",
            teams: [
                { name: "FURIA", logo: "/images/logo_furia.png" },
                { name: "Vitality", logo: "/images/teams/vitality.png" },
                { name: "NAVI", logo: "/images/teams/navi.png" },
                { name: "FaZe", logo: "/images/teams/faze.png" },
                { name: "G2", logo: "/images/teams/g2.png" },
                { name: "Cloud9", logo: "/images/teams/cloud9.png" },
                { name: "Complexity", logo: "/images/teams/complexity.png" },
                { name: "Heroic", logo: "/images/teams/heroic.png" }
            ],
            location: "Dallas, Estados Unidos",
            prizePool: "$250,000",
            status: "confirmed"
        },
        {
            name: "BLAST.tv Austin Major 2025 Stage 2",
            dates: "7 de Junho - 10 de Junho",
            logo: "/images/events/blast_austin_2025.png",
            type: "Major",
            teams: [
                { name: "FURIA", logo: "/images/logo_furia.png" },
                { name: "MOUZ", logo: "/images/teams/mouz.png" },
                { name: "G2", logo: "/images/teams/g2.png" },
                { name: "NIP", logo: "/images/teams/nip.png" },
                { name: "FaZe", logo: "/images/teams/faze.png" },
                { name: "Vitality", logo: "/images/teams/vitality.png" }
            ],
            location: "Austin, Estados Unidos",
            prizePool: "$1,250,000",
            status: "confirmed"
        }
    ],
    upcomingMatches: [
        {
            event: {
                name: "PGL Astana 2025",
                logo: "/images/events/pgl_astana_2025.png"
            },
            date: "10/05/2025",
            time: "13:00",
            team1: {
                name: "FURIA",
                logo: "/images/logo_furia.png"
            },
            team2: {
                name: "The MongolZ",
                logo: "/images/teams/themongolz.png"
            },
            format: "Best of 3",
            stage: "Fase de Grupos",
            importance: "high",
            stream: "https://www.twitch.tv/pgl"
        }
    ],
    historicoFuria: {
        fundacao: {
            data: '8 de agosto de 2017',
            fundadores: ['Jaime Pádua', 'André Akkari', 'Cris Guedes'],
            sede: 'São Paulo, Brasil'
        },
        elenco: [
            { ano: 2018, descricao: 'Entrada de arT, yuurih, KSCERATO e VINI, formando a base da equipe que alcançaria destaque internacional.' },
            { ano: 2023, descricao: 'Contratações de FalleN e chelo, vindos da Imperial.' },
            { ano: 2024, descricao: 'arT foi movido para o banco de reservas após seis anos como capitão; guerri deixou o cargo de treinador para assumir a posição de Head de Esports.' },
            { ano: 2025, descricao: 'skullz foi movido para o banco; contratações de molodoy e possível chegada de YEKINDAR, sinalizando uma internacionalização do elenco.' }
        ],
        marcos: [
            { ano: 2019, descricao: 'Primeira participação em um Major no IEM Katowice.' },
            { ano: 2020, descricao: 'Vitórias na ESL Pro League Season 12 e IEM New York North America.' },
            { ano: 2021, descricao: 'Alcançou o Top 10 mundial no ranking da HLTV.' },
            { ano: 2022, descricao: 'Semifinalista no IEM Rio Major, melhor desempenho em Majors até então.' }
        ],
        majors: [
            { nome: 'IEM Katowice Major', ano: 2019, colocacao: '20º/22º' },
            { nome: 'StarLadder Berlin Major', ano: 2019, colocacao: '20º/22º' },
            { nome: 'PGL Major Stockholm', ano: 2021, colocacao: 'Quartas de final (5º/8º)' },
            { nome: 'PGL Major Antwerp', ano: 2022, colocacao: 'Quartas de final (5º/8º)' },
            { nome: 'IEM Rio Major', ano: 2022, colocacao: 'Semifinal (3º/4º)' },
            { nome: 'BLAST.tv Paris Major', ano: 2023, colocacao: '15º/16º' },
            { nome: 'PGL CS2 Major Copenhagen', ano: 2024, colocacao: '15º/16º' },
            { nome: 'Perfect World Shanghai Major', ano: 2024, colocacao: '9º/11º' },
            { nome: 'BLAST.tv Austin Major', ano: 2025, colocacao: 'Confirmada' }
        ],
        melhoresColocacoes: [
            { evento: 'IEM Rio Major 2022', resultado: 'Semifinal (3º/4º lugar)', destaque: 'Melhor desempenho da equipe em Majors até hoje.' },
            { evento: 'PGL Major Stockholm 2021', resultado: 'Quartas de final (5º/8º lugar)' },
            { evento: 'PGL Major Antwerp 2022', resultado: 'Quartas de final (5º/8º lugar)' },
            { evento: 'IEM Rio 2024', resultado: 'Semifinal', detalhe: 'Eliminada pela equipe alemã MOUZ.' }
        ],
        titulos: [
            {
                nome: 'IEM Fall North America 2021',
                resultado: 'Campeã',
                final: 'FURIA 3–0 GODSENT',
                premiação: 'US$25.000 + 2.500 pontos RMR + vaga no IEM Global Challenge 2020',
                destaque: 'Superou Evil Geniuses e Team Liquid nos playoffs. Quarto campeonato em 2020.'
            },
            {
                nome: 'Elisa Invitational Summer 2021',
                resultado: 'Campeã',
                datas: '6 de maio a 4 de julho de 2021',
                formato: 'Torneio online europeu de CS:GO com fase de grupos e playoffs',
                final: 'FURIA 2–1 SKADE',
                mapas: ['Overpass: 19–15', 'Inferno: 4–16', 'Mirage: 16–2'],
                premiação: 'US$50.000',
                destaque: 'FURIA foi convidada diretamente para as quartas de final, venceu a Endpoint e derrotou a SKADE na final.'
            },
            {
                nome: 'Elisa Masters Espoo 2023',
                resultado: 'Campeã',
                datas: '29 de novembro a 3 de dezembro de 2023',
                formato: 'Torneio presencial (LAN) de CS2 com 8 equipes',
                local: 'Espoo Metro Arena, Espoo, Finlândia',
                final: 'FURIA 3–1 Apeks',
                mapas: ['Inferno: 13–9', 'Ancient: 7–13', 'Vertigo: 13–9', 'Mirage: 13–9'],
                premiação: 'US$100.000',
                destaque: 'Primeiro campeonato internacional presencial da FURIA em quatro anos, encerrando jejum desde o Arctic Invitational 2019.'
            },
            {
                nome: 'IEM New York 2020 – América do Norte',
                resultado: 'Campeã',
                final: 'FURIA 3–1 100 Thieves',
                mapas: ['Nuke: 9–16', 'Inferno: 16–14', 'Vertigo: 16–4', 'Mirage: 16–11'],
                premiação: 'US$25.000 + 2.500 pontos RMR + vaga no IEM Global Challenge 2020',
                destaque: 'Superou Evil Geniuses e Team Liquid nos playoffs.'
            },
            {
                nome: 'ESL Pro League Season 12 – América do Norte',
                resultado: 'Campeã',
                datas: '1º de setembro a 27 de setembro de 2020',
                formato: 'Fase de grupos seguida por playoffs; final em melhor de 5 mapas com vantagem de 1 mapa para o time vindo da chave superior',
                final: 'FURIA 3–0 100 Thieves',
                mapas: ['Mapa 1 (vantagem): 1–0', 'Vertigo: 16–7', 'Inferno: 16–10'],
                premiação: 'US$60.000',
                destaque: 'Domínio tático e técnico, atuações de yuurih e arT.'
            },
            {
                nome: 'DreamHack Masters Spring 2020 – América do Norte',
                resultado: 'Campeã',
                datas: '19 de maio a 14 de junho de 2020',
                formato: 'Fase de grupos com 8 equipes, seguida por playoffs em dupla eliminação; final em melhor de 5 mapas com vantagem de 1 mapa para o time vindo da chave superior',
                final: 'FURIA 3–0 Team Liquid',
                mapas: ['Mapa 1 (vantagem): 1–0', 'Mirage: 16–12', 'Vertigo: 16–5'],
                premiação: 'US$40.000',
                destaque: 'Campanha invicta, yuurih MVP.'
            }
        ],
        glossario: {
            termos: [
                { termo: 'Eco', descricao: 'Rodada em que a equipe economiza dinheiro, comprando apenas pistolas ou nenhum equipamento, visando uma compra completa nas próximas rodadas.' },
                { termo: 'Entry Fragger', descricao: 'Jogador responsável por obter a primeira eliminação ao entrar em um bombsite, abrindo espaço para a equipe.' },
                { termo: 'Default', descricao: 'Estratégia padrão onde os jogadores se espalham pelo mapa para coletar informações e controlar áreas-chave.' },
                { termo: 'Clutch', descricao: 'Situação em que um jogador precisa vencer a rodada sozinho contra múltiplos adversários.' },
                { termo: 'Lurker', descricao: 'Jogador que se posiciona afastado do grupo principal para surpreender os adversários pelas costas.' },
                { termo: 'Pézinho', descricao: 'Tática onde um jogador sobe sobre outro para alcançar posições elevadas ou ângulos inesperados.' }
            ],
            hltv: 'HLTV.org: Principal site de estatísticas e notícias sobre Counter-Strike, oferecendo rankings de equipes e jogadores.',
            ranking: 'Ranking Mundial: Classificação baseada em desempenho recente em torneios, força dos adversários e consistência.',
            rating: 'Rating 2.0: Métrica que avalia o desempenho individual dos jogadores, considerando eliminações, mortes, dano causado, entre outros fatores.'
        },
        tiposCampeonatos: [
            { tipo: 'Majors', descricao: 'Torneios patrocinados pela Valve, considerados os mais prestigiados no cenário de CS.' },
            { tipo: 'ESL Pro League / IEM', descricao: 'Competições organizadas pela ESL, reunindo as melhores equipes do mundo.' },
            { tipo: 'BLAST Premier', descricao: 'Circuito global com eventos de alto nível e premiações significativas.' },
            { tipo: 'RMR (Regional Major Ranking)', descricao: 'Torneios classificatórios que determinam as equipes participantes dos Majors.' }
        ]
    }
};

async function loadPlayers() {
    const cacheKey = 'players';
    const cached = hltvCache.get(cacheKey);
    if (cached) {
        data.players = cached;
        return;
    }
    try {
        const team = await HLTV.getTeam({ id: 8297 });
        // Buscar detalhes de cada jogador
        const jogadores = await Promise.all((team.players || []).map(async (player) => {
            try {
                const details = await HLTV.getPlayer({ id: player.id });
                let nomeCompleto = '';
                let nick = details.nick || player.nick || player.name || '';
                let baseName = details.name || player.name || '';
                let image = details.image || player.image || null;
                let age = details.age || null;
                let country = null;
                if (details.country && details.country.code) {
                    country = {
                        code: details.country.code,
                        name: details.country.name
                    };
                }
                // Monta nome completo
                if (baseName && nick) {
                    const partes = baseName.split(' ');
                    if (partes.length > 1) {
                        if (baseName.includes(`'${nick}'`)) {
                            nomeCompleto = baseName;
                        } else {
                            nomeCompleto = `${partes[0]} '${nick}' ${partes.slice(1).join(' ')}`.replace(/  +/g, ' ').trim();
                        }
                    } else {
                        nomeCompleto = `'${nick}'`;
                    }
                } else if (nick) {
                    nomeCompleto = `'${nick}'`;
                } else {
                    nomeCompleto = baseName;
                }
                let mapsPlayed = (typeof details.mapsPlayed === 'number') ? details.mapsPlayed : (typeof player.mapsPlayed === 'number' ? player.mapsPlayed : null);
                let socials = {
                    twitter: details.twitter || null,
                    twitch: details.twitch || null,
                    facebook: details.facebook || null,
                    instagram: details.instagram || null
                };
                return {
                    id: player.id,
                    fullname: nomeCompleto,
                    nick: nick,
                    image: image,
                    age: age,
                    timeOnTeam: player.timeOnTeam,
                    mapsPlayed,
                    type: player.type,
                    country,
                    socials
                };
            } catch (e) {
                // Se der erro, tenta buscar pelo endpoint de stats para pegar nome completo e foto
                try {
                    const stats = await HLTV.getPlayerStats({ id: player.id });
                    let nomeCompleto = stats.name || `'${player.name}'`;
                    let image = stats.image || player.image || null;
                    let age = stats.age || null;
                    let country = null;
                    if (stats.country && stats.country.code) {
                        country = {
                            code: stats.country.code,
                            name: stats.country.name
                        };
                    }
                    return {
                        id: player.id,
                        fullname: nomeCompleto,
                        nick: player.name,
                        image: image,
                        age: age,
                        timeOnTeam: player.timeOnTeam,
                        mapsPlayed: player.mapsPlayed,
                        type: player.type,
                        country: country
                    };
                } catch {
                    // Se ainda assim der erro, retorna só o nick entre aspas
                    return {
                        id: player.id,
                        fullname: `'${player.name}'`,
                        nick: player.name,
                        image: player.image || null,
                        age: null,
                        timeOnTeam: player.timeOnTeam,
                        mapsPlayed: player.mapsPlayed,
                        type: player.type,
                        country: null
                    };
                }
            }
        }));
        data.players = jogadores;
        hltvCache.set(cacheKey, jogadores);
    } catch (e) {
        data.players = [];
    }
}

async function loadTeam() {
    const cacheKey = 'team';
    const cached = hltvCache.get(cacheKey);
    if (cached) {
        data.team = cached;
        return;
    }
    try {
        data.team = await HLTV.getTeam({ id: 8297 });
        hltvCache.set(cacheKey, data.team);
    } catch (e) {
        data.team = null;
    }
}

async function loadRanking() {
    const cacheKey = 'ranking';
    const cached = hltvCache.get(cacheKey);
    if (cached) {
        data.ranking = cached;
        return;
    }
    data.ranking = {
        team: { name: 'FURIA', id: 8297 },
        points: 68, 
        place: 17,
        change: null,
        isNew: false
    };
    hltvCache.set(cacheKey, data.ranking);
}

async function loadNews() {
    const cacheKey = 'news';
    const cached = hltvCache.get(cacheKey);
    if (cached) {
        data.news = cached;
        return;
    }
    try {
        const furiaNews = [];
        const anos = [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018]; 
        const meses = [
            'january', 'february', 'march', 'april', 'may', 'june',
            'july', 'august', 'september', 'october', 'november', 'december'
        ];
        for (const year of anos) {
            for (const month of meses) {
                const newsList = await HLTV.getNews({ year, month });
                if (newsList && newsList.length > 0) {
                    const filtered = newsList.filter(n => {
                        const title = n.title ? n.title.toLowerCase() : '';
                        return title.includes('furia');
                    });
                    furiaNews.push(...filtered);
                    if (furiaNews.length >= 30) break;
                }
            }
            if (furiaNews.length >= 30) break;
        }
        // Remove duplicadas pelo link
        const uniqueNews = [];
        const seenLinks = new Set();
        for (const n of furiaNews) {
            if (!seenLinks.has(n.link)) {
                uniqueNews.push(n);
                seenLinks.add(n.link);
            }
        }
        data.news = uniqueNews.slice(0, 30);
        hltvCache.set(cacheKey, data.news);
    } catch (e) {
        data.news = [];
    }
}

async function loadAll() {
    await Promise.all([
        loadPlayers(),
        loadTeam(),
        loadRanking(),
        loadNews()
    ]);
}

// === Consultas históricas e institucionais FURIA ===

// Fundação
function getFuriaFundacao() {
    const f = data.historicoFuria.fundacao;
    return `A FURIA nasceu em 8 de agosto de 2017, fundada por três nomes de peso: Jaime Pádua, André Akkari e Cris Guedes. A sede da tropa fica em São Paulo, coração do cenário brasileiro de esports. A partir de agora você já sabe: é esse trio e essa data que marcaram o início da nossa caminhada!`;
}

// Mudanças marcantes no elenco
function getFuriaElenco() {
    const elenco = data.historicoFuria.elenco;
    let resposta = 'A FURIA já teve várias mudanças de peso no elenco, sempre buscando evoluir e se reinventar. Se liga nos momentos mais marcantes dessa caminhada:';
    elenco.forEach(e => {
        resposta += `\n- ${e.ano}: ${e.descricao}`;
    });
    resposta += '\nSe ouvir sobre mudanças, transferências, reforços ou reformulação, pode apostar que a FURIA sempre tá de olho no topo!';
    return resposta;
}

// Marcos históricos
function getFuriaMarcos() {
    const marcos = data.historicoFuria.marcos;
    let resposta = 'Os marcos da FURIA são aqueles momentos que todo torcedor lembra e se orgulha. Saca só:';
    marcos.forEach(m => {
        resposta += `\n- ${m.ano}: ${m.descricao}`;
    });
    resposta += '\nSe ouvir falar em marcos, feitos, conquistas ou história, é disso que estamos falando!';
    return resposta;
}

// Participações em Majors
function getFuriaMajors() {
    const majors = data.historicoFuria.majors;
    let resposta = 'A FURIA já colou em vários Majors, os campeonatos mais brabos do CS mundial. Olha só o currículo:';
    majors.forEach(m => {
        resposta += `\n- ${m.nome} (${m.ano}): ${m.colocacao}`;
    });
    resposta += '\nQuando se trata de Major, Mundial, ou qualquer campeonato grande, é disso que se trata!';
    return resposta;
}

// Melhores colocações (relaciona com majors se possível)
function getFuriaMelhoresColocacoes() {
    const melhores = data.historicoFuria.melhoresColocacoes;
    let resposta = 'Quando o assunto é chegar longe, a FURIA já fez história em vários eventos. Se liga nos melhores resultados:';
    melhores.forEach(m => {
        resposta += `\n- ${m.evento}: ${m.resultado}`;
        if (m.destaque) resposta += ` (${m.destaque})`;
        if (m.detalhe) resposta += ` (${m.detalhe})`;
    });
    resposta += '\nEsses são os momentos que todo torcedor guarda na memória!';
    return resposta;
}

// Títulos conquistados (resumido e detalhado)
function getFuriaTitulos(resumido = true) {
    const titulos = data.historicoFuria.titulos;
    if (resumido) {
        // Resumo: nome, datas (ou ano), final
        let resposta = 'A FURIA já levantou vários canecos! Veja os principais títulos e clique em "Saiba mais" para detalhes:';
        const lista = titulos.map((t, idx) => {
            let ano = t.datas ? t.datas.match(/\d{4}/)?.[0] : '';
            return `\n${idx+1}. 🏆 ${t.nome}${ano ? ` (${ano})` : ''}\n   • Final: ${t.final}`;
        }).join('\n');
        resposta += lista;
        return { resumo: resposta, titulos };
    } else {
        let resposta = '';
        titulos.forEach(t => {
            resposta += `\n\n🏆 ${t.nome}`;
            if (t.datas) resposta += `\n  • Datas: ${t.datas}`;
            if (t.formato) resposta += `\n  • Formato: ${t.formato}`;
            if (t.local) resposta += `\n  • Local: ${t.local}`;
            resposta += `\n  • Final: ${t.final}`;
            if (t.mapas && t.mapas.length) resposta += `\n  • Mapas: ${t.mapas.join(', ')}`;
            resposta += `\n  • Premiação: ${t.premiação}`;
            if (t.destaque) resposta += `\n  • Destaque: ${t.destaque}`;
        });
        return resposta;
    }
}

// Glossário para iniciantes
function getFuriaGlossario() {
    const g = data.historicoFuria.glossario;
    let resposta = 'Tá chegando agora no mundo do CS? Relaxa, aqui eu consigo te deixar por dentro das gírias e termos que a galera mais usa nas transmissões e no chat:';
    g.termos.forEach(t => {
        resposta += `\n- ${t.termo}: ${t.descricao}`;
    });
    resposta += `\n\nSobre estatísticas e rankings:\n- ${g.hltv}\n- ${g.ranking}\n- ${g.rating}`;
    resposta += '\nSe você já conhece essas palavras, já pode se considerar um rato do CS!';
    return resposta;
}

// Tipos de campeonatos (explicação detalhada)
function getFuriaTiposCampeonatos() {
    const tipos = data.historicoFuria.tiposCampeonatos;
    let resposta = 'No CS, cada campeonato tem seu peso e sua vibe. Olha só o que significa cada um:';
    tipos.forEach(t => {
        resposta += `\n- ${t.tipo}: ${t.descricao}`;
    });
    resposta += '\nMajors são o sonho de todo jogador e de toda equipe, mas cada torneio tem sua importância no cenário!';
    return resposta;
}

// === Consultas para eventos e partidas próximas ===

// Função para obter os próximos eventos
function getUpcomingEvents() {
    if (!data.upcomingEvents || data.upcomingEvents.length === 0) {
        return "No momento não temos informações sobre próximos eventos. Volte em breve para novidades!";
    }

    let resposta = "🔥 <b>PRÓXIMOS EVENTOS DA FURIA</b> 🔥<br><br>";

    data.upcomingEvents.forEach((evento, index) => {
        resposta += `<b>${index + 1}. ${evento.name}</b><br>`;
        resposta += `📅 ${evento.dates}<br>`;
        resposta += `🌎 ${evento.location}<br>`;
        resposta += `💰 ${evento.prizePool}<br><br>`;
    });

    resposta += "A FURIA já está se preparando para dar o seu melhor!<br>Acompanhe e torça com a gente!";
    return resposta;
}

// Função para obter as próximas partidas
function getUpcomingMatches() {
    if (!data.upcomingMatches || data.upcomingMatches.length === 0) {
        return "No momento não estou conseguindo acessar as informações sobre próximas partidas. Fique ligado para atualizações!";
    }

    let resposta = "⚔️ PRÓXIMAS PARTIDAS DA FURIA ⚔️\n";

    data.upcomingMatches.forEach((partida, index) => {
        // Tradução do formato
        let formato = partida.format;
        if (typeof formato === 'string') {
            const lower = formato.toLowerCase();
            if (lower === 'best of 1' || lower === 'bo1') formato = 'Melhor de 1 (MD1)';
            else if (lower === 'best of 3' || lower === 'bo3') formato = 'Melhor de 3 (MD3)';
            else if (lower === 'best of 5' || lower === 'bo5') formato = 'Melhor de 5 (MD5)';
        }

        resposta += `🔥 Confronto ${index + 1}\n`;
        resposta += `⚔️ ${partida.team1.name} vs ${partida.team2.name}\n`;
        resposta += `📅 Data: ${partida.date}\n`;
        resposta += `⏰ Horário: ${partida.time}\n`;
        resposta += `🏆 Evento: ${partida.event.name}\n`;
        resposta += `🎲 Formato: ${formato}\n`;
        resposta += `📍 Etapa: ${partida.stage}\n`;
        if (partida.stream) {
            resposta += `📺 Transmissão: ${partida.stream}\n`;
        }
    });

    resposta += "\nBora apoiar a FURIA! Cola com a gente para vibrar a cada round!";
    return resposta;
}

// Exporta para uso no chatbot
module.exports = {
    data,
    loadAll,
    getFuriaFundacao,
    getFuriaElenco,
    getFuriaMarcos,
    getFuriaMajors,
    getFuriaMelhoresColocacoes,
    getFuriaTitulos,
    getFuriaGlossario,
    getFuriaTiposCampeonatos,
    getUpcomingEvents,
    getUpcomingMatches
};