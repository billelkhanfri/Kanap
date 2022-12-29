/**
 * stocker parameter( id) of each product
 * sstck and accociate the parameter with l URLsearchparams method
 * stocker returned value of the method in a variable which will concatenate with the main URL of all products
 */

const keyId = window.location.search;
const urlParam = new URLSearchParams(keyId);
const param = urlParam.get('id');
//*************************************************************************************

//------funtion enables gather data from API ------
/**
 * fetch  the Api
 * get first promise and turn it to JSON format
 * get the seconde promise and loop over it
 * @param {Response}  response 1st promise
 * @return {*} json data
 * @param {Response}  resources 2nd promise
 * @return {Array} display all data
 */
//-----------------------------------------------------------------------------

function individualProduct() {
    fetch("http://localhost:3000/api/products/" + param)
        .then(function (response) {
            return response.json();
        })
        .then(data => {

            productTemplate(data);

        })
        .catch(error => {
            alert(" Erreur : " + error.message);
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

    //*************************************************************************************

    //------funtion enables to stock customer selection in the localStorage ------
    /**
     * add events to : button, color option and quantity input
     * add preventDefault to deny all odd behaviours( see conditions)
     * create an object which contains id, color and quantity
     * store data on localstorage : key : id + color , value : id, color, quantity
     */

    //-----------------------------------------------------------------------------

    function setToLocalStr() {

        colors.addEventListener('change', function () {
            if (colors.value !== colors.options[colors.selectedIndex].text) {
                addToCart.style.opacity = "1";
            }
        }),

            quantity.addEventListener('change', function () {
                if (quantity.value !== 0) {
                    addToCart.style.opacity = "1";
                }

            }),

            addToCart.addEventListener('click', function (event) {
                let cartData = {
                    id: param,
                    colours: String(colors.value),
                    quantities: Number(quantity.value),
                };
                let products = cartData.id + cartData.colours;

                if (
                    colors.value === "" ||
                    quantity.value < 1 ||
                    quantity.value > 100) {
                    event.preventDefault();
                    addToCart.style.opacity = "0.4";
                }
                else if (localStorage.getItem(products)) {

                    let updatedQtn = JSON.parse(localStorage.getItem(products)).quantities + cartData.quantities
                    let newCartData = {
                        id: param,
                        colours: String(colors.value),
                        quantities: Number(updatedQtn),

                    };

                    window.localStorage.setItem(products, JSON.stringify(newCartData));
                    alert('quantité modifiée')

                }

                else {

                    window.localStorage.setItem(products, JSON.stringify(cartData));
                    alert('Produit Ajouté')

                }


            })

    }
    setToLocalStr();
}
individualProduct();


