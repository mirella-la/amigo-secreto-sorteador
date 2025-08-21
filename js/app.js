// Array para armazenar os nomes dos amigos
let amigos = [];

/**
 * Função para adicionar um amigo à lista
 */
function adicionar() {
    let inputAmigo = document.getElementById('nome-amigo');
    let nomeAmigo = inputAmigo.value.trim();
    
    // Validação: verifica se o campo está vazio
    if (nomeAmigo === '') {
        alert('Por favor, informe o nome do amigo!');
        inputAmigo.focus();
        return;
    }
    
    // Validação: verifica se o nome já foi adicionado (case-insensitive)
    if (amigos.some(amigo => amigo.toLowerCase() === nomeAmigo.toLowerCase())) {
        alert('Este nome já foi adicionado! Escolha outro nome.');
        inputAmigo.value = '';
        inputAmigo.focus();
        return;
    }

    // Adiciona o amigo ao array
    amigos.push(nomeAmigo);
    
    // Atualiza a exibição da lista de amigos
    atualizarListaAmigos();
    
    // Limpa o campo de entrada e mantém o foco
    inputAmigo.value = '';
    inputAmigo.focus();
    
    // Feedback visual
    console.log(`Amigo "${nomeAmigo}" adicionado com sucesso!`);
}

/**
 * Função para atualizar a exibição da lista de amigos
 */
function atualizarListaAmigos() {
    let lista = document.getElementById('lista-amigos');
    
    if (amigos.length === 0) {
        lista.textContent = 'Nenhum amigo adicionado ainda';
        lista.style.color = '#666';
        lista.style.fontStyle = 'italic';
    } else {
        lista.textContent = amigos.join(', ');
        lista.style.color = '#fff';
        lista.style.fontStyle = 'normal';
    }
}

/**
 * Função para realizar o sorteio do amigo secreto
 */
function sortear() {
    // Validação: verifica se há pelo menos 4 amigos
    if (amigos.length < 4) {
        alert(`Adicione pelo menos 4 amigos para realizar o sorteio!\nVocê tem apenas ${amigos.length} amigo(s).`);
        return;
    }

    // Cria uma cópia do array para embaralhar
    let amigosEmbaralhados = [...amigos];
    embaralhar(amigosEmbaralhados);

    // Monta o resultado do sorteio
    let resultadoSorteio = document.getElementById('lista-sorteio');
    resultadoSorteio.innerHTML = '';
    
    // Cria os pares de amigo secreto
    for (let i = 0; i < amigosEmbaralhados.length; i++) {
        let doador = amigosEmbaralhados[i];
        let presenteado;
        
        // O último amigo da lista presenteia o primeiro (formando um círculo)
        if (i === amigosEmbaralhados.length - 1) {
            presenteado = amigosEmbaralhados[0];
        } else {
            presenteado = amigosEmbaralhados[i + 1];
        }
        
        // Adiciona o par ao resultado
        resultadoSorteio.innerHTML += `
            <div style="margin-bottom: 0.5rem; padding: 0.5rem; background: rgba(24, 117, 232, 0.1); border-radius: 4px;">
                <strong>${doador}</strong> 🎁 <strong style="color: #00f4bf;">${presenteado}</strong>
            </div>
        `;
    }
    
    // Feedback de sucesso
    console.log('Sorteio realizado com sucesso!');
}

/**
 * Algoritmo Fisher-Yates para embaralhar o array
 * @param {Array} lista - Array a ser embaralhado
 */
function embaralhar(lista) {
    for (let indice = lista.length - 1; indice > 0; indice--) {
        const indiceAleatorio = Math.floor(Math.random() * (indice + 1));
        [lista[indice], lista[indiceAleatorio]] = [lista[indiceAleatorio], lista[indice]];
    }
}

/**
 * Função para reiniciar o jogo
 */
function reiniciar() {
    // Confirma se o usuário realmente deseja reiniciar
    if (amigos.length > 0) {
        const confirmacao = confirm('Tem certeza que deseja reiniciar? Todos os amigos e sorteios serão perdidos.');
        if (!confirmacao) {
            return;
        }
    }
    
    // Limpa o array de amigos
    amigos = [];
    
    // Limpa as exibições
    document.getElementById('lista-amigos').textContent = 'Nenhum amigo adicionado ainda';
    document.getElementById('lista-amigos').style.color = '#666';
    document.getElementById('lista-amigos').style.fontStyle = 'italic';
    
    document.getElementById('lista-sorteio').innerHTML = 'Clique em "Sortear" para ver os pares!';
    document.getElementById('lista-sorteio').style.color = '#666';
    document.getElementById('lista-sorteio').style.fontStyle = 'italic';
    
    // Limpa o campo de entrada e define o foco
    document.getElementById('nome-amigo').value = '';
    document.getElementById('nome-amigo').focus();
    
    // Feedback
    console.log('Jogo reiniciado!');
}

/**
 * Adiciona funcionalidade para pressionar Enter no campo de entrada
 */
document.addEventListener('DOMContentLoaded', function() {
    const inputAmigo = document.getElementById('nome-amigo');
    
    if (inputAmigo) {
        inputAmigo.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                adicionar();
            }
        });
        
        // Define o foco inicial no campo
        inputAmigo.focus();
    }
});

/**
 * Função utilitária para validar nome
 * @param {string} nome - Nome a ser validado
 * @returns {boolean} - True se o nome for válido
 */
function validarNome(nome) {
    return nome && nome.trim().length >= 2 && nome.trim().length <= 50;
}

// Log inicial para debug
console.log('Amigo Secreto carregado! 🎁');