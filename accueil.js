
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
      




    

    fetch(`https://br1.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=${api_key}`, "GET", championListe)

    function championListe(){
        const request = JSON.parse(this.response);

        console.log(request);
    }

})