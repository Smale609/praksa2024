import { clearMain, renderInMain, getUserCart, setCurrentView } from "./helpers.js";

export function remFromCart(item) {
    const userCart = getUserCart();
    const indexToRem = userCart.findIndex(cartItem => cartItem.id === item.id); // trazimo koji je indeks artikla koji korisnik zeli ukloniti
    userCart.splice(indexToRem, 1); // uklanjamo artikal iz korpe
    localStorage.setItem('userCart', JSON.stringify(userCart)); // modifikovanu korpu cuvamo u memoriju
    displayCart();  // ponovo renderujemo listu artikala u korpi da bi se promjena prikazala (refresh)
}

function createQuantityForm(itemQuantity){
    try{
        if(itemQuantity === 0){
            throw(Error('Item quantity value incorrect'));
        } 
        const form = document.createElement('form');
        let currentQuantityVal = 1;
        const currentQuantity = document.createElement('p');
        currentQuantity.classList.add('cart-item-form-quantity');
        currentQuantity.innerText = `${currentQuantityVal}`
        const decrbtn = document.createElement('button');
        decrbtn.classList.add('cart-item__form__decr-btn');
        decrbtn.innerText = '-';
        decrbtn.addEventListener('click', (event) => {
            event.preventDefault()
            if(currentQuantityVal > 1){
                currentQuantityVal--;
                currentQuantity.innerText = `${currentQuantityVal}`;
            }
        });
        const incrbtn = document.createElement('button');
        incrbtn.classList.add('cart-item__form__incr-btn');
        incrbtn.innerText = '+';
        incrbtn.addEventListener('click', (event) => {
            event.preventDefault()
            if(currentQuantityVal < itemQuantity){
                currentQuantityVal++;
                currentQuantity.innerText = `${currentQuantityVal}`;
            }
        });
        form.append(decrbtn, currentQuantity, incrbtn);
        return form;
    } catch(error){
        console.log(`${error} sranje`)
    }  
}

function createCartHeadings(){
    // dodajemo zaglavlja grida (slicno table header elementima)
    const gridHeaderValName = document.createElement('h2');
    gridHeaderValName.classList.add('grid-header-product-name');
    gridHeaderValName.innerText = 'Artikal';
    const gridHeaderValPrice = document.createElement('h2');
    gridHeaderValPrice.classList.add('grid-header-product-price');
    gridHeaderValPrice.innerText = 'Cijena';
    const gridHeaderValQuantity = document.createElement('h2');
    gridHeaderValQuantity.classList.add('grid-header-product-quantity');
    gridHeaderValQuantity.innerText = 'Kolicina';
    const gridHeaderValTotal = document.createElement('h2');
    gridHeaderValTotal.classList.add('grid-header-product-total');
    gridHeaderValTotal.innerText = 'Ukupno';
    return [gridHeaderValName, gridHeaderValPrice, gridHeaderValQuantity, gridHeaderValTotal];
}

export function displayCart(){
    document.querySelector('.header__cart-container').classList.add('hidden');
    clearMain()
    const cartItems = document.createElement('section');
    cartItems.classList.add('cart-items--container');
    cartItems.innerHTML = '';  // brisemo ako bilo sta ima u container-u (kljucno za refresh)
    const cartHeading = document.createElement('h1');
    cartHeading.classList.add('cart-header');
    cartHeading.innerText = 'Vasa korpa';

    createCartHeadings().forEach(element => {
        cartItems.append(element);
    });

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
        // kolicina
        const itemQuantityForm = createQuantityForm(item.quantity);
        itemQuantityForm.classList.add('cart-item-form');
        let itemQuantity = itemQuantityForm.querySelector('.cart-item-form-quantity').innerText;
        console.log(itemQuantity);
        // cijena
        const itemPrice = document.createElement('p');
        itemPrice.innerText = `$${item.price}`;
        itemPrice.classList.add('item__price');
        // ukupno
        const itemTotal = document.createElement('p');
        itemPrice.innerText = `$${item.price}`;
        itemPrice.classList.add('item__price');
        // "ukloni" dugme
        const itemRemBtn = document.createElement('button');
        itemRemBtn.textContent = 'Ukloni';
        itemRemBtn.classList.add('cart-item__btn', 'btn');
        itemRemBtn.addEventListener('click', () => remFromCart(item));
        // dodavanje elemenata u container
        itemDiv.append(itemImg, itemName, itemPrice, itemQuantityForm, itemTotal, itemRemBtn);
        cartItems.appendChild(itemDiv);
    });
    renderInMain(cartItems);
};