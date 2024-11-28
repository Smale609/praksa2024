import { displayCart } from "./cart.js";
import { getCurrentView, initSession, setCurrentView } from "./helpers.js";
import { displayProductList } from "./index.js";
import { displayProduct } from "./product.js";


initSession();
// let userCart = getUserCart()

// Kada god izadjemo iz displayProduct view moramo izbrisacemo artikal koji smo prethodno pregledali
const cartBtn = document.querySelector('.cart-btn');
cartBtn.addEventListener('click', (event) => {
    event.preventDefault();
    sessionStorage.setItem('product_id', '');
    setCurrentView('cart');
    displayCart();
});

const cartLink = document.querySelector('.cart-link');
cartLink.addEventListener('click', (event) => {
    event.preventDefault();
    sessionStorage.setItem('product_id', '');
    setCurrentView('cart');
    displayCart();
});

const homeBtn = document.querySelector('.home-btn');
homeBtn.addEventListener('click', () => {
    sessionStorage.setItem('product_id', '');
    setCurrentView('index');
});


document.addEventListener('DOMContentLoaded', () => {
    const currentView = getCurrentView();
    console.log(currentView);
    if (currentView === 'index'){
        displayProductList();
    } else if (currentView === 'cart') {
        displayCart();
    } else if (currentView === 'product') {
        displayProduct();
    }
});