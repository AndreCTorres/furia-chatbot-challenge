// Animação de digitação
const subtitle = document.querySelector('.subtitle');
const text = subtitle.textContent;
subtitle.textContent = '';
let i = 0;
function typeWriter() {
    if (i < text.length) {
        subtitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
    }
}
setTimeout(typeWriter, 1000);

function closeChatbotIfOpen() {
    const widget = document.getElementById('furia-chatbot-widget');
    if (widget && widget.classList.contains('furia-chatbot-visible')) {
        widget.classList.remove('furia-chatbot-visible');
        widget.classList.add('furia-chatbot-hidden');
    }
}

// Modal do Elenco
const statsButton = document.getElementById('stats');
const statsModal = document.getElementById('statsModal');
const statsCloseButton = statsModal.querySelector('.modal-close');
statsButton.addEventListener('click', async () => {
    closeChatbotIfOpen();
    statsModal.style.display = 'flex';
    statsModal.querySelector('h2').textContent = 'Conheça um pouco mais sobre o nosso atual elenco de Counter-Strike 2';
    showLoading(playersGrid);
    try {
        const response = await fetch('/api/players');
        const players = await response.json();
        displayPlayersDetailed(players);
    } catch (error) {
        playersGrid.innerHTML = '<div class="no-players">Erro ao carregar os jogadores.</div>';
        console.error('Erro ao carregar os jogadores:', error);
    }
});
statsCloseButton.addEventListener('click', () => {
    statsModal.style.display = 'none';
});
statsModal.addEventListener('click', (e) => {
    if (e.target === statsModal) {
        statsModal.style.display = 'none';
    }
});
const playersGrid = document.getElementById('playersGrid');
function displayPlayersDetailed(players) {
    if (!players || players.length === 0) {
        playersGrid.innerHTML = '<div class="no-players">Não foi possível carregar os jogadores.</div>';
        return;
    }
    // Ordena: Titulares, Reservas, Técnico
    const starters = players.filter(p => p.type === 'Starter');
    const benched = players.filter(p => p.type === 'Benched');
    const coach = players.filter(p => p.type === 'Coach');
    const todos = [...starters, ...benched, ...coach];
    playersGrid.innerHTML = todos.map(createPlayerCardDetailed).join('');
}
// Função utilitária para gerar HTML da bandeira
function getFlagIcon(countryCode) {
    if (!countryCode) return '';
    return `<img src='https://cdn.jsdelivr.net/npm/country-flag-icons/3x2/${countryCode.toUpperCase()}.svg' alt='${countryCode}' class='flag-icon' style='width:20px; height:14px; margin-right:5px; vertical-align:middle;'>`;
}
// Função utilitária para redes sociais
function getSocialIcons(socials) {
    if (!socials || typeof socials !== 'object') return '';
    // Aceita tanto 'twitter' quanto 'x' como campo
    const twitter = socials.x || socials.twitter;
    const instagram = socials.instagram;
    const twitch = socials.twitch;
    let html = '<div class="player-socials" style="margin-top:1.1rem; display:flex; justify-content:center; align-items:center; gap:1.1rem;">';
    if (twitter) html += `<a href='${twitter}' target='_blank' class='social-link social-x'><i class='fab fa-x-twitter'></i></a>`;
    if (instagram) html += `<a href='${instagram}' target='_blank' class='social-link social-instagram'><i class='fab fa-instagram'></i></a>`;
    if (twitch) html += `<a href='${twitch}' target='_blank' class='social-link social-twitch'><i class='fab fa-twitch'></i></a>`;
    html += '</div>';
    return html;
}
function traduzirTempoEquipe(tempo) {
    if (!tempo || typeof tempo !== 'string') return '-';
    // Exemplo: '1 year 9 months', '7 years 2 months', '17 days', '6 days'
    let anos = tempo.match(/(\d+)\s*year/);
    let meses = tempo.match(/(\d+)\s*month/);
    let dias = tempo.match(/(\d+)\s*day/);
    let partes = [];
    if (anos) partes.push(`${anos[1]} ano${anos[1] === '1' ? '' : 's'}`);
    if (meses) partes.push(`${meses[1]} mes${meses[1] === '1' ? '' : 'es'}`);
    if (dias && !anos && !meses) partes.push(`${dias[1]} dia${dias[1] === '1' ? '' : 's'}`);
    return partes.length > 0 ? partes.join(' e ') : tempo;
}
function createPlayerCardDetailed(player) {
    let tipo = '';
    let tipoClass = '';
    if (player.type === 'Starter') {
        tipo = 'Titular';
        tipoClass = 'player-role-titular';
    } else if (player.type === 'Benched') {
        tipo = 'Reserva';
        tipoClass = 'player-role-reserva';
    } else if (player.type === 'Coach') {
        tipo = 'Técnico';
        tipoClass = 'player-role-tecnico';
    }
    let flag = player.country && player.country.code ? getFlagIcon(player.country.code) : '';
    let nomeFormatado = player.fullname;
    if (player.fullname && player.nick && !player.fullname.includes("'")) {
        const partes = player.fullname.split(' ');
        if (partes.length > 1) {
            nomeFormatado = `${partes[0]} '${player.nick}' ${partes.slice(1).join(' ')}`;
        } else {
            nomeFormatado = `'${player.nick}'`;
        }
    }
    return `
        <div class="player-card starter">
            <div style="display:flex; flex-direction:column; align-items:center; gap:0.7rem;">
                <div style="position:relative; display:flex; align-items:center; justify-content:center;">
                    <img src="${player.image}" alt="${nomeFormatado}" class="player-photo" style="margin-bottom:0.2rem;">
                    <span style="position:absolute; left:4px; top:4px;">${flag}</span>
                </div>
                <div class="player-info" style="text-align:center; width:100%;">
                    <div style="display:flex; align-items:center; justify-content:center; gap:0.4rem; margin-bottom:0.2rem;">
                        <strong class="player-nick" style="font-size:1.1rem; color:var(--furia-gold-dark);">${nomeFormatado}</strong>
                    </div>
                    <span style="color:#fff; font-size:0.98rem;">${player.age ? `Idade: <b>${player.age}</b>` : ''}</span>
                    ${tipo ? `<div class='${tipoClass}'>${tipo}</div>` : ''}
                    <div class="player-details" style="margin-top:0.7rem; display:flex; flex-direction:column; gap:0.3rem;">
                        <span>🗓️ <b>Tempo na equipe:</b> ${traduzirTempoEquipe(player.timeOnTeam)}</span>
                        <span>🗺️ <b>Mapas jogados:</b> ${typeof player.mapsPlayed === 'number' ? player.mapsPlayed : '-'}</span>
                    </div>
                    ${getSocialIcons(player.socials)}
                </div>
            </div>
        </div>
    `;
}

// Função utilitária para exibir loading centralizado e padronizado
function showLoading(target, texto = 'Carregando...') {
    target.innerHTML = `<div class="news-loading">
        <span class="spinner spinner-white"></span>
        <span style="color:#fff; font-size:1.1rem; margin-top:0.7rem;">${texto}</span>
    </div>`;
}

// Modal Nossa História
const historyButton = document.getElementById('facts');
const historyModal = document.getElementById('historyModal');
const historyCloseButton = historyModal.querySelector('.history-modal-close');
historyButton.addEventListener('click', () => {
    closeChatbotIfOpen();
    historyModal.style.display = 'flex';
});
historyCloseButton.addEventListener('click', () => {
    historyModal.style.display = 'none';
});
historyModal.addEventListener('click', (e) => {
    if (e.target === historyModal) {
        historyModal.style.display = 'none';
    }
});

document.getElementById('closeHistoryModal').onclick = function() {
    document.getElementById('historyModal').style.display = 'none';
};
