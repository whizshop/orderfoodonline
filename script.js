function updateCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const totalPriceElement = document.getElementById("total-price");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    cartItemsContainer.innerHTML = "";
    let totalPrice = 0;

    cart.forEach((item, index) => {
        totalPrice += item.price;

        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
            <div class="cart-item-info">
                <h3>${item.name}</h3>
                <p>Ksh ${item.price}</p>
            </div>
            <img src="${item.image}" alt="${item.name}">
            <button onclick="removeFromCart(${index})">Remove</button>
        `;

        cartItemsContainer.appendChild(cartItem);
    });

    totalPriceElement.textContent = totalPrice;
    cartCount.textContent = cart.length;
}

function addToCart(name, price, image) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ name, price, image });
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}

function clearCart() {
    localStorage.removeItem("cart");
    updateCart();
}

function placeOrder() {
    alert("Order placed successfully!");
    clearCar
