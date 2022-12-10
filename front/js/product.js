/**
 * stocker le paraméter et ça valeur dans une variable
 * stocker dans une variable et associer la méthod URLsearchparams avec le paramétre
 * stocker dans une variable le retour du paramétre requeter
 */

const keyId = window.location.search;
const urlParam = new URLSearchParams(keyId);
const param = urlParam.get('id');
/**
 * requeter l'Api
 * obtenir des donneés json
 * itérer les données récuperer avec un boucle for of
 * @param {Response}  response 1st promise
 * @return {*} json data
 * @param {Response}  data 2nd promise
 * @return {Array} display individual product data
 * intégration des données de la page d'acueil en utilisant ECMA6 backtick
 *  @param {*} el fullfill variables using API keys
 * @return {html} iterated html apopend section
 */
function individualProduct() {
    fetch("http://localhost:3000/api/products/" + param)
        .then(function (response) {
            return response.json();
        })
        .then(data => {

            productTemplate(data);

        })

    function productTemplate(el, i) {
        document.title = el.name;
        document.querySelector('.item__img').innerHTML += `<img src="${el.imageUrl}" alt="${el.altTxt}"> `
        document.querySelector('.item__content__titlePrice').innerHTML = ` <h1 id="title"><${el.name}</h1>
    <p>Prix : <span id="price">${el.price}</span>€</p>`
        document.querySelector('.item__content__description').innerHTML = `
     <p class="item__content__description__title">Description :</p>
     <p id="description">${el.description}</p>`
        el.colors.forEach((color) => {
            document.querySelector('#colors').innerHTML += ` <option value="${color} "> ${color}</option > `
        });
    }
    /**
     * add events to button, color option and quantity input
     * create an array which contains id, color and quantity
     * store data on localstorage 
     */
    /**
     * 
     */
    function setToLocalStr() {
        console.log(colors.options[colors.selectedIndex].text)
        colors.addEventListener('click', function () {
            if (colors.value != colors.options[colors.selectedIndex].text) {
                addToCart.style.opacity = "1";
            }
        }),

            quantity.addEventListener('click', function (event) {
                if (quantity.value != "0") {
                    addToCart.style.opacity = "1";
                }
            }),

            addToCart.addEventListener('click', function (event) {

                if (quantity.value === "0" || colors.value == false) {
                    event.preventDefault();
                    addToCart.style.opacity = "0.4";
                }

                else {
                    let cartData = {
                        keyId,
                        colours: colors.value,
                        quantities: quantity.value,
                    };
                    localStorage.setItem("product", JSON.stringify(cartData));
                    addToCart.style.opacity = "1";


                }
            })

    };
    setToLocalStr();
}

individualProduct();


localStorage.clear()








