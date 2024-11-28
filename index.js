import { fetchData, clearMain, renderInMain, addToCart } from "./helpers.js";

// funkcija za prikazivanje elemenata na stranici
export async function displayProducts(){
    try{
        const products = await fetchData(); // ceka da funkcija pokupi i parsira podatke "sa backend-a"
        if (!products) {
            throw new Error('Something went wrong when parsing the response');
        }
        clearMain()
        const productsContainer = document.createElement('section');
        productsContainer.classList.add('products-container');
        products.data.items.forEach(product => {    // za svaki element koji je vracen kreiramo div element u kome se nalaze podaci tog artikla
            const productDiv = document.createElement('div');
            productDiv.classList.add('product-container');

            const productImg = document.createElement('div');
            productImg.classList.add('product__img');
            productImg.style.backgroundImage = `url(${product.img_url})`;

            // name
            const productName = document.createElement('h1');
            productName.innerText = `${product.name}`;
            productName.classList.add('product__header');
            //
            const productRating = document.createElement('p');
            productRating.innerText = `${product.rating}`;
            productRating.classList.add('product__rating');
            //
            const productPrice = document.createElement('p');
            productPrice.innerText = `$${product.price}`;
            productPrice.classList.add('product__price');
            //
            const productAddBtn = document.createElement('button'); // dodajemo dugme koje nam sluzi da dodamo taj artikal u korpu
            productAddBtn.textContent = 'Dodaj u korpu';
            productAddBtn.classList.add('product__btn', 'btn');
            productAddBtn.setAttribute('id', product.id);
            productAddBtn.addEventListener('click', () => addToCart(product));
            productDiv.append(productImg, productName, productRating, productPrice, productAddBtn); // ubacujemo podatke(h1,p,button elemente) u div koji nam drzi sve podatke za jedan artikal
            productsContainer.appendChild(productDiv); // novokreirani div dodajemo u container sa svim ostalim artiklima
        });
        renderInMain(productsContainer);
    } catch (error) {
        console.error("Error parsing response: ", error);
        return null;
    }
    
}