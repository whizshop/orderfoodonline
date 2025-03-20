document.addEventListener("DOMContentLoaded", function () {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    updateCartCount();

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            const name = this.dataset.name;
            const price = this.dataset.price;
            const image = this.dataset.image;

            const existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ name, price, image, quantity: 1 });
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartCount();
            showPopup("Item added to cart!");
        });
    });

    function updateCartCount() {
        document.getElementById("cart-count").textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    function showPopup(message) {
        const popup = document.getElementById("popup");
        popup.textContent = message;
        popup.style.display = "block";
        setTimeout(() => popup.style.display = "none", 2000);
    }

    if (document.getElementById("cart-items")) {
        renderCart();
    }
});

function renderCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.getElementById("cart-items");
    cartContainer.innerHTML = "";

    cart.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("cart-item");
        itemDiv.innerHTML = `
            <img src="${item.image}" width="80">
            <p>${item.name} - Ksh ${item.price}</p>
            <button onclick="updateQuantity('${item.name}', -1)">-</button>
            <span>${item.quantity}</span>
            <button onclick="updateQuantity('${item.name}', 1)">+</button>
        `;
        cartContainer.appendChild(itemDiv);
    });
}

function updateQuantity(name, change) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let item = cart.find(item => item.name === name);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) cart = cart.filter(i => i.name !== name);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    }
}

document.getElementById("place-order")?.addEventListener("click", function () {
    showPopup("Order Submitted Successfully! You'll receive an SMS when ready. Thank you!");
    localStorage.removeItem("cart");
    renderCart();
});

document.getElementById("clear-cart")?.addEventListener("click", function () {
    localStorage.removeItem("cart");
    renderCart();
});
