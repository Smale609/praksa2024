import { displayCart } from "./cart.js";
import { getCurrentView, initSession, setCurrentView } from "./helpers.js";
import { displayProducts } from "./index.js";


initSession();
// let userCart = getUserCart()

const cartBtn = document.querySelector('.cart-btn');
cartBtn.addEventListener('click', (event) => {
    event.preventDefault();
    setCurrentView('cart');
    displayCart();
});

const homeBtn = document.querySelector('.home-btn');
homeBtn.addEventListener('click', () => {
    setCurrentView('index');
});

document.addEventListener('DOMContentLoaded', () => {
    const currentView = getCurrentView();
    console.log(currentView);
    if (currentView === 'index'){
        displayProducts();
    } else if (currentView === 'cart') {
        displayCart();
    }
});