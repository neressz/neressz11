// script.js - Funções completas para o site de Material de Construção

// =============================
// BUSCA DE PRODUTOS
// =============================
function buscarProdutos() {
    const input = document.getElementById('buscar');
    const filtro = input.value.toLowerCase();
    const itens = document.querySelectorAll('.produto');

    itens.forEach(item => {
        const nome = item.querySelector('h3').innerText.toLowerCase();
        item.style.display = nome.includes(filtro) ? 'block' : 'none';
    });
}

// =============================
// MODAL DE DETALHES
// =============================
function abrirModal(idProduto) {
    const modal = document.getElementById('modal-detalhes');
    const titulo = document.getElementById('modal-titulo');

    titulo.innerText = `Detalhes do produto #${idProduto}`;
    modal.style.display = 'flex';
}

function fecharModal() {
    document.getElementById('modal-detalhes').style.display = 'none';
}

// =============================
// CARRINHO COMPLETO
// =============================
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

function adicionarAoCarrinho(produto, preco) {
    carrinho.push({ produto, preco, quantidade: 1 });
    salvarCarrinho();
    atualizarCarrinho();
}

function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    salvarCarrinho();
    atualizarCarrinho();
}

function atualizarQuantidade(index, tipo) {
    if (tipo === '+') carrinho[index].quantidade++;
    if (tipo === '-' && carrinho[index].quantidade > 1) carrinho[index].quantidade--;

    salvarCarrinho();
    atualizarCarrinho();
}

function atualizarCarrinho() {
    const lista = document.getElementById('lista-carrinho');
    const totalSpan = document.getElementById('total-itens');
    const totalPreco = document.getElementById('total-preco');

    if (!lista) return;

    lista.innerHTML = '';
    let total = 0;

    carrinho.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${item.produto} - R$ ${item.preco} x ${item.quantidade}
            <button onclick="atualizarQuantidade(${index}, '+')">+</button>
            <button onclick="atualizarQuantidade(${index}, '-')">-</button>
            <button onclick="removerDoCarrinho(${index})">Remover</button>
        `;
        lista.appendChild(li);

        total += item.preco * item.quantidade;
    });

    totalSpan.innerText = carrinho.length;
    totalPreco.innerText = total.toFixed(2);
}

function salvarCarrinho() {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

// =============================
// LOGIN SIMPLES
// =============================
function login() {
    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;

    if (usuario === "admin" && senha === "123") {
        alert("Login realizado com sucesso!");
        window.location.href = "index.html";
    } else {
        alert("Usuário ou senha incorretos!");
    }
}

// =============================
// FILTRO POR CATEGORIA
// =============================
function filtrarCategoria(categoria) {
    const itens = document.querySelectorAll('.produto');

    itens.forEach(item => {
        if (categoria === 'todos') {
            item.style.display = 'block';
        } else {
            item.style.display = item.dataset.cat === categoria ? 'block' : 'none';
        }
    });
}

// =============================
// CHECKOUT
// =============================
function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    alert("Compra finalizada com sucesso! Obrigado por comprar conosco.");
    carrinho = [];
    salvarCarrinho();
    atualizarCarrinho();
}
