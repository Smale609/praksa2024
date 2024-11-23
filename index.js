// class Product{
//     #id;
//     #name;
//     #img_url;
//     #rating;
//     #price;

//     constructor(id, name, img_url, rating, price){
//         this.id = id;
//         this.name = name;
//         this.img_url = img_url;
//         this.rating = rating;
//         this.price = price;
//     }
//     getProductInfo(){
//         return{
//                 "id": this.#id,
//                 "name": this.#name,
//                 "img_url": this.#img_url,
//                 "rating": this.#rating,
//                 "price": this.#price
//             };
//     }
// }

/* ASYNC FUNKCIJE SE UVIJEK IZVRSAVAJU NAKON SYNC DIJELA KODA I ZATO 
   NIKAD NE SMIJEMO PRISTUPATI NJIHOVIM VRACENIM VRIJEDNOSTIMA JER CEMO UVIJEK DOBITI 'UNDEFINED' */

   async function fetchData(){
    try {
        const response = await fetch('products.json');  //ceka da se izvrsi fetch funkcija koja salje "HTTP zahtjev" i resolved Promise object se cuva u response
        if (!response.ok){
            throw new Error(`HTTP error Status: ${response.status}`);   // ako odgovor nije ok (status nije [200 ... 299])
        }
        const jsonData = await response.json(); // ceka se da se odgovor parsira u JSON format i cuva se u jsonData
        return jsonData;    // nakon parsiranja vracamo podatke 
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}

// AKO ZATREBA OCISCTITI USERCART
function clearUserCart() {
    userCart.forEach(element => {
        userCart.pop();
    });
};

function addToCart(userCart, product) {
    const itemToAdd = {
                    "id": product.id,
                    "name": product.name,
                    "img_url": product.img_url,
                    "rating": product.rating,
                    "quantity": product.quantity,
                    "price": product.price
                };
    if (userCart.findIndex(item => item.id === itemToAdd.id) === -1){
        userCart.push(itemToAdd);
    } else {
        alert("vec imate to u korpi");
    }
    localStorage.setItem('userCart', JSON.stringify(userCart));
}

let userCart;
console.log(userCart);

// funkcija za prikazivanje elemenata na stranici
async function displayProducts(){
    try{
        const products = await fetchData(); // ceka da funkcija pokupi i parsira podatke "sa backend-a"
        if (!products) {
            throw new Error('Something went wrong when parsing the response');
        }
        productsContainer = document.querySelector('.products-container')
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
            productAddBtn.addEventListener('click', () => addToCart(userCart, product));
            productDiv.append(productImg, productName, productRating, productPrice, productAddBtn); // ubacujemo podatke(h1,p,button elemente) u div koji nam drzi sve podatke za jedan artikal
            productsContainer.appendChild(productDiv); // novokreirani div dodajemo u container sa svim ostalim artiklima
        });
    } catch (error) {
        console.error("Error parsing response: ", error);
        return null;
    }
    
}

document.addEventListener('DOMContentLoaded', () => {
    userCart = JSON.parse(localStorage.getItem('userCart')) || '[]';    // kada se ucitaju elementi u DOM-u prebacimo vec sacuvanu korpu u memoriju (da bi je mogli koristiti za dodavanje novih artikala)
    displayProducts();  // renderujemo artikle
});