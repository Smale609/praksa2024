import { fetchData, clearMain, renderInMain, setCurrentView } from "./helpers.js";

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

        const productContainer = document.createElement('article');
        const productName = document.createElement('h1');
        productName.innerText = `${productPayload.data.name}`;
        productName.classList.add('product__header');
        productContainer.appendChild(productName);
        renderInMain(productContainer);
    }
    
};