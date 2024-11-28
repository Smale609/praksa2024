import { fetchData, clearMain, renderInMain, setCurrentView } from "./helpers.js";
import { addToCart } from "./index.js";

// funkcija sluzi da renderujemo podatke o posebnom artiklu (GET /products/id)
export async function displayProduct(productId) {
    let productInSession;
    let productPayload;
    // kada uradimo refresh stranice, id artikla se gubi tako da ga moramo sacuvati u sesiju (u pravoj aplikaciji bi ga cuvali u URL)
    if (!productId){
        productInSession = sessionStorage.getItem('product_id');
        productPayload = await fetchData(`product${productInSession}.json`);
    } else {
        productPayload = await fetchData(`product${productId}.json`);
        sessionStorage.setItem('product_id', productId);
    }
    if (productPayload){
        setCurrentView('product');
        clearMain();
        // roditeljski element
        const productPage = document.createElement('section');
        // container samo za informacije o artiklu
        const productContainer = document.createElement('article');

        // slika
        const productImg = document.createElement('div');
        productImg.classList.add('product__img');
        productImg.style.backgroundImage = `url(${productPayload.data.img_url})`;
        
        // ime
        const productName = document.createElement('h1');
        productName.innerText = `${productPayload.data.name}`;
        productName.classList.add('product__header');

        // cijena
        const productPrice = document.createElement('p');
        productPrice.innerText = `$${productPayload.data.price}`;
        productPrice.classList.add('product__price');

        // opis
        const productDescription = document.createElement('div');   //roditelj
        productDescription.classList.add('product__description');
        const DescriptionLabel = document.createElement('h2');  // naslov
        DescriptionLabel.classList.add('product__description-label');
        DescriptionLabel.innerText = 'Opis';
        const DescriptionText = document.createElement('p');    // sadrzaj
        DescriptionText.classList.add('product__description-text');
        DescriptionText.innerText = `${productPayload.data.description}`;
        productDescription.append(DescriptionLabel, DescriptionText);

        // ocjena
        const productRating = document.createElement('div');
        productRating.classList.add('product__rating');
        const ratingLabel = document.createElement('p');
        ratingLabel.classList.add('product__rating-label');
        ratingLabel.innerText = 'Ocjena:';
        const ratingData = document.createElement('p');
        ratingData.classList.add('product__rating-data');
        ratingData.innerText = `${productPayload.data.rating}`;
        productRating.append(ratingLabel, ratingData);

        // kolicina
        const productQuantity = document.createElement('div');
        productQuantity.classList.add('product__quantity');
        const quantityLabel = document.createElement('p');
        quantityLabel.classList.add('product__quantity-label');
        quantityLabel.innerText = 'Preostalo:';
        const quantityData = document.createElement('p');
        quantityData.classList.add('product__quantity-data');
        quantityData.innerText = `${productPayload.data.quantity}`;
        productQuantity.append(quantityLabel, quantityData);

        // vrijeme objave
        const productTimePublished = document.createElement('div');
        productTimePublished.classList.add('product__time');
        const publishedLabel = document.createElement('p');
        publishedLabel.classList.add('product__time-label');
        publishedLabel.innerText = 'Vrijeme objave:';
        const publishedData = document.createElement('p');
        publishedData.classList.add('product__time-data');
        publishedData.innerText = `${productPayload.data.time_published}`;
        productTimePublished.append(publishedLabel, publishedData);

        // lokacija
        const productLocation = document.createElement('div');
        productLocation.classList.add('product__location');
        const locationLabel = document.createElement('p');
        locationLabel.classList.add('product__location-label');
        locationLabel.innerText = 'Lokacija:';
        const locationData = document.createElement('p');
        locationData.classList.add('product__location-data');
        locationData.innerText = `${productPayload.data.location}`;
        productLocation.append(locationLabel, locationData);


        // dodavanje u korpu
        const productAddBtn = document.createElement('button'); // dodajemo dugme koje nam sluzi da dodamo taj artikal u korpu
        productAddBtn.textContent = 'Dodaj u korpu';
        productAddBtn.classList.add('product__btn', 'btn');
        productAddBtn.addEventListener('click', (event) => {
            // PRIVREMENO DOK SE NE URADI FETCH DODAVANJE
            const product = {
                "id": productPayload.data.id,
                "name": productPayload.data.name,
                "img_url": productPayload.data.img_url,
                "rating": productPayload.data.rating,
                "quantity": productPayload.data.quantity,
                "price": productPayload.data.price
            };
            addToCart(product);
        });

        productContainer.append(productImg, productName, productPrice, productDescription, productRating, productQuantity, productTimePublished, productLocation, productAddBtn)

        // informacije o prodavcu
        const sellerContainer = document.createElement('section');
        sellerContainer.classList.add('product__seller-container');
        const sellerLabel = document.createElement('h2');
        sellerLabel.classList.add('seller-label');
        sellerLabel.innerText = 'Prodavac:';
        const sellerName = document.createElement('p');
        sellerName.classList.add('seller-name');
        sellerName.innerText = `${productPayload.data.seller_info.name}`;
        const sellerRating = document.createElement('p');
        sellerRating.classList.add('seller-rating');
        sellerRating.innerText = `${productPayload.data.seller_info.rating}`;
        sellerContainer.append(sellerLabel, sellerName, sellerRating);

        productPage.append(productContainer, sellerContainer);
        console.log(productPage)
        //console.log(productImg, productName, productPrice, productDescription, productRating, productQuantity, productTimePublished, productLocation, sellerContainer)
        renderInMain(productPage);
    }
    
};