
//-----------------------------------------------------------------------
// funtion enables to create items in cart
/**
 * create an empty array which is going to contain all objects
 * create a loop inside  over the local storage in order to push all new products (objects) in the  cart array
 * transorm the data from string to objects using JSON.parse
 * fetch missed value of stored products by calling the needed ones which exsiste in the localstorage 
 * using backticks, the values gathered  from API and localStorage are filled in cart__items section
 */
//-----------------------------------------------------------------------

function cartTemplate() {

  let cart = []
  for (let i = 0; i < localStorage.length; i++) {
    let productParse = JSON.parse(window.localStorage.getItem(localStorage.key(i)))

    cart.push(productParse);

    fetch('http://localhost:3000/api/products/' + productParse.id)

      .then(function (response) {
        return response.json()
      })
      .then(carts => {
        cart__items.innerHTML += ` <article class="cart__item" data-id= "${productParse.id}" data-color= "${productParse.colours}">
                <div class="cart__item__img">
                  <img src="${carts.imageUrl}" alt="${carts.altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${carts.name}</h2>
                    <p>${productParse.colours}</p>
                    <p>${carts.price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté :</p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${productParse.quantities} data-id= "${productParse.id}" data-color= "${productParse.colours}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem" >Supprimer</p>
                  
                    </div>
                  </div>
                </div>
              </article> `


        //-----------------------------------------------------------------------
        // funtion enables to delete items from cart
        /**
         * get the wanted element "supprimer"
         * change th HTMLCollection to Array then loop over it
         * add event Listener click to remove both local storage key and DOM html of the clicked item
         */
        //-----------------------------------------------------------------------

        function deleteItems() {
          let supprime = document.getElementsByClassName('deleteItem');
          Array.from(supprime).forEach(function (deleteButton) {

            deleteButton.addEventListener("click", function (e) {

              deleteButton.closest('article').remove()
              window.localStorage.removeItem(localStorage.key(i))

            })

          })

        }

        deleteItems()
        //-----------------------------------------------------------------------
        // funtion enables to change quantity of items  cart
        /**
         * get the element we want to modify "itemquantity"
         * change the HTMLCollection to Array then loop over it
         * add event Listener change to catch the value entered by the user
         * loop over items in cart array already parsed in local storage
         * using dataset, we target the item with teh new quantity value
         * stringify the new local storage values 
         */
        //-----------------------------------------------------------------------

        function changeQuantity() {
          let qtn = document.querySelectorAll('.itemQuantity')

          Array.from(qtn).forEach(function (modifyQtn) {
            modifyQtn.addEventListener("change", function (e) {

              for (item of cart) {

                let g = e.target.dataset.id + e.target.dataset.color

                let newCartData = {
                  id: e.target.dataset.id,
                  colours: String(e.target.dataset.color),
                  quantities: Number(e.target.value)

                };

                window.localStorage.setItem(g, JSON.stringify(newCartData));

              }

            })

          })

        }

        changeQuantity()

      })


      .catch(error => {
        alert(" Erreur : " + error.message);
      })
      ;

  }

}
cartTemplate();







