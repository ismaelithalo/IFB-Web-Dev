// dom.js - Funções de manipulação avançada e renderização dinâmica do DOM (Document Object Model).

// Limpa todos os elementos filhos de um elemento pai de forma eficiente.
export function limparElemento(elemento) {
    elemento.innerHTML = '';
}

// Cria e insere o card do usuário encontrado na busca dentro do contêiner de resultados.
export function renderizarResultadoBusca(usuario, aoClicarCard) {
    const conteinerResultados = document.getElementById('resultados-busca-github');
    const listaResultados = document.getElementById('lista-perfis-encontrados');

    limparElemento(listaResultados);
    conteinerResultados.classList.remove('invisivel');

    const cartao = document.createElement('article');
    cartao.className = 'cartao-resultado';
    cartao.id = `resultado-${usuario.login}`;

    cartao.innerHTML = `
        <div class="perfil-info-resumo">
            <img src="${usuario.avatar_url}" alt="Foto de ${usuario.name || usuario.login}" class="foto-resultado">
            <div class="dados-texto-resultado">
                <span class="nome-resultado">${usuario.name || usuario.login}</span>
                <span class="usuario-resultado">@${usuario.login}</span>
            </div>
        </div>
        <i class="fa-solid fa-arrow-right icone-seta-acao"></i>
    `;

    cartao.addEventListener('click', () => aoClicarCard(usuario.login));
    listaResultados.appendChild(cartao);
}

// Função feita com auxílio de IA
// Retorna uma cor em formato hexadecimal calculada dinamicamente a partir do nome da linguagem de programação.
function obterCorLinguagem(linguagem) {
    if (!linguagem || linguagem.trim() === '') {
        return '#8b949e';
    }

    // Calcula um valor de hash simples a partir do nome da linguagem
    let hash = 0;
    const str = linguagem.toLowerCase();
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Mapeia o hash para um matiz (hue) entre 0 e 360 graus
    const hue = Math.abs(hash) % 360;

    // Define saturação (65%) e luminosidade (55%) para obter cores vibrantes e harmônicas
    const s = 65;
    const l = 55;

    // Converte HSL para formato hexadecimal
    const lPercent = l / 100;
    const a = (s / 100) * Math.min(lPercent, 1 - lPercent);
    const f = (n) => {
        const k = (n + hue / 30) % 12;
        const color = lPercent - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');
    };

    return `#${f(0)}${f(8)}${f(4)}`;
}

// Reconstrói dinamicamente e renderiza o painel do dashboard analítico completo com estatísticas e repositórios autorais.
export function renderizarDashboard(resumoAnalise, repositoriosMapeados) {
    const conteinerDashboard = document.getElementById('conteudo-completo-dashboard');
    limparElemento(conteinerDashboard);

    // 1. Criação das colunas principais
    const colunaLateral = document.createElement('aside');
    colunaLateral.className = 'coluna-lateral';

    const colunaPrincipal = document.createElement('main');
    colunaPrincipal.className = 'coluna-principal';

    // 2. Coluna Lateral - Cartão de Perfil
    const cartaoPerfil = document.createElement('div');
    cartaoPerfil.className = 'cartao-perfil-detalhado';

    let metaHTML = '';
    if (resumoAnalise.localizacao && resumoAnalise.localizacao !== 'Não informada') {
        metaHTML += `<div class="item-meta-perfil"><i class="fa-solid fa-location-dot"></i><span>${resumoAnalise.localizacao}</span></div>`;
    }
    if (resumoAnalise.empresa && resumoAnalise.empresa !== 'Autônomo / Freelancer') {
        metaHTML += `<div class="item-meta-perfil"><i class="fa-solid fa-building"></i><span>${resumoAnalise.empresa}</span></div>`;
    }
    if (resumoAnalise.linkSite) {
        const linkExibicao = resumoAnalise.linkSite.replace(/https?:\/\//, '');
        metaHTML += `<div class="item-meta-perfil"><i class="fa-solid fa-link"></i><a href="${resumoAnalise.linkSite}" target="_blank" rel="noopener noreferrer">${linkExibicao}</a></div>`;
    }

    cartaoPerfil.innerHTML = `
        <img src="${resumoAnalise.avatarUrl}" alt="Avatar de ${resumoAnalise.nome}" class="avatar-perfil">
        <h2 class="nome-perfil">${resumoAnalise.nome}</h2>
        <span class="username-perfil">@${resumoAnalise.usuario}</span>
        <p class="bio-perfil">${resumoAnalise.biografia}</p>
        <div class="divisoria"></div>
        <div class="meta-perfil">
            ${metaHTML || '<div class="item-meta-perfil"><i class="fa-solid fa-info-circle"></i><span>Perfil sem metadados adicionais</span></div>'}
        </div>
    `;

    // 3. Coluna Principal - Cartão de Análise Tech (Destaque)
    const cartaoAnalise = document.createElement('div');
    cartaoAnalise.className = 'cartao-analise-tech';
    const corLinguagem = obterCorLinguagem(resumoAnalise.linguagemPrincipal);

    cartaoAnalise.innerHTML = `
        <h3 class="titulo-analise"><i class="fa-solid fa-chart-line"></i> Análise de Perfil</h3>
        <div class="conteiner-blocos-analise">
            <div class="bloco-analise">
                <span class="rotulo-analise">Nível</span>
                <span class="badge-nivel-tech">${resumoAnalise.nivelTech}</span>
            </div>
            <div class="bloco-analise">
                <span class="rotulo-analise">Arquétipo</span>
                <span class="tipo-desenvolvedor">${resumoAnalise.arquetipoTech}</span>
            </div>
            <div class="bloco-analise">
                <span class="rotulo-analise">Linguagem</span>
                <span class="linguagem-destacada">
                    <span class="ponto-linguagem" style="background-color: ${corLinguagem};"></span>
                    <span>${resumoAnalise.linguagemPrincipal}</span>
                </span>
            </div>
        </div>
    `;

    colunaLateral.appendChild(cartaoPerfil);

    // 4. Coluna Principal - Grade de Estatísticas
    const gradeEstats = document.createElement('div');
    gradeEstats.className = 'grade-estatisticas';

    const estats = [
        { valor: resumoAnalise.seguidores, rotulo: 'Seguidores', icone: 'fa-users' },
        { valor: resumoAnalise.seguindo, rotulo: 'Seguindo', icone: 'fa-user-check' },
        { valor: resumoAnalise.repositoriosPublicos, rotulo: 'Repositórios', icone: 'fa-box-archive' },
        { valor: resumoAnalise.totalEstrelas, rotulo: 'Estrelas Totais', icone: 'fa-star' }
    ];

    estats.forEach(estat => {
        const item = document.createElement('div');
        item.className = 'cartao-estatistica';
        item.innerHTML = `
            <div class="icone-estatistica"><i class="fa-solid ${estat.icone}"></i></div>
            <div class="dados-estatistica">
                <span class="valor-estatistica">${estat.valor}</span>
                <span class="rotulo-estatistica">${estat.rotulo}</span>
            </div>
        `;
        gradeEstats.appendChild(item);
    });

    // 5. Coluna Principal - Seção de Repositórios
    const secaoRepos = document.createElement('section');
    secaoRepos.className = 'secao-repositorios';

    const cabecalhoSecao = document.createElement('div');
    cabecalhoSecao.className = 'subtitulo-secao';
    cabecalhoSecao.innerHTML = `
        <span>Repositórios Autorais</span>
        <span class="contador-repositorios">${repositoriosMapeados.length} projetos</span>
    `;

    const gradeRepos = document.createElement('div');
    gradeRepos.className = 'grade-repositorios';

    if (repositoriosMapeados.length === 0) {
        const mensagemVazio = document.createElement('p');
        mensagemVazio.className = 'rotulo-analise';
        mensagemVazio.style.gridColumn = '1 / -1';
        mensagemVazio.style.textAlign = 'center';
        mensagemVazio.style.padding = '2rem';
        mensagemVazio.textContent = 'Este perfil não possui repositórios originais (não-forks) ativos.';
        gradeRepos.appendChild(mensagemVazio);
    } else {
        repositoriosMapeados.forEach(repo => {
            const cartaoRepo = document.createElement('article');
            cartaoRepo.className = 'cartao-repositorio';

            const corRepoLang = obterCorLinguagem(repo.linguagem);

            cartaoRepo.innerHTML = `
                <div class="cabecalho-repositorio">
                    <a href="${repo.urlAcesso}" target="_blank" rel="noopener noreferrer" class="titulo-repositorio">
                        <i class="fa-regular fa-folder-open"></i>
                        <span>${repo.nome}</span>
                    </a>
                    <p class="descricao-repositorio">${repo.descricao}</p>
                </div>
                <div class="rodape-repositorio">
                    <div class="detalhes-repositorio">
                        <div class="item-detalhe-repo">
                            <span class="ponto-linguagem" style="background-color: ${corRepoLang}; width: 8px; height: 8px;"></span>
                            <span>${repo.linguagem}</span>
                        </div>
                        <div class="item-detalhe-repo">
                            <i class="fa-regular fa-star"></i>
                            <span>${repo.estrelas}</span>
                        </div>
                        <div class="item-detalhe-repo">
                            <i class="fa-solid fa-code-fork"></i>
                            <span>${repo.bifurcacoes}</span>
                        </div>
                    </div>
                    <a href="${repo.urlAcesso}" target="_blank" rel="noopener noreferrer" class="link-repositorio">
                        <span>Acessar</span>
                        <i class="fa-solid fa-arrow-up-right-from-square"></i>
                    </a>
                </div>
            `;
            gradeRepos.appendChild(cartaoRepo);
        });
    }

    secaoRepos.appendChild(cabecalhoSecao);
    secaoRepos.appendChild(gradeRepos);

    colunaPrincipal.appendChild(cartaoAnalise);
    colunaPrincipal.appendChild(gradeEstats);
    colunaPrincipal.appendChild(secaoRepos);

    conteinerDashboard.appendChild(colunaLateral);
    conteinerDashboard.appendChild(colunaPrincipal);
}

// Controla de forma fluida a transição e visibilidade das seções da aplicação.
export function alternarTelas(telaAtiva) {
    const secaoBusca = document.getElementById('secao-busca-usuario');
    const secaoDashboard = document.getElementById('dashboard-analise-tech');
    const erroAlerta = document.getElementById('alerta-erro-perfil');

    erroAlerta.classList.add('invisivel');

    if (telaAtiva === 'busca') {
        secaoDashboard.classList.add('invisivel');
        secaoBusca.classList.remove('invisivel');
    } else if (telaAtiva === 'dashboard') {
        secaoBusca.classList.add('invisivel');
        secaoDashboard.classList.remove('invisivel');
    }
}

// Apresenta na tela um banner dinâmico notificando erros ou avisos amigáveis para o usuário.
export function exibirErro(mensagem) {
    const erroAlerta = document.getElementById('alerta-erro-perfil');
    const textoErro = document.getElementById('texto-alerta-erro');

    textoErro.textContent = mensagem;
    erroAlerta.classList.remove('invisivel');

    window.scrollTo({ top: erroAlerta.offsetTop - 50, behavior: 'smooth' });
}

