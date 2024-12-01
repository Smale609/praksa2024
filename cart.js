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
        // decrbtn.addEventListener('click', (event) => {
        //     event.preventDefault()
        //     if(currentQuantityVal > 1){
        //         currentQuantityVal--;
        //         currentQuantity.innerText = `${currentQuantityVal}`;
        //     }
        // });
        const incrbtn = document.createElement('button');
        incrbtn.classList.add('cart-item__form__incr-btn');
        incrbtn.innerText = '+';
        // incrbtn.addEventListener('click', (event) => {
        //     event.preventDefault()
        //     if(currentQuantityVal < itemQuantity){
        //         currentQuantityVal++;
        //         currentQuantity.innerText = `${currentQuantityVal}`;
        //     }
        // });
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
        let itemQuantity = 1;
        console.log(itemQuantity);
        // cijena
        const itemPrice = document.createElement('p');
        itemPrice.innerText = `$${item.price}`;
        itemPrice.classList.add('item__price');
        // ukupno
        let itemTotal = document.createElement('p');
        itemTotal.innerText = `$${item.price * itemQuantity}`;
        itemTotal.classList.add('item__price');
        // "ukloni" dugme
        const itemRemBtn = document.createElement('button');
        itemRemBtn.textContent = 'Ukloni';
        itemRemBtn.classList.add('cart-item__btn', 'btn');
        itemRemBtn.addEventListener('click', () => remFromCart(item));
        // dodavanje elemenata u container
        itemDiv.append(itemImg, itemName, itemPrice, itemQuantityForm, itemTotal, itemRemBtn);
        // CART ITEM HANDLER
        itemDiv.addEventListener('click', (event) => {
            if (event.target.classList.contains('cart-item__form__incr-btn')){
                event.preventDefault()
                if(itemQuantity < item.quantity){
                    itemQuantity++;
                    itemQuantityForm.querySelector('.cart-item-form-quantity').innerText = `${itemQuantity}`;   //updateo prikaza kolicine
                    let total = (item.price * itemQuantity).toFixed(2); // zaokruzuje na 2 cifre
                    itemTotal.innerText = `$${total}`;
                }
            } else if (event.target.classList.contains('cart-item__form__decr-btn')){
                event.preventDefault()
                if(itemQuantity > 1){
                    itemQuantity--;
                    itemQuantityForm.querySelector('.cart-item-form-quantity').innerText = `${itemQuantity}`;
                    let total = (item.price * itemQuantity).toFixed(2);
                    itemTotal.innerText = `$${total}`;
                }
            } else if (event.target.classList.contains('cart-item__btn')){
                remFromCart(item)
            }
        });
        //
        cartItems.appendChild(itemDiv);
    });
    renderInMain(cartItems);
};