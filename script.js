document.addEventListener("DOMContentLoaded", function () {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            const name = this.getAttribute("data-name");
            const price = parseFloat(this.getAttribute("data-price"));
            const image = this.getAttribute("data-image");

            const existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ name, price, quantity: 1, image });
            }

            localStorage.setItem("cart", JSON.stringify(cart));

            showPopup();
        });
    });

    function showPopup() {
        document.getElementById("cart-popup").style.display = "block";
    }

    window.closePopup = function () {
        document.getElementById("cart-popup").style.display = "none";
    };

    /* Cart Page Logic */
    const cartContainer = document.getElementById("cart-container");
    if (cartContainer) {
        renderCart();
    }

    function renderCart() {
        const cartList = document.getElementById("cart-items");
        const cartTotal = document.getElementById("cart-total");
        cartList.innerHTML = "";

        let total = 0;

        cart.forEach((item, index) => {
            const itemElement = document.createElement("div");
            itemElement.classList.add("cart-item");

            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <p>${item.name} - Ksh ${item.price} x ${item.quantity}</p>
                <button class="remove-item" data-index="${index}">Remove</button>
            `;

            total += item.price * item.quantity;
            cartList.appendChild(itemElement);
        });

        cartTotal.textContent = `Total: Ksh ${total}`;

        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", function () {
                const index = this.getAttribute("data-index");
                cart.splice(index, 1);
                localStorage.setItem("cart", JSON.stringify(cart));
                renderCart();
            });
        });
    }

    window.clearCart = function () {
        localStorage.removeItem("cart");
        renderCart();
    };
});
