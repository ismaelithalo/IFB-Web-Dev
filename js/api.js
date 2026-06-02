// api.js - Módulo de integração assíncrona com a API pública do GitHub.

// Realiza uma requisição para obter os dados básicos de perfil de um usuário específico do GitHub.
export async function obterDadosUsuario(usuario) {
    const resposta = await fetch(`https://api.github.com/users/${encodeURIComponent(usuario)}`);
    if (!resposta.ok) {
        throw new Error(resposta.status === 404 ? 'Usuário não encontrado' : 'Erro ao carregar dados do GitHub');
    }
    return await resposta.json();
}

// Realiza uma requisição para buscar a lista de até 100 repositórios públicos associados ao perfil do usuário.
export async function obterRepositorios(usuario) {
    const resposta = await fetch(`https://api.github.com/users/${encodeURIComponent(usuario)}/repos?per_page=100`);
    if (!resposta.ok) {
        throw new Error('Falha ao carregar os repositórios públicos');
    }
    return await resposta.json();
}
