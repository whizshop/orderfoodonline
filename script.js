document.addEventListener("DOMContentLoaded", function () {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    updateCartDisplay();

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            const name = this.getAttribute("data-name");
            const price = parseFloat(this.getAttribute("data-price"));
            const image = this.parentElement.querySelector("img").src;

            const existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ name, price, quantity: 1, image });
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartDisplay();
        });
    });

    function updateCartDisplay() {
        const cartContainer = document.querySelector(".cart-container");
        if (!cartContainer) return;

        cartContainer.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            total += item.price * item.quantity;

            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <p>${item.name} - Ksh ${item.price} x ${item.quantity}</p>
                <button class="remove-item" data-index="${index}">Remove</button>
            `;

            cartContainer.appendChild(cartItem);
        });

        const checkoutButton = document.createElement("button");
        checkoutButton.classList.add("checkout-btn");
        checkoutButton.textContent = `Checkout (Total: Ksh ${total})`;
        checkoutButton.addEventListener("click", function () {
            alert("Order Submitted Successfully!\nYou'll receive an SMS when ready.\nThank you!");
            localStorage.removeItem("cart");
            location.reload();
        });

        cartContainer.appendChild(checkoutButton);

        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", function () {
                const index = this.getAttribute("data-index");
                cart.splice(index, 1);
                localStorage.setItem("cart", JSON.stringify(cart));
                updateCartDisplay();
            });
        });
    }
});
