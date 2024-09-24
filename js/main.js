let selectCidades = document.querySelector('#cidades');
let candidatos = []; // Variável global para armazenar todos os candidatos
let listaCidades = []; // Lista para armazenar as cidades únicas

// Função para carregar os dados do arquivo JSON
function carregarDados() {
    fetch("./candidatos.json")
        .then(response => response.json())
        .then(dados => {
            candidatos = dados.candidatos; // Armazena os candidatos na variável global
            listaCidades = obterCidadesUnicas(candidatos);
            listaCidades = ordenarCidades(listaCidades);
            preencherSelectCidades(listaCidades);
        });
}

// Função para obter as cidades únicas dos candidatos
function obterCidadesUnicas(candidatos) {
    const cidadesSet = new Set();
    candidatos.forEach(candidato => {
        if (candidato.cidade) {
            cidadesSet.add(candidato.cidade);
        }
    });
    return Array.from(cidadesSet);
}

// Função para ordenar as cidades em ordem alfabética
function ordenarCidades(cidades) {
    return cidades.sort((a, b) => a.localeCompare(b));
}

// Função para preencher o select com as opções de cidades
function preencherSelectCidades(cidades) {
    cidades.forEach(cidade => {
        criarOpcaoCidade(cidade);
    });
}

// Função para criar cada opção de cidade no select
function criarOpcaoCidade(cidade) {
    let option = document.createElement('option');
    option.value = cidade;
    option.textContent = cidade;
    selectCidades.appendChild(option);
}

// Função para renderizar a lista de candidatos na tela
function renderizarCandidatos(candidatosFiltrados) {
    let divCandidatos = document.querySelector('.candidatos');
    divCandidatos.innerHTML = ''; // Limpa a lista de candidatos exibidos

    candidatosFiltrados.forEach(candidato => {
        const perfilDiv = document.createElement('div');
        perfilDiv.className = 'perfil'; // Classe para estilização, se necessário

        // Criando e preenchendo os elementos do perfil
        const foto = document.createElement('img');
        foto.src = candidato.linkFoto;

        const nomeUrna = document.createElement('span');
        nomeUrna.id = 'nomeUrna';
        nomeUrna.textContent = candidato.nomeUrna.toUpperCase();

        const numeroUrna = document.createElement('span');
        numeroUrna.id = 'numeroUrna';
        numeroUrna.textContent = candidato.numUrna;

        const nomeCompleto = document.createElement('span');
        nomeCompleto.id = 'nomeCompleto';
        nomeCompleto.textContent = formatarNomeCompleto(candidato.nomeCompleto);

        const cidade = document.createElement('span');
        cidade.id = 'cidade';
        cidade.textContent = candidato.cidade;

        const partido = document.createElement('span');
        partido.id = 'partidoSigla';
        partido.textContent = `${candidato.partido} - ${candidato.siglaPartido.toUpperCase()}`;

        // Adiciona elementos ao div do perfil
        perfilDiv.appendChild(foto);
        perfilDiv.appendChild(nomeUrna);
        perfilDiv.appendChild(numeroUrna);
        perfilDiv.appendChild(nomeCompleto);
        perfilDiv.appendChild(cidade);
        perfilDiv.appendChild(partido);

        // Adiciona links de redes sociais
        adicionarLinksRedesSociais(perfilDiv, candidato);

        divCandidatos.appendChild(perfilDiv); // Adiciona o perfil à lista de candidatos
    });
}

// Função para formatar o nome completo, colocando a primeira letra de cada palavra em maiúscula
function formatarNomeCompleto(nome) {
    return nome.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
}

// Função para adicionar os links de redes sociais, se existirem
function adicionarLinksRedesSociais(perfilDiv, candidato) {
    const instagramLink = document.createElement('a');
    const instagramImg = document.createElement('img');
    instagramImg.id = 'instagram';

    if (candidato.instagram) {
        instagramLink.href = candidato.instagram;
        instagramImg.src = 'images/instagram.svg';
        instagramLink.appendChild(instagramImg);
        perfilDiv.appendChild(instagramLink);
    } 

    const facebookLink = document.createElement('a');
    const facebookImg = document.createElement('img');
    facebookImg.id = 'facebook';

    if (candidato.facebook) {
        facebookLink.href = candidato.facebook;
        facebookImg.src = 'images/facebook.svg';
        facebookLink.appendChild(facebookImg);
        perfilDiv.appendChild(facebookLink);
    }
}

// Função que é chamada quando o usuário seleciona uma cidade no select
function selecionarCidade() {
    const cidadeSelecionada = selectCidades.value;
    const candidatosFiltrados = candidatos.filter(candidato => candidato.cidade === cidadeSelecionada);
    renderizarCandidatos(candidatosFiltrados);
}

// Adiciona evento de mudança ao select para filtrar e exibir os candidatos da cidade selecionada
selectCidades.addEventListener('change', selecionarCidade);

// Carrega os dados ao carregar a página
document.addEventListener('DOMContentLoaded', carregarDados);
