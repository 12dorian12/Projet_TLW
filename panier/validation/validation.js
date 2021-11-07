function autoFill(){
    if (localStorage["etatConnexion"] != -1){

        document.querySelector("#lienInscription").style.display = "none"

        var user = JSON.parse(localStorage["user"]);
        document.querySelector("#mail").value=user[localStorage["etatConnexion"]].mail;
        document.querySelector("#prenom").value=user[localStorage["etatConnexion"]].prenom;
        document.querySelector("#nom").value=user[localStorage["etatConnexion"]].nom;
        document.querySelector("#numero").value=user[localStorage["etatConnexion"]].num;
        document.querySelector("#adresse").value=user[localStorage["etatConnexion"]].adresse;
        document.querySelector("#ville").value=user[localStorage["etatConnexion"]].ville;
        //document.querySelector("#info").value=user[localStorage["etatConnexion"]].info
    }
    if (localStorage["error"] == "Mauvaise adresse"){
        document.querySelector("#errorMsg").innerHTML = "L'adresse semble être incorrecte"
        localStorage["error"] = "aucune"
        for (i of document.querySelectorAll(".colorRed")){
            i.style.color = "red"
        }
    }
    if (localStorage["error"] == "pas de route"){
        document.querySelector("#errorMsg").innerHTML = "Impossible de trouver une route de livraison"
        localStorage["error"] = "aucune"
        for (i of document.querySelectorAll(".colorRed")){
            i.style.color = "red"
        }
    }
    if (localStorage["error"] == "pas rempli"){
        document.querySelector("#errorMsg").innerHTML = "Veuillez remplir tout le formulaire"
        localStorage["error"] = "aucune"
    }
}

function commanderLePanier(){
    var remplie = true
    for(inp of document.querySelectorAll(".requierVerif")){
        if(typeof(inp.value) == "undifined" || inp.value == ""){
            remplie = false
        }
    }
    if(remplie){
        var infoClient = {
            "adresse" : document.querySelector("#adresse").value+", "+document.querySelector("#ville").value,
            "mail" : document.querySelector("#mail").value,
            "nom" : document.querySelector("#prenom").value + " " + document.querySelector("#nom").value,
            "numero" : document.querySelector("#numero").value,
            "ville" : document.querySelector("#ville").value,
            "info" : document.querySelector("#info").value
        }
        localStorage["infoClient"] = JSON.stringify(infoClient)
        document.location = "bonDeCommande.html"
    }
    else{
        localStorage["error"] = "pas rempli"
        document.location=""
    }
}

function recapFill(){
    distanceCPE(JSON.parse(localStorage["infoClient"]).adresse)//"66 avenue roger salengro, 69100, france" --- "4 rue janny, 88200, france"
}



function distanceCPE(adresse){
    const mytoken = "pk.eyJ1IjoiZG9yaWFuMTEyIiwiYSI6ImNrdmxocW13NDAxMXcyc2pwNHVleW4xMHkifQ.f-bepF7cj_Vk07VntW_DUQ"
    const cpe = "4.869805,45.783933" //logitude, latitude
    const locomotion = "driving"
    console.log(adresse)
    fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(adresse)+".json?types=address&access_token="+mytoken)
    .then((reponse) => reponse.json())
    .then((mapBoxGeocoding) => {
        if (mapBoxGeocoding.features.length == 0){
            localStorage["error"] = "Mauvaise adresse"
            document.location = "commandeForm.html"
        }
        var coordonnerList = mapBoxGeocoding.features[0].center
        coordonner = coordonnerList[0]+","+coordonnerList[1]
        console.log(mapBoxGeocoding)
        document.querySelector("iframe").src="https://maps.google.com/maps?q=" + coordonnerList[1] + "," + coordonnerList[0] + "&z=15&output=embed"
        fetch("https://api.mapbox.com/directions/v5/mapbox/"+locomotion+"/"+cpe+";"+coordonner+"?geometries=geojson&access_token="+mytoken)
        .then((reponse) => reponse.json())
        .then((mapBoxDistance) => {
            if (mapBoxDistance.routes.length == 0){
                localStorage["error"] = "pas de route"
                document.location = "commandeForm.html"
            }
            
            var distance = mapBoxDistance.routes[0].distance;
            fillBon(parseInt(distance)/1000)
        })
    })
    
}

function fillBon(distance){
    /* ajout Date du jour */
    var curentDate = new Date()
    var annee = curentDate.getFullYear();
    var mois = curentDate.getMonth()+1;
    var jour = curentDate.getDate();
    jour > 10 ? true : jour = "0"+jour;
    mois > 10 ? true : mois = "0"+mois;
    document.querySelector("#date").innerHTML = annee+"-"+mois+"-"+jour;
    


    /* numereau random */
    document.querySelector("#commandeNum").innerHTML = parseInt(Math.random()*10000000000)



    /* info client */
    document.querySelector('#nomCli').innerHTML = JSON.parse(localStorage["infoClient"]).nom
    document.querySelector('#adresseCli').innerHTML = JSON.parse(localStorage["infoClient"]).adresse
    document.querySelector('#villeCli').innerHTML = JSON.parse(localStorage["infoClient"]).ville
    document.querySelector('#telephoneCli').innerHTML = JSON.parse(localStorage["infoClient"]).numero
    


    /* remplissage du tabPanier */
    var livraisonDate = new Date(JSON.parse(localStorage["dateVal"])[0])
    var livraisonannee = livraisonDate.getFullYear();
    var livraisonmois = livraisonDate.getMonth()+1;
    var livraisonjour = livraisonDate.getDate();
    jour >= 10 ? true : jour = "0"+jour;
    mois >= 10 ? true : mois = "0"+mois;

    var sousTotal = 0;
    var quantite = 0;

    for([i, art] of JSON.parse(localStorage["panier"]).entries()){
        var currentArticle = document.importNode(document.querySelector("#ligneTab").content, true);

        currentArticle.querySelector(".nomLigne").innerHTML = art.nom;
        currentArticle.querySelector(".quantLigne").innerHTML = art.quantiter;
        currentArticle.querySelector(".dateLigne").innerHTML = livraisonannee+"-"+livraisonmois+"-"+livraisonjour;
        currentArticle.querySelector(".prixUniLigne").innerHTML = art.prix+"€";
        var prixLigne = parseInt(art.prix*art.quantiter*100)/100
        currentArticle.querySelector(".prixLigne").innerHTML = prixLigne +"€";
        sousTotal += prixLigne;
        quantite += art.quantiter;
        document.querySelector("#tabPanier").appendChild(currentArticle);
        
    }



    /* remplissage des prix */
    sousTotal = parseInt(sousTotal*100)/100
    document.querySelector('#sousTotal').innerHTML = sousTotal + " €"

    var remise = quantite >= 10 ? 10 : 0;
    document.querySelector('#remise').innerHTML = remise + " %"

    var totalRemise = parseInt(sousTotal*100 - sousTotal*remise)/100
    document.querySelector('#totalRemise').innerHTML = totalRemise + " €"

    var expresse = 0;
    if (JSON.parse(localStorage["dateVal"])[1] == 0) {
        document.querySelector("#expresse").innerHTML = "8 €";
        expresse = 8
    }
    else{
        document.querySelector("#expresseDiv").style.display = "none";
    }

    var expedition = 0;
    if (distance > 20){
        expedition = parseInt(500 + 7*distance)/100
    }
    document.querySelector("#expedition").innerHTML = expedition + " €";

    var total = parseInt((totalRemise+expresse+expedition)*100)/100;
    document.querySelector("#total").innerHTML = total + " €";



    /* Remplissage des info */
    document.querySelector('#remarqueClient').innerHTML = JSON.parse(localStorage["infoClient"]).info
    document.querySelector('#distanceP').innerHTML = "Distance de livrasons : " + distance + " km"
    document.querySelector('#quantP').innerHTML = "nombre d'articles : " + quantite
}