# Trabalho Prático Final – Projeto Web Completo: >DevScope
A ideia do projeto é utilizar a api base aberta do github para criar um portal capaz de analisar um perfil dado um username e gerar um "relatório de expertise" com base nos dados do perfil.

## Informações
Aluno: Ismael Ithalo
Turma: Programação para WEB 2026/1 
Módulo: 2
Professor: Hugo Cesar

## Detalhamento
- Para a construção do projeto, foi utilizada a API https://api.github.com
- Foi seguido a estrutura de diretórios sugerida com organização do javascript em módulos separados
- O projeto se baseia em uma tela base de busca de perfis do github, e após ser inserido um username válido, uma nova tela é carregada na mesma página contendo as informações de estatísticas
- O sistema de analise de perfil utiliza dados como tecnologias utilizadas em cada repositório, quantidade de estrelas, repositórios e seguidores para gerar um mini "relatório de expertise"
- Cada item de relatório é renderizado dinamicamente na tela de resultados utilizando manipulação de DOM com javascript
- Todo o analisador de perfil foi implementado utilizando uma única grande classe que recebe os parâmetros processados a partir das funções que consomem a API
- Para a request em si foi utilizada a biblioteca jQuery para realizar a requisição com AJAX
- Para atender aos requisitos de programação funcional os arrays foram processados utilizando map, filter e reduce
- O processamento do clique e carregamento da nova tela foi implementado através dos eventos `click` e `load`
