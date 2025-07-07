const menu = document.getElementById("menu");
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const cartCounter = document.getElementById("cart-count");
const addressInput = document.getElementById("address");
const addressWarn = document.getElementById("address-warn");


let cart = [];

//Abrir o modal do carrinho
cartBtn.addEventListener("click", function () {
    cartModal.style.display = "flex"
    updateCartModal();
})

//Fechar o modal quando clicar fora 
cartModal.addEventListener("click", function () {
    if (event.target === cartModal) {
        cartModal.style.display = "none"
    }
})

//Fechar o modal quando clicar no botão fechar
closeModalBtn.addEventListener("click", function () {
    cartModal.style.display = "none"
})

//saber se clicou no botão do carrinho
menu.addEventListener("click", function (event) {

    let parentButton = event.target.closest(".add-to-cart-btn")

    if (parentButton) {
        const name = parentButton.getAttribute("data-name")
        const price = parseFloat(parentButton.getAttribute("data-price"))

        //Adicionar no carrinho.
        addToCart(name, price)
    }
})

//Funcão para adicionar no carrinho
function addToCart(name, price) {
    // alert(`o item é ${name}e o valor é ${price}`)
    //verificando se o item ja está na lista
    const resItem = cart.find(item => item.name === name)

    if (resItem) {
        //se o item ja existe, aumenta apenas a quantidade +1
        resItem.quantity += 1;
    } else {
        cart.push({
            name,
            price,
            quantity: 1,
        })

    }


    updateCartModal()
}

//atualiza o carrinho
function updateCartModal() {
    cartItemsContainer.innerHTML = "";
    let total = 0;


    cart.forEach(item =>{ //percorre a lista e estrutura as divs no html, criando dentro do modal os nomes preços etc
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col")

        cartItemElement.innerHTML = `
        <div class="flex items-center justify-between">
        <div>
            <div>
            <p class="font-medium">${item.name}</p>
            <p>Qtd: ${item.quantity}</p>
            <p class="font-medium mt-2 0" >R$ ${item.price.toFixed(2)}</p>
            </div>


            <button class="remove-from-cart-btn" data-name="${item.name}">
                Remover
            </button>
        </div>
    `
        //TOTAL
    total += item.price * item.quantity;

    cartItemsContainer.appendChild(cartItemElement)
    })

    cartTotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    cartCounter.innerHTML = cart.length;
    //fim do atualiza o carrinho

}

//função para remover o itemdo carrinho
cartItemsContainer.addEventListener("click", function (event){
    if(event.target.classList.contains("remove-from-cart-btn")){
        const name = event.target.getAttribute("data-name");

        removeItemCart(name);
    }
})

function removeItemCart(name){
    const index = cart.findIndex(item => item.name === name);

    if(index !== -1){
        const item = cart[index];

        if(item.quantity > 1){
            item.quantity -= 1;
            updateCartModal();
            return;
        }

        cart.splice(index, 1); //o splice pega a posicao e remove o item da lista
        updateCartModal();
    }
}

//função para pegar oq digitar e verificar
addressInput.addEventListener("input", function(event){
    let inputValue = event.target.value;

    if(inputValue !== ""){
        addressInput.classList.remove("border-red-500")
        addressWarn.classList.add("hidden") //tira a borda vermelha e esconde o alerta de baixo
    }
    //
})

//Finalizar o pedido
checkoutBtn.addEventListener("click", function(){
    if(cart.length === 0) return;

    if(addressInput.value === ""){
        addressWarn.classList.remove("hidden") //mostra o alerta
        addressInput.classList.add("border-red-500") //adiciona a borda vermelha ao redor do input
        return;
    }

    //Enviar o pedido para api do Whats
    const cartItems = cart.map((item) =>{
        return (
            ` ${item.name} Quantidade: (${item.quantity}) Preço: R$${item.price.toFixed(2)} |`
        )
    }).join("")

    const message = encodeURIComponent(cartItems)
    const phone = "+5511940484066"

    window.open(`https://wa.me/${phone}?text=${message} Endereço: ${addressInput.value}`, "_blank")

    //limpar o carrinho
    cart = [];
    updateCartModal();

    // console.log(cartItems)
})