// All food items (Shuffled on page load)
let foodItems = [
    { name: "Pizza Kes 10000", img: "https://i.pinimg.com/736x/1e/a7/fc/1ea7fca510708ed25f97b2ca63809d32.jpg" },
    { name: "Burger Kes 600", img: "https://i.pinimg.com/736x/eb/cb/c6/ebcbc6aaa9deca9d6efc1efc93b66945.jpg" },
    { name: "Pasta Kes 750", img: "https://i.pinimg.com/736x/91/f4/75/91f475ea479986f068cc8a9fd7517bca.jpg" },
    { name: "Sushi Kes 670", img: "https://i.pinimg.com/736x/ad/10/24/ad1024bec8ffd60319b5157195847ba5.jpg" },
    { name: "Salad Kes 350", img: "https://i.pinimg.com/736x/45/73/d9/4573d97e97a507d2eadbe34261ad0b62.jpg" },
    { name: "Tacos Kes 2100", img: "https://i.pinimg.com/736x/db/c4/c0/dbc4c003d5674030efe2173d2b8dcbce.jpg" },
    { name: "Steak Kes 950", img: "https://i.pinimg.com/736x/ad/88/aa/ad88aa0472018d614906eb5fd45d76db.jpg" },
    { name: "Ice Cream Kes 450", img: "https://i.pinimg.com/736x/c6/5b/60/c65b60705ee905052abf6eb5e143b005.jpg" }
];

// Shuffle images
function shuffleFoodItems() {
    foodItems.sort(() => Math.random() - 0.5);
}

// Display Food Items
function displayFoodItems() {
    shuffleFoodItems();
    const foodContainer = document.getElementById('food-items');
    foodContainer.innerHTML = '';

    foodItems.forEach(item => {
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

// Load menu on page load
displayFoodItems();
