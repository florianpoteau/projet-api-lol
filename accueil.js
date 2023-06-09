
import { api_key } from './config.js';

document.addEventListener('DOMContentLoaded', function () {

    // Fetch
    
    
    function fetch(url, method, fun) {
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

// Variable pour le bouton générer
const btnGenerate = document.querySelector(".btnGenerate")
const inputGenerate = document.getElementById("inputGenerate")
const btnEnvoyer = document.querySelector(".envoyer")
const form1 = document.querySelector(".formChampionGenerate")
const titreGenerate = document.querySelector(".titreGenerate")



// Ajouter une variable pour stocker l'ID du timer
var timerId = null;

btnGenerate.addEventListener("click", (e) => {
  e.preventDefault();
  fetch("http://ddragon.leagueoflegends.com/cdn/13.10.1/data/en_US/champion.json", "GET", championGenerate);
  if(e.target){
    btnGenerate.style.display = "none";
    titreGenerate.style.display = "none";

    // Démarrer le timer de 60 secondes
    timerId = setTimeout(() => {
      // Code à exécuter lorsque le timer se termine
      clearTimeout(timerId); // Effacer le timer
      // Ajouter le code pour créer un nouvel élément p sous le bouton
      const timerElement = document.createElement("p");
      timerElement.innerHTML = "Le temps est écoulé !";
      document.body.appendChild(timerElement);
    }, 60000); // 60 secondes (60000 millisecondes)
  }
});


function championGenerate() {
  const request = JSON.parse(this.response);
  const champions = request.data;
  const championKeys = Object.keys(champions);
  const totalChampions = championKeys.length;


// Génére un champion aléatoire
  const randomIndex = Math.floor(Math.random() * totalChampions);
  const randomChampionKey = championKeys[randomIndex];
  const randomChampion = champions[randomChampionKey];
  

// Création d'une variable tentative qui itère de 1 à 7 pour 7 tentatives
  let tentative = 0
  

const nbTentative = document.querySelector(".tentative")
const imgRandomChampion = document.querySelector(".imgRandomChampion")

imgRandomChampion.src = `http://ddragon.leagueoflegends.com/cdn/13.10.1/img/champion/${randomChampion.image.full}`
imgRandomChampion.classList.add("imageRandom")

  form1.addEventListener("submit", (e) => {
    e.preventDefault()
    console.log(inputGenerate.value.trim());

    // Si l'utilisateur a trouvé le bon champion
    if(inputGenerate.value.trim().toLowerCase() == randomChampionKey.trim().toLowerCase()){
      btnGenerate.style.display = "none" 
      nbTentative.innerHTML = "Bravo vous avez trouvé !!!"
      nbTentative.classList.add("nbtentative1")
    }

    // Si l'utilisateur n'a pas trouvé le bon champion
    else{
      let tentativeRestante = 3-tentative
      tentative++
      nbTentative.innerHTML = `Il vous reste ${tentativeRestante} tentative(s)`

      const indice = document.createElement("p");
      indice.classList.add("indice")
      switch(tentative){
        case 1:
          indice.innerHTML = `le champion est de type: ${randomChampion.partype}`

          break;

          case 2: 

          const nomChampion = randomChampion.name

          const premiereLettreDuNom = nomChampion.charAt(0);

          indice.innerHTML = `la première lettre de son nom est le: ${premiereLettreDuNom}`

          break;

          case 3:

          const tags = randomChampion.tags[0]

          indice.innerHTML = `Le champion est un ${tags}`

          break;

          case 4:

          const tags1 = randomChampion.tags[1];

          indice.innerHTML = `Le champion est aussi un ${tags1}`


        
      }
      form1.appendChild(indice)


      if (tentative >= 4){
        indice.innerHTML= ""
        nbTentative.innerHTML = ""

        const reponse = document.createElement("p");

        reponse.classList.add("reponse")

      reponse.innerHTML = `La réponse était: ${randomChampion.name}`

      form1.appendChild(reponse)
        
        form1.removeEventListener("submit", (e));
        inputGenerate.disabled = true;
      }
    }
  })


}

    fetch(`http://ddragon.leagueoflegends.com/cdn/13.10.1/data/en_US/champion.json`, "GET", championListe)

    function championListe(){
        const request = JSON.parse(this.response);

        const champions = request.data;

        // Récupération du nombre total de champions
        const totalChampions = Object.keys(champions).length;

        const divGauche = document.querySelector(".listeChampion");
        divGauche.innerHTML = '';




        // Boucle pour afficher que 9 éléments

        for (let i=0; i<=totalChampions; i++){
          

            // Récupération des champions par champion
        const championKey = Object.keys(champions)[i+1];

        const champion = champions[championKey];

        // Nom des champion
        const nomChampion = document.createElement("p");
        nomChampion.innerHTML = `${champion.name}`
        nomChampion.classList.add("nomChampionAccueil")

        const idChampion = champion.id

        // Récupération de l'image de chaque champion
        const championImage = champion.image.full;

        // Création de l'image dans le dom

        const containerImg1 = document.createElement("div")
        containerImg1.classList.add("containerImg")

        const container = document.createElement("div")
        container.classList.add("container")

        container.appendChild(containerImg1)

        const imageChampion = document.createElement("img")

        imageChampion.src = `http://ddragon.leagueoflegends.com/cdn/13.10.1/img/champion/${championImage}`;

    containerImg1.appendChild(imageChampion);

    containerImg1.appendChild(nomChampion)

    divGauche.appendChild(container)

    // Gestion du filtre

            // Récupération de la valeur sélectionnée du filtre
  const filtre = document.getElementById("filtre");


// Gestion du filtre
filtre.addEventListener("change", () => {
    const filtreValue = filtre.value.toLowerCase().trim();
    if (filtreValue === champion.partype.toLowerCase().trim()) {
      imageChampion.src = `http://ddragon.leagueoflegends.com/cdn/13.10.1/img/champion/${championImage}`;

    } else {
        container.innerHTML = ""

    }
  });




    // Evenement au click des images et appel de la fonction pour afficher les détails
            imageChampion.addEventListener("click", () =>{
              

              affichageStatistique()
                
            })

            // Evenement au click des images et appel de la fonction pour afficher les détails

            // Gestion du formulaire de recherche ci-dessous

            const form = document.querySelector(".rechercheChampion")
            const input = document.getElementById("recherche")

            form.addEventListener("submit", (e) =>{

              e.preventDefault()

              const rechercheInput = input.value.trim().toLowerCase();

              if(champion.name.toLowerCase().includes(rechercheInput)){

              affichageStatistique()

              }

            })



      function affichageStatistique() {
        const graph = document.querySelector(".graphique");
        const imageChampion = document.querySelector(".imageChampion");
        const nomChampion = document.querySelector(".nomChampion");
            
        nomChampion.innerhtml = ""
            
        nomChampion.innerHTML = `${champion.name}`
            
        const img = document.createElement("img");
            
        img.classList.add("imageDetail")
            
            
        img.src = `http://ddragon.leagueoflegends.com/cdn/13.10.1/img/champion/${championImage}`;
            
        imageChampion.innerHTML = '';
            
        imageChampion.appendChild(img)
            
        graph.innerHTML = '';
            
        // Récupération des statistiques
        const hp = champion.stats.hp
        const armure = champion.stats.armor
        const attaque = champion.stats.attaque
        const speed = champion.stats.movespeed
            
            
        // Création du graphique en html
        const graphique = document.createElement("div")
        graphique.classList.add("graph")
        const canva = document.createElement("canvas")
        canva.id = "myChart"

        graphique.appendChild(canva);

        // Puisque container est une nodeList, création d'une variable qui permet d'itérer sur cette liste afin de récupérer élément par élément
        const detailGraphique = graph
        detailGraphique.appendChild(graphique);
            
        // Création du graphique par chart.js
        const ctx = document.getElementById('myChart');
            
            new Chart(ctx, {
                type: 'pie',
                data: {
                labels: ['HP', 'Armure', 'Attaque', 'Speed'],
                datasets: [{
                    label: '',
                    data: [hp, armure, attaque, speed],
                    borderWidth: 1
                }]
                },
                options: {
                scales: {
                    y: {
                    beginAtZero: true
                    }
                }
                }
            });
            
            
                                fetch(`http://ddragon.leagueoflegends.com/cdn/13.10.1/data/en_US/champion/${idChampion}.json`, "GET", rechercheCapacite)
            }

          }
    }



    // Création d'une fonction afin de récupérer les capacité des champions
    function rechercheCapacite() {
      const request = JSON.parse(this.response);
      const champions = request.data;
      const totalChampions = Object.keys(champions).length;
      const containerSort = document.querySelector(".containerSort");
      containerSort.innerHTML = "";
  
      // variable pour le titre Capacité active
      const capaciteActiveDiv = document.createElement("div");
      capaciteActiveDiv.classList.add("capaciteActive");
      containerSort.appendChild(capaciteActiveDiv);

      // Variable pour la div capacité passive
      const divCapacitePassive = document.querySelector(".containerPassive");
      divCapacitePassive.innerHTML = ''

      // Variable pour le titre capacité passive
      const textCapacitePassive = document.createElement("p");
      textCapacitePassive.innerHTML = "Capacité passive";
      textCapacitePassive.classList.add("textCapacitePassive")

      // Variable pour afficher l'image de la capacité passive
      const imgCapacitePassive = document.createElement("img");
      imgCapacitePassive.classList.add("imagePassive")
      
      // Variable pour le nom de la capacité passive
      const nomActivitePassive = document.createElement("p");
  
      const titreSort = document.querySelector(".titreSort");
      titreSort.innerHTML = "Les sorts du champion :";
  
      // Boucle pour parcourir tous les champions
      for (let i = 0; i <= totalChampions; i++) {
          const championKey = Object.keys(champions)[i];
          const champion = champions[championKey];
          const spells = champion.spells;

          // Récupération de l'image de la capacité passive
          const imagePassive = champion.passive.image.full
          imgCapacitePassive.src = `http://ddragon.leagueoflegends.com/cdn/13.10.1/img/passive/${imagePassive}`

          // Récupération du nom de la capacité passive
          const nomPassive = champion.passive.name
          nomActivitePassive.innerHTML = `${nomPassive}`
          nomActivitePassive.classList.add("nomCapacitePassive")
  
          const capaciteActive = document.createElement("p");
          capaciteActiveDiv.appendChild(capaciteActive);
          capaciteActive.innerHTML = "Capacité active:";
          capaciteActive.classList.add("capaciteActive");
  
          const ul = document.createElement("ul");
  
          // For each pour parcourir tous les sorts
          spells.forEach((spell) => {
              const li = document.createElement("li");
              const imageSort = document.createElement("img");
              const nomSort = document.createElement("p");
  
              nomSort.innerHTML = `${spell.name}`;
  
              const image = spell.image.full;
              imageSort.src = `http://ddragon.leagueoflegends.com/cdn/13.10.1/img/spell/${image}`;
  
              ul.appendChild(li);
              li.appendChild(imageSort);
              li.appendChild(nomSort);
          });
  
          containerSort.appendChild(ul);

          // AppendChild pour la partie capacité passive
          divCapacitePassive.appendChild(textCapacitePassive);
          divCapacitePassive.appendChild(imgCapacitePassive);
          divCapacitePassive.appendChild(nomActivitePassive);
      }
  }
      

})