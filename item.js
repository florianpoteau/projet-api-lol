document.addEventListener("DOMContentLoaded", function () {

const gaucheItem = document.querySelector(".gaucheItem")

function fetch (url, method, fun) {
    //Initialisation de XHR
    const request = new XMLHttpRequest();
    request.addEventListener("load", fun);
    //Spécifier le type d'appel [ GET, POST, PUT, PATCH, DELETE ] et l'URL
    request.open(method, url);
    //Spécification que je veux du JSON en type de retour
    request.setRequestHeader('Accept', "application/json");
    //Permet d'envoyer la requête
    request.send();
}

fetch("http://ddragon.leagueoflegends.com/cdn/13.11.1/data/en_US/item.json", "GET", listeItem);

function listeItem () {

    const request = JSON.parse(this.response);

    const items = request.data;

    const form = document.querySelector(".formItem")

    const input = document.getElementById("rechercheItem")

    const rechercheInput = input.value.trim().toLowerCase()

    for (const itemId in items) {
        
        const img = document.createElement("img");
        const nomImg = document.createElement("p");

        img.src = `http://ddragon.leagueoflegends.com/cdn/13.11.1/img/item/${itemId}.png`;
        img.classList.add("imageItem")

        nomImg.innerHTML = `${request.data[itemId].name}`

        gaucheItem.appendChild(img)
        gaucheItem.appendChild(nomImg)
        img.addEventListener("click", () =>{
            fetch("http://ddragon.leagueoflegends.com/cdn/13.11.1/data/en_US/item.json", "GET", () => clickItem (request, itemId))
        })

        if(request.data[itemId].name.toLowerCase().includes(rechercheInput)){

        form.addEventListener("submit", (e) =>{
            e.preventDefault()
            fetch("http://ddragon.leagueoflegends.com/cdn/13.11.1/data/en_US/item.json", "GET", () => clickItem (request, itemId))
        })
    }
    }

}

function clickItem (request, itemId) {

    const image = document.querySelector(".infoItemImage")

    const description = document.querySelector(".description")

    const achat = document.querySelector(".achat")

    const vente = document.querySelector(".vente")

    const type = document.querySelector(".type");

    image.src = `http://ddragon.leagueoflegends.com/cdn/13.11.1/img/item/${itemId}.png`;

    const nomItem = document.querySelector(".nomItem")

    nomItem.innerHTML = `${request.data[itemId].name}`

    description.innerHTML = `${request.data[itemId].description}`
    achat.innerHTML = `Le prix de cet item est de ${request.data[itemId].gold.base}`
    vente.innerHTML = `Cet objet peut se vendre au prix de ${request.data[itemId].gold.sell}`
    type.innerHTML = `Cet item est de type ${request.data[itemId].tags}`

}
})