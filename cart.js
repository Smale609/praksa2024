import { clearMain, renderInMain, getUserCart, setCurrentView } from "./helpers.js";

export function remFromCart(item) {
    const userCart = getUserCart();
    const indexToRem = userCart.findIndex(cartItem => cartItem.id === item.id); // trazimo koji je indeks artikla koji korisnik zeli ukloniti
    userCart.splice(indexToRem, 1); // uklanjamo artikal iz korpe
    localStorage.setItem('userCart', JSON.stringify(userCart)); // modifikovanu korpu cuvamo u memoriju
    displayCart();  // ponovo renderujemo listu artikala u korpi da bi se promjena prikazala (refresh)
}

export function displayCart(){
    clearMain()
    const cartItems = document.createElement('section');
    cartItems.classList.add('cart-items--container');
    cartItems.innerHTML = '';  // brisemo ako bilo sta ima u container-u (kljucno za refresh)
    const userCart = getUserCart();
    userCart.forEach(item => {
        // container za artikal
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item--container');
        // slika
        const itemImg = document.createElement('div');
        itemImg.classList.add('item__img');
        itemImg.style.backgroundImage = `url(${item.img_url})`;
        // naziv
        const itemName = document.createElement('h1');
        itemName.innerText = `${item.name}`;
        itemName.classList.add('item__header');
        // ocjena
        const itemRating = document.createElement('p');
        itemRating.innerText = `${item.rating}`;
        itemRating.classList.add('item__rating');
        // cijena
        const itemPrice = document.createElement('p');
        itemPrice.innerText = `$${item.price}`;
        itemPrice.classList.add('item__price');
        // "ukloni" dugme
        const itemRemBtn = document.createElement('button');
        itemRemBtn.textContent = 'Ukloni';
        itemRemBtn.classList.add('cart-item__btn', 'btn');
        itemRemBtn.addEventListener('click', () => remFromCart(item));
        // dodavanje elemenata u container
        itemDiv.append(itemImg, itemName, itemRating, itemPrice, itemRemBtn);
        cartItems.appendChild(itemDiv);
    });
    renderInMain(cartItems);
};