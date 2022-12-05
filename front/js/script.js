
/*intégration des données de la page d'acueil en utilisant ECMA6 backtick et la boucle maps

fetch("http://localhost:3000/api/products")
  .then(function (response) {
    return response.json()
  })
  .then(resources => {

    resources.map((el, i) => {
      items.innerHTML += ` <a href="./product.html?id=${el._id}">
              <article>
                  <img src="${el.imageUrl}" alt="${el.altTxt}">
                  <h3 class="productName">${el.name}</h3>
                    <p class="productDescription">${el.description}</p>
                    </article>
                </a> `
    })
  }
  )*/



/**
 * intégration des données de la page d'acueil en utilisant ECMA6 backtick
 * @param {*} el fullfill variables using API keys
 * @return {html} iterated html apopend section
 */
async function itemTemplate(el) {
  items.innerHTML += ` <a href="./product.html?id=${el._id}">
              <article>
                  <img src="${el.imageUrl}" alt="${el.altTxt}">
                  <h3 class="productName">${el.name}</h3>
                    <p class="productDescription">${el.description}</p>
                    </article>
                </a> `;
}
/**
 * requeter l'Api
 * obtenir des donneés json
 * itérer les données récuperer avec un boucle for of
 * @param {Response}  response 1st promise
 * @return {*} json data
 * @param {Response}  resources 2nd promise
 * @return {Array} display all data
 */

function getAllElements() {

  fetch("http://localhost:3000/api/products")
    .then(function (response) {
      return response.json()
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



function getAllElements() {

  fetch("http://localhost:3000/api/products")
    .then(function (response) {
      return response.json()
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

getAllElements();* /

