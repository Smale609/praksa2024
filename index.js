import { fetchData, clearMain, renderInMain, setCurrentView, getUserCart, setUserCart } from "./helpers.js";
import { displayProduct } from "./product.js";


export function addToCart(product) {
    // PREPRAVI DA UZIMA SAMO ID, A DA SE DODAVANJE ODVIJA PREKO FETCH
    const userCart = getUserCart();
    // prepravi u orderToAdd i dodaj total umjesto renderovanja dinamicki
    const itemToAdd = {
                    "id": product.id,
                    "name": product.name,
                    "img_url": product.img_url,
                    "quantity": product.quantity,
                    "price": product.price
                };
    // OVO IZBACI I DODAJ SAMO MODIFIKACIJU QUANTITY
    if (userCart.findIndex(item => item.id === itemToAdd.id) === -1){
        userCart.push(itemToAdd);
        alert("Artikal dodan u korpu");
    } else {
        alert("vec imate to u korpi");
    }
    setUserCart(userCart);
}

// funkcija za prikazivanje elemenata na stranici
export async function displayProductList(){
    try{
        const products = await fetchData('products.json'); // ceka da funkcija pokupi i parsira podatke "sa backend-a"
        if (!products) {
            throw new Error('Something went wrong when parsing the response');
        }
        clearMain()
        const productsContainer = document.createElement('section');
        productsContainer.classList.add('products-container');
        products.data.items.forEach(product => {    // za svaki element koji je vracen kreiramo div element u kome se nalaze podaci tog artikla
            const productDiv = document.createElement('div');
            productDiv.classList.add('product-container');
            productDiv.addEventListener('click', () => {
                displayProduct(product.id); // prikazuje detaljnije o artiklu (kao GET /products/<productId>)
            });

            const productImg = document.createElement('div');
            productImg.classList.add('product__img');
            productImg.style.backgroundImage = `url(${product.img_url})`;

            // name
            const productName = document.createElement('h1');
            productName.innerText = `${product.name}`;
            productName.classList.add('product__header');
            //
            const productPrice = document.createElement('p');
            productPrice.innerText = `$${product.price}`;
            productPrice.classList.add('product__price');
            //
            productDiv.append(productImg, productName, productPrice); // ubacujemo podatke(h1,p,button elemente) u div koji nam drzi sve podatke za jedan artikal
            productsContainer.appendChild(productDiv); // novokreirani div dodajemo u container sa svim ostalim artiklima
        });
        renderInMain(productsContainer);
    } catch (error) {
        console.error("Error parsing response: ", error);
        return null;
    }
    
}