// Sample data for food items
const foodItems = [
    { name: "Burger - Kes 600", img: "https://i.pinimg.com/736x/eb/cb/c6/ebcbc6aaa9deca9d6efc1efc93b66945.jpg" },
    { name: "Pasta - Kes 750", img: "https://i.pinimg.com/736x/91/f4/75/91f475ea479986f068cc8a9fd7517bca.jpg" },
    { name: "Sushi - Kes 670", img: "https://i.pinimg.com/736x/ad/10/24/ad1024bec8ffd60319b5157195847ba5.jpg" },
    { name: "Tacos - Kes 2100", img: "https://i.pinimg.com/736x/db/c4/c0/dbc4c003d5674030efe2173d2b8dcbce.jpg" },
    { name: "Salad - Kes 350", img: "https://i.pinimg.com/736x/45/73/d9/4573d97e97a507d2eadbe34261ad0b62.jpg" }
];

// Display food items
function displayFoodItems(items = foodItems) {
    const foodContainer = document.getElementById('food-items');
    foodContainer.innerHTML = '';

    items.forEach(item => {
        const foodDiv = document.createElement('div');
        foodDiv.className = 'food-item';
        foodDiv.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <p>${item.name}</p>
            <button onclick="addToCart('${item.name}')">Add to Cart</button>
        `;
        foodContainer.appendChild(foodDiv);
    });
}

// Cart array
let cart = [];

// Add to cart function
function addToCart(itemName) {
    cart.push(itemName);
    alert(`${itemName} added to cart!`);
    updateCartUI();
}

// Update Cart UI
function updateCartUI() {
    const cartList = document.getElementById('cart-items');
    cartList.innerHTML = cart.map(item => `<li>${item}</li>`).join('');
}

// Filter menu
function filterMenu() {
    const searchInput = document.getElementById('search').value.toLowerCase();
    const filteredItems = foodItems.filter(item => item.name.toLowerCase().includes(searchInput));
    displayFoodItems(filteredItems);
}

// Order Now Function
function orderNow() {
    alert("Redirecting to order page...");
}

// Checkout Function
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
    } else {
        alert(`Checking out: ${cart.join(', ')}`);
    }
}

// Load items initially
displayFoodItems();
