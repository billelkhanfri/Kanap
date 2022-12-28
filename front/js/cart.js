//--------------funtion enables to create items in cart--------------
/**
 * create an empty array which is going to contain all objects
 * create a loop iover the local storage in order to push all new products (objects) into cart array
 * transform the data from string to objects using JSON.parse
 * loop over the array and the fetch of the missed value of stored products by calling the needed ones which already exsiste in the localstorage 
 */
//----------------------------------------------------------------------

let cart = []

for (let i = 0; i < localStorage.length; i++) {
  let productParse = JSON.parse(window.localStorage.getItem(localStorage.key(i)))
  cart.push(productParse);

}

cart.map(
  element => {

    fetch('http://localhost:3000/api/products/' + element.id)

      .then(function (response) {
        return response.json()
      })

      .then(api => {

        cartTemplate(api, element)
        articlesSum(api, element)

        modifQuantité(api, element)

        deleteItems(api, element)



      })
      .catch(error => {
        alert(" Erreur : " + error.message);
      })
      ;

  })

//--------------funtion enables to display items in cart--------------
/**
* using backticks, the values gathered  from API and localStorage are filled in cart__items section
*/
//----------------------------------------------------------------------

function cartTemplate(api, element) {

  cart__items.innerHTML += ` <article class="cart__item" data-id = "${element.id}" data-color= "${element.colours}" data-quantité ="${element.quantities}" data-prix="${api.price}" >
                <div class="cart__item__img">
                  <img src="${api.imageUrl}" alt="${api.altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${api.name}</h2>
                    <p>${element.colours}</p>
                    <p data-prix="${api.price}"> ${api.price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté :</p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${element.quantities} data-id= "${element.id}" data-color= "${element.colours}" data-quantité ="${element.quantities}" data-prix="${api.price}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem" >Supprimer</p>

                    </div>
                  </div>
                </div>
              </article> `

}


//------funtion enables to calculate the sum of quantities in cart page ------
/**
 * get the element we want to modify "itemquantity"
 * change the HTMLCollection to Array then loop over it
 * add sum of quantities to quantity id textcontent
 *
 */
//--------------------------------------------------------------------------


function articlesSum() {
  let totalPrix = 0;
  let totalQtn = 0;

  const art = document.querySelectorAll(".cart__item");

  art.forEach((art) => {

    totalQtn += JSON.parse(art.dataset.quantité);
    totalPrix += JSON.parse(art.dataset.quantité) * art.dataset.prix;

  })
  document.getElementById('totalQuantity').textContent = totalQtn;
  document.getElementById('totalPrice').textContent = totalPrix;
}



//--------------funtion enables to delete items from cart---------------
/**
 * get the wanted element "supprimer"
 * change th HTMLCollection to Array then loop over it
 * add event Listener click to remove both local storage key and DOM html of the clicked item
 */
//-----------------------------------------------------------------------

function deleteItems(api, element) {
  let supprime = document.getElementsByClassName('deleteItem');

  Array.from(supprime).forEach(function (deleteButton) {

    deleteButton.addEventListener("click", function () {

      deleteButton.closest('article').remove()
      window.localStorage.removeItem(element.id + element.colours)

      articlesSum(api, element);

    })

  })
}

//-----------funtion enables to change quantity of items  cart-----------

/**
* get the element we want to modify "itemquantity"
* change the HTMLCollection to Array then loop over it
* add event Listener change to catch the value entered by the user
* using dataset, we target the item with teh new quantity value
* stringify the new local storage values
*/
//-----------------------------------------------------------------------
function modifQuantité(api, element) {
  let qtn = document.querySelectorAll('.itemQuantity')

  Array.from(qtn).forEach(function (modifyQtn) {


    modifyQtn.addEventListener("change", function (e) {

      let keys = e.target.dataset.id + e.target.dataset.color

      let cartData = {
        id: e.target.dataset.id,
        colours: String(e.target.dataset.color),
        quantities: Number(e.target.value)
      };
      window.localStorage.setItem(keys, JSON.stringify(cartData));

      let qtn = document.querySelectorAll('.itemQuantity')
      let totalQtn = 0;

      Array.from(qtn).forEach(function (modifyQtn) {

        totalQtn += Number(modifyQtn.value);
      })
      document.getElementById('totalQuantity').textContent = totalQtn;


    })


  })

}







//------Form ------
/**
*
*
*/
//--------------------------------------------------------------------------






