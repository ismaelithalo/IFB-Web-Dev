// main.js - Arquivo de entrada principal e coordenador geral do fluxo de eventos, integração e chamadas assíncronas.

import { obterDadosUsuario, obterRepositorios } from './api.js';
import { AnalisadorPerfil } from './classes.js';
import { filtrarProjetosAutorais, mapearDadosRepositorios } from './funcoes.js';
import { renderizarResultadoBusca, renderizarDashboard, alternarTelas, exibirErro, exibirCarregamento } from './dom.js';

let usuarioCache = null;

// Busca informações básicas do usuário e prepara o resultado preliminar de pesquisa na tela inicial.
async function processarBuscaPerfil(username) {
    exibirCarregamento(true);
    document.getElementById('alerta-erro-perfil').classList.add('invisivel');
    
    try {
        usuarioCache = await obterDadosUsuario(username);
        renderizarResultadoBusca(usuarioCache, carregarPainelDashboard);
    } catch (erro) {
        exibirErro(erro.message);
    } finally {
        exibirCarregamento(false);
    }
}

// Carrega os repositórios públicos, aciona o analisador de perfil e reconstrói o painel detalhado no dashboard.
async function carregarPainelDashboard(username) {
    exibirCarregamento(true);
    
    try {
        const repositorios = await obterRepositorios(username);
        const analisador = new AnalisadorPerfil(usuarioCache, repositorios);
        
        const autorais = filtrarProjetosAutorais(repositorios);
        const reposMapeados = mapearDadosRepositorios(autorais);
        const resumoAnalise = analisador.obterResumoCompleto();
        
        renderizarDashboard(resumoAnalise, reposMapeados);
        alternarTelas('dashboard');
    } catch (erro) {
        exibirErro('Erro ao processar as métricas do perfil. Tente novamente mais tarde.');
    } finally {
        exibirCarregamento(false);
    }
}

// Inicializa a escuta de eventos vitais do sistema assim que a árvore do DOM estiver completamente carregada.
document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formulario-pesquisa');
    const campoBusca = document.getElementById('campo-usuario-github');
    const botaoRetornar = document.getElementById('botao-retornar-busca');
    const erroAlerta = document.getElementById('alerta-erro-perfil');
    
    formulario.addEventListener('submit', (evento) => {
        evento.preventDefault();
        const nomePesquisa = campoBusca.value.trim();
        if (nomePesquisa) {
            processarBuscaPerfil(nomePesquisa);
        }
    });

    botaoRetornar.addEventListener('click', () => {
        alternarTelas('busca');
        campoBusca.value = '';
        campoBusca.focus();
        erroAlerta.classList.add('invisivel');
    });
});
