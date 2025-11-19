let carrinho = [];
let aberto = false;

function adicionarCarrinho(nome, preco) {
    carrinho.push({ nome, preco });

    document.getElementById("cart-count").innerText = carrinho.length;

    atualizarCarrinho();
}

function atualizarCarrinho() {
    const lista = document.getElementById("cart-items");
    const total = document.getElementById("cart-total");

    lista.innerHTML = "";
    let soma = 0;

    carrinho.forEach(item => {
        let li = document.createElement("li");
        li.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
        lista.appendChild(li);
        soma += item.preco;
    });

    total.textContent = soma.toFixed(2);
}

function toggleCarrinho() {
    const painel = document.getElementById("carrinho");

    aberto = !aberto;

    if (aberto) {
        painel.classList.add("aberto");
    } else {
        painel.classList.remove("aberto");
    }
}
