let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {
    let item = cart.find(i => i.name === name);
    if (item) {
        item.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(name + " added to cart!");
}

// Load Cart
function loadCart() {
    let cartTable = document.getElementById("cart-body");
    let cartTotal = document.getElementById("cart-total");
    cartTable.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>${item.quantity}</td>
            <td>${item.price * item.quantity}</td>
            <td><button onclick="removeItem(${index})">Remove</button></td>
        `;
        cartTable.appendChild(row);
        total += item.price * item.quantity;
    });

    cartTotal.innerText = total;
}

// Remove Item
function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

// Checkout & Generate Ticket
function checkout() {
    let paymentRef = document.getElementById("payment-ref").value;
    if (!paymentRef) {
        alert("Please enter a payment reference.");
        return;
    }

    let ticketDetails = `
        Order Time: ${new Date().toLocaleString()}<br>
        Items Ordered:<br>
        ${cart.map(i => `${i.quantity} x ${i.name} (Ksh ${i.price})`).join("<br>")}
        <br>Total: Ksh ${document.getElementById("cart-total").innerText}
        <br>Payment Ref: ${paymentRef}
    `;

    document.getElementById("ticket-details").innerHTML = ticketDetails;
    document.getElementById("ticket").style.display = "block";
    localStorage.removeItem("cart");
    cart = [];
   
