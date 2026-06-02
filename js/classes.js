// classes.js - Modelagem de dados e análise de perfil profissional com Programação Orientada a Objetos.

import { calcularTotalEstrelas, filtrarProjetosAutorais } from './funcoes.js';

export class AnalisadorPerfil {
    // Inicializa a classe com as propriedades cruciais de dados de perfil e repositórios brutos do desenvolvedor.
    constructor(dadosUsuario, repositorios) {
        this.usuario = dadosUsuario;
        this.repositorios = repositorios;
        this.projetosAutorais = filtrarProjetosAutorais(repositorios);
    }

    // Calcula o nível de maturidade do desenvolvedor baseado em métricas de estrelas, seguidores e repositórios.
    calcularNivelTech() {
        const estrelas = calcularTotalEstrelas(this.repositorios);
        const seguidores = this.usuario.followers || 0;
        const repositoriosContagem = this.projetosAutorais.length;
        const pontuacao = (estrelas * 5) + (seguidores * 2) + (repositoriosContagem * 3);

        if (pontuacao >= 150) return 'Tech Expert';
        if (pontuacao >= 70) return 'Avançado';
        if (pontuacao >= 25) return 'Intermediário';
        return 'Iniciante';
    }

    // Identifica de forma estatística a linguagem de programação de maior dominância no histórico de projetos autorais.
    descobrirLinguagemPrincipal() {
        if (this.projetosAutorais.length === 0) return 'Nenhuma';
        
        const contagem = this.projetosAutorais.reduce((acumulador, repo) => {
            if (repo.language) {
                acumulador[repo.language] = (acumulador[repo.language] || 0) + 1;
            }
            return acumulador;
        }, {});

        return Object.keys(contagem).reduce((a, b) => contagem[a] > contagem[b] ? a : b, 'Nenhuma');
    }

    // Classifica o perfil em um arquétipo técnico baseado nas linguagens de programação utilizadas pelo desenvolvedor.
    definirTipoDesenvolvedor() {
        const linguagem = this.descobrirLinguagemPrincipal().toLowerCase();
        
        if (['javascript', 'typescript', 'html', 'css'].includes(linguagem)) {
            return 'Especialista Front-end';
        } else if (['python', 'java', 'go', 'c#', 'php', 'ruby', 'c++'].includes(linguagem)) {
            return 'Especialista Back-end';
        } else if (['kotlin', 'swift', 'dart'].includes(linguagem)) {
            return 'Desenvolvedor Mobile';
        }
        return 'Engenheiro Fullstack / Explorer';
    }

    // Consolida e exporta todas as métricas calculadas em um formato de objeto estruturado e limpo.
    obterResumoCompleto() {
        return {
            nome: this.usuario.name || this.usuario.login,
            usuario: this.usuario.login,
            avatarUrl: this.usuario.avatar_url,
            biografia: this.usuario.bio || 'Sem biografia disponível.',
            localizacao: this.usuario.location || 'Não informada',
            empresa: this.usuario.company || 'Autônomo / Freelancer',
            linkSite: this.usuario.blog || '',
            seguidores: this.usuario.followers || 0,
            seguindo: this.usuario.following || 0,
            repositoriosPublicos: this.usuario.public_repos || 0,
            totalEstrelas: calcularTotalEstrelas(this.repositorios),
            nivelTech: this.calcularNivelTech(),
            linguagemPrincipal: this.descobrirLinguagemPrincipal(),
            arquetipoTech: this.definirTipoDesenvolvedor()
        };
    }
}
