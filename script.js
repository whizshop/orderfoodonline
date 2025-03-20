function addToCart(name, price, image) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ name, price, image });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(name + " added to cart!");
}

function updateCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartContainer = document.getElementById("cart-list");
    cartContainer.innerHTML = "";

    cart.forEach((item, index) => {
        let cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>Ksh ${item.price}</p>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        
        cartContainer.appendChild(cartItem);
    });

    document.getElementById("total-price").innerText = "Total: Ksh " + cart.reduce((sum, item) => sum + item.price, 0);
}

function placeOrder() {
    document.getElementById("order-popup").style.display = "flex";
    localStorage.removeItem("cart");
    updateCart();
}

function closePopup() {
    document.getElementById("order-popup").style.display = "none";
}

document.addEventListener("DOMContentLoaded", updateCart);
