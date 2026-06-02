// funcoes.js - Funções utilitárias puras fundamentadas em Programação Funcional para manipulação de coleções de dados.

// Filtra e retorna apenas os repositórios que foram criados de forma autoral pelo desenvolvedor, removendo forks.
export function filtrarProjetosAutorais(repositorios) {
    return repositorios.filter(repo => !repo.fork);
}

// Soma e retorna a contagem acumulada de estrelas obtidas pelo desenvolvedor em todos os seus repositórios.
export function calcularTotalEstrelas(repositorios) {
    return repositorios.reduce((acumulado, repo) => acumulado + (repo.stargazers_count || 0), 0);
}

// Mapeia e simplifica a estrutura de dados de cada repositório mantendo apenas as propriedades úteis para exibição.
export function mapearDadosRepositorios(repositorios) {
    return repositorios.map(repo => ({
        nome: repo.name,
        descricao: repo.description || 'Nenhuma descrição foi fornecida para este projeto.',
        estrelas: repo.stargazers_count || 0,
        bifurcacoes: repo.forks_count || 0,
        linguagem: repo.language || 'Outra',
        urlAcesso: repo.html_url
    }));
}
