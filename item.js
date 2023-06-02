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

    const div = document.createElement("div")

    div.classList.add("divflex")

    gaucheItem.appendChild(div);

    console.log(gaucheItem);

    for (const itemId in items) {
        
        const img = document.createElement("img");
        const nomImg = document.createElement("p");
        const div1 = document.createElement("div")
        const br = document.createElement("br")

        img.src = `http://ddragon.leagueoflegends.com/cdn/13.11.1/img/item/${itemId}.png`;
        img.classList.add("imageItem")

        nomImg.innerHTML = `${request.data[itemId].name}`
        nomImg.classList.add("nomImg")

        div.appendChild(div1)
        div1.appendChild(img)
        div1.appendChild(nomImg)
        div.appendChild(br)
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