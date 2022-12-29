//------funtion enables to calculate the sum of quantities and prices in cart page ------
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

function getAllElements() {

  fetch("http://localhost:3000/api/products")
    .then(function (response) {
      return response.json();
    })
    .then(resources => {
      for (const resource of resources) {
        itemTemplate(resource);
      }
    })
    .catch(error => {
      alert(" Erreur : " + error.message);
    })
}

getAllElements();

//*************************************************************************************

//------funtion enables to calculate the sum of quantities and prices in cart page ------
/**
 * inject HTML using ECMA6 backtick
 * @param {*} el fullfill variables using API keys
 * @return {html} loop over it
 */
//-----------------------------------------------------------------------------
async function itemTemplate(el, i) {
  items.innerHTML += ` <a href="./product.html?id=${el._id}">
              <article>
                  <img src="${el.imageUrl}" alt="${el.altTxt}">
                  <h3 class="productName">${el.name}</h3>
                    <p class="productDescription">${el.description}</p>
                    </article>
                </a> `;
}




