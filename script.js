document.addEventListener("DOMContentLoaded", function () {
    const cartCount = document.getElementById("cart-count");
    const cartItemsList = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    const popup = document.getElementById("popup");
    const popupMessage = document.getElementById("popup-message");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    updateCartUI();

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            const name = this.getAttribute("data-name");
            const price = parseFloat(this.getAttribute("data-price"));
            cart.push({ name, price });
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartUI();
            showPopup("✅ Added to Cart!");
        });
    });

    if (document.getElementById("place-order")) {
        document.getElementById("place-order").addEventListener("click", function () {
            if (cart.length > 0) {
                showPopup("🎉 Order Placed! You'll receive an SMS when it's ready.");
                localStorage.removeItem("cart");
                setTimeout(() => { window.location.href = "index.html"; }, 2000);
            } else {
                showPopup("⚠️ Your cart is empty!");
            }
        });
    }

    function updateCartUI() {
        cartCount.textContent = cart.length;
    }

    function showPopup(message) {
        popupMessage.textContent = message;
        popup.style.display = "block";
    }

    window.closePopup = function () {
        popup.style.display = "none";
    };
});
