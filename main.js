import { displayCart } from "./cart.js";
import { getUserCart } from "./helpers.js";
import { displayProducts } from "./index.js";

let userCart = getUserCart()

const cartBtn = document.querySelector('.cart-btn');
cartBtn.addEventListener('click', (event) => {
    event.preventDefault();
    displayCart();
});

document.addEventListener('DOMContentLoaded', () => {
    displayProducts();  // renderujemo artikle
});