document.addEventListener("DOMContentLoaded", () => {
    loadCart();
});

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price, image) {
    cart.push({ name, price, image });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(name + " added to cart!");
}

function loadCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceContainer = document.getElementById("total-price");

    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;

        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-details">
                <h3>${item.name}</h3>
                <p>Ksh ${item.price}</p>
            </div>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;

        cartItemsContainer.appendChild(cartItem);
    });

    totalPriceContainer.textContent = total;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function clearCart() {
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function placeOrder() {
    const paymentRef = document.getElementById("payment-ref").value;
    
    if (!paymentRef) {
        alert("Please enter a payment reference!");
        return;
    }

    const timestamp = new Date().toLocaleString();
    alert(`Order placed successfully! \nPayment Ref: ${paymentRef}\nTime: ${timestamp}`);
    
    clearCart();
}
