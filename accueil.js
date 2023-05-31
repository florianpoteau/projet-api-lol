
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
      
    //   Variable pour récupérer toutes les images
const listeImage = document.querySelectorAll(".containerImg");

// Variable pour récupérer tout les container qui englobe les images et les graphiques
const container = document.querySelectorAll(".container")

    

    fetch(`http://ddragon.leagueoflegends.com/cdn/13.10.1/data/en_US/champion.json`, "GET", championListe)

    function championListe(){
        const request = JSON.parse(this.response);

        const champions = request.data;

        // Boucle pour afficher que 9 éléments

        for (let i=0; i<=9; i++){

            // Récupération des champions par champion
        const championKey = Object.keys(champions)[i+1];

        const champion = champions[championKey];

        // Récupération de l'image de chaque champion
        const championImage = champion.image.full;

        // Création de l'image dans le dom
        const imageChampion = document.createElement("img")

        imageChampion.src = `http://ddragon.leagueoflegends.com/cdn/13.10.1/img/champion/${championImage}`;

        // Puisque listeImage est une nodeList, création d'une variable qui permet d'itérer sur cette liste afin de récupérer élément par élément
        const containerImg = listeImage[i];
    containerImg.appendChild(imageChampion);
    // Evenement au click des images

            imageChampion.addEventListener("click", () =>{

                const hp = champion.stats.hp
                const armure = champion.stats.armor
                const attaque = champion.stats.attaque
                const speed = champion.stats.movespeed


                // Création du graphique en html
                const graphique = document.createElement("div")
                const canva = document.createElement("canvas")
                canva.id = "myChart"

                graphique.appendChild(canva);

                // Puisque container est une nodeList, création d'une variable qui permet d'itérer sur cette liste afin de récupérer élément par élément
                const detailGraphique = container[i]
                detailGraphique.appendChild(graphique);

                // Création du graphique par chart.js
                const ctx = document.getElementById('myChart');

                    new Chart(ctx, {
                        type: 'radar',
                        data: {
                        labels: ['HP', 'Armure', 'Attaque', 'Speed'],
                        datasets: [{
                            label: '# of Votes',
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


                
            })

          }
    }

})