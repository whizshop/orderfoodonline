document.addEventListener("DOMContentLoaded", function () {
    const cartCount = document.getElementById("cart-count");
    const cartItemsList = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    const popup = document.getElementById("popup");
    const popupMessage = document.getElementById("popup-message");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    updateCartUI();

    // Add to Cart
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            const name = this.getAttribute("data-name");
            const price = parseFloat(this.getAttribute("data-price"));
            cart.push({ name, price });
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartUI();
            showPopup("✅ Item added to cart!");
        });
    });

    // Place Order
    if (document.getElementById("place-order")) {
        document.getElementById("place-order").addEventListener("click", function () {
            if (cart.length > 0) {
                showPopup("🎉 Order Submitted Successfully! You’ll receive an SMS when it’s ready. Thank you!");
                localStorage.removeItem("cart");
                setTimeout(() => {
                    window.location.href = "index.html";
                }, 2000);
            } else {
                showPopup("⚠️ Your cart is empty!");
            }
        });
    }

    // Clear Cart
    if (document.getElementById("clear-cart")) {
        document.getElementById("clear-cart").addEventListener("click", function () {
            cart = [];
            localStorage.removeItem("cart");
            updateCartUI();
            showPopup("🗑️ Cart has been cleared!");
        });
    }

    // Update Cart Count
    function updateCartCount() {
        cartCount.textContent = cart.length;
    }

    // Update Cart UI
    function updateCartUI() {
        if (cartItemsList) {
            cartItemsList.innerHTML = "";
            let total = 0;
            cart.forEach(item => {
                const li = document.createElement("li");
                li.textContent = `${item.name} - Ksh ${item.price}`;
                cartItemsList.appendChild(li);
                total += item.price;
            });
            totalPriceElement.textContent = total;
        }
        updateCartCount();
    }

    // Show Popup
    function showPopup(message) {
        popupMessage.textContent = message;
        popup.style.display = "block";
    }

    // Close Popup
    window.closePopup = function () {
        popup.style.display = "none";
    };
});
