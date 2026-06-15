// api.js - Módulo de integração assíncrona com a API pública do GitHub.

// Realiza uma requisição para obter os dados básicos de perfil de um usuário específico do GitHub.
export async function obterDadosUsuario(usuario) {
    try {
        return await $.get(`https://api.github.com/users/${encodeURIComponent(usuario)}`);
    } catch (erro) {
        throw new Error(erro.status === 404 ? 'Usuário não encontrado' : 'Erro ao carregar dados do GitHub');
    }
}

// Realiza uma requisição para buscar a lista de até 100 repositórios públicos associados ao perfil do usuário.
export async function obterRepositorios(usuario) {
    try {
        return await $.get(`https://api.github.com/users/${encodeURIComponent(usuario)}/repos?per_page=100`);
    } catch (erro) {
        throw new Error('Falha ao carregar os repositórios públicos');
    }
}
