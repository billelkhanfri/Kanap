/**
 * stocker le paraméter et ça valeur dans une variable
 * stocker dans une variable et associer la méthod URLsearchparams avec le paramétre
 * stocker dans une variable le retour du paramétre requeter
 */

const keyId = window.location.search;
const urlParam = new URLSearchParams(keyId);
const param = urlParam.get('id');
/**
 * intégration des données de la page d'acueil en utilisant ECMA6 backtick
 * @param {*} el fullfill variables using API keys
 * @return {html} iterated html apopend section
 */
function productTemplate(el) {
    document.title = el.name;
    document.querySelector('.item__img').innerHTML += `<img src="${el.imageUrl}" alt="${el.altTxt}"> `
    document.querySelector('.item__content__titlePrice').innerHTML = ` <h1 id="title"><${el.name}</h1>
    <p>Prix : <span id="price">${el.price}</span>€</p>`
    document.querySelector('.item__content__description').innerHTML = `

     <p class="item__content__description__title">Description :</p>
     <p id="description">${el.description}</p>`

    for (color in el.colors) {
        document.querySelector('#colors').innerHTML += ` <option value="${color}"> ${el.colors[color]} </option > `
    }




}



function individualProduct() {
    fetch("http://localhost:3000/api/products/" + param)
        .then(function (response) {
            return response.json();
        })
        .then(data => {

            productTemplate(data);
        }
        )

}

individualProduct();