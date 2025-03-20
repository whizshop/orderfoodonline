document.addEventListener("DOMContentLoaded", function () {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    updateCartCount();

    // Add to cart functionality
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            const name = this.dataset.name;
            const price = parseFloat(this.dataset.price);
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

    // Render cart items
    if (document.getElementById("cart-items")) {
        renderCart();
    }

    // Clear cart
    document.getElementById("clear-cart")?.addEventListener("click", function () {
        localStorage.removeItem("cart");
        renderCart();
    });

    // Place order
    document.getElementById("place-order")?.addEventListener("click", function () {
        showOrderPopup();
        localStorage.removeItem("cart");
        renderCart();
    });
});

// Update cart count
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.getElementById("cart-count").textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

// Render cart items
function renderCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.getElementById("cart-items");
    cartContainer.innerHTML = "";

    let totalPrice = 0;

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

        totalPrice += item.price * item.quantity;
    });

    // Display total price
    const totalDiv = document.createElement("div");
    totalDiv.classList.add("total-price");
    totalDiv.innerHTML = `<p>Total: Ksh ${totalPrice}</p>`;
    cartContainer.appendChild(totalDiv);
}

// Update item quantity
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

// Show popup
function showPopup(message) {
    const popup = document.getElementById("popup");
    const popupMessage = document.getElementById("popup-message");
    popupMessage.textContent = message;
    popup.style.display = "block";
    setTimeout(() => popup.style.display = "none", 2000);
}

// Show order confirmation popup
function showOrderPopup() {
    const orderPopup = document.getElementById("order-popup");
    orderPopup.style.display = "block";
}

// Close order popup
function closeOrderPopup() {
    const orderPopup = document.getElementById("order-popup");
    orderPopup.style.display = "none";
}
