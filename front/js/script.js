
// intégration des données de la page d'acueil en utilisant ECMA6 backtick et la boucle maps
fetch("http://localhost:3000/api/products")
  .then(function (response) {
    return response.json()
  })
  .then(resources => {
    const template = resources.map((el, i) => {
      items.innerHTML += ` <a href="./product.html?id=${el._id}">
              <article>
                  <img src="${el.imageUrl}" alt="${el.altTxt}">
                  <h3 class="productName">${el.name}</h3>
                    <p class="productDescription">${el.description}</p>
                    </article>
                </a> `
    })
  }
  )
  .catch(error => {
    alert(" Erreur : " + error.message);
  })

  // intégration des données de la page d'acueil en utilisant ECMA6 backtick et la boucle for of

/*function itemTemplate(el) {
  items.innerHTML += ` <a href="./product.html?id=${el._id}">
              <article>
                  <img src="${el.imageUrl}" alt="${el.altTxt}">
                  <h3 class="productName">${el.name}</h3>
                    <p class="productDescription">${el.description}</p>
                    </article>
                </a> `;
}

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

getAllElements();*/

