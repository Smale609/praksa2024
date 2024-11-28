/* ASYNC FUNKCIJE SE UVIJEK IZVRSAVAJU NAKON SYNC DIJELA KODA I ZATO 
   NIKAD NE SMIJEMO PRISTUPATI NJIHOVIM VRACENIM VRIJEDNOSTIMA JER CEMO UVIJEK DOBITI 'UNDEFINED' */

   export async function fetchData(source){
    try {
        const response = await fetch(`${source}`);  //ceka da se izvrsi fetch funkcija koja salje "HTTP zahtjev" i resolved Promise object se cuva u response
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
export function clearUserCart() {
    userCart.forEach(element => {
        userCart.pop();
    });
}

export function clearMain() {
    const mainContainer = document.querySelector('main');
    mainContainer.innerHTML = '';
}

export function renderInMain(content) {
    const mainContainer = document.querySelector('main');
    mainContainer.appendChild(content);
}

export function getUserCart() {
    const userCart = JSON.parse(localStorage.getItem('userCart')) || [];
    return userCart;
}

export function setUserCart(newCart) {
    localStorage.setItem('userCart', JSON.stringify(newCart));
}

export function initSession(){
    if (!getCurrentView()){
        sessionStorage.setItem('currentView', 'index');
    }
}

export function setCurrentView(view) {
    if (!view){
        sessionStorage.setItem('currentView', 'index');
    } else {
        sessionStorage.setItem('currentView', String(view));
    }
}

export function getCurrentView() {
    return sessionStorage.getItem('currentView');
}