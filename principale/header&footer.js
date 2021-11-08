/*
"/" relatif a la racine 
"//" relatif au protocole
*/

var racineDuSite = "https://12dorian12.github.io/Projet_TLW"

/*################################## definition des variable du local storage ########################################*/

if (typeof(localStorage["user"]) == "undefined"){
    fetch(racineDuSite+"/json/people.json")
    .then((response) => response.json())
    .then((perso)=>{
        localStorage["user"]=JSON.stringify(perso.user);
        document.location = ""
    })
}
if (localStorage["etatConnexion"] == undefined){
    localStorage["etatConnexion"] = -1;
}
if (typeof(localStorage["filtre"])== "undefined"){
    localStorage["filtre"] = 0
}
if (typeof(localStorage["slipType"])== "undefined"){
    localStorage["slipType"] = 0
}
if (typeof(localStorage["panier"]) == "undefined"){
    localStorage["panier"] = JSON.stringify([]);
}
if (typeof(localStorage["error"]) == "undefined"){
    localStorage["error"] = "aucune";
}
if (typeof(localStorage["dateVal"]) == "undefined"){
    localStorage["dateVal"] = JSON.stringify([0,0]);
}
if (typeof(localStorage["infoClient"]) == "undefined"){
    localStorage["infoClient"] = JSON.stringify({});
}

/*################################## XMLHttpRequest ########################################*/


fetch(racineDuSite+"/principale/header.html")
.then(response => response.text())
.then(body => {
    document.querySelector('header').innerHTML = body;
    window.addEventListener("scroll", toTopHidden);
    var user = JSON.parse(localStorage["user"]);
    if (localStorage["etatConnexion"] != -1){
        document.querySelector('#titreConnexion').innerHTML = user[localStorage["etatConnexion"]].prenom;
        // utilisation de chemein absolue car la fonction est utiliser dans plusieur fichiers diferents
        document.querySelector('#lienConnexion').href = racineDuSite+"/seConnecter/connected/connected.html"; 
    }
    else{
        document.querySelector('#titreConnexion').innerHTML = "Se Connecter";
    }

    /*################################## redefinition des liens selon la racine du site ########################################*/
    document.querySelector("#toTheTop").style.backgroundImage = "url('"+racineDuSite+"/media/upArrow.png')"
    document.querySelector("#headMonCalecon").href = racineDuSite+"/index.html"
    document.querySelector("#lienConnexion").href = racineDuSite+"/seConnecter/connexion/connexion.html"
    document.querySelector("#headPanier").href = racineDuSite+"/panier/panier.html"
    document.querySelector("#headLogo").src = racineDuSite+"/media/New-logo.png"
    document.querySelector("#headProfil").src = racineDuSite+"/media/profilB.png"
    document.querySelector("#headPanierImg").src = racineDuSite+"/media/panierB.png"
   
});

fetch(racineDuSite+"/principale/footer.html")
.then(response => response.text())
.then(body => {
    document.querySelector('footer').innerHTML = body;

    /*################################## redefinition des liens selon la racine du site ########################################*/
    document.querySelector("#footPropos").href = racineDuSite+"/propos&contact/propos&contact.html"
    document.querySelector("#footMieux").href = racineDuSite+"/propos&contact/propos&contact.html"
    document.querySelector("#footNous").href = racineDuSite+"/propos&contact/propos&contact.html"
});




function toTopHidden(e){
    if (window.scrollY >= 300){
        document.querySelector('#toTheTop').style.visibility = "visible";
    }
    else{
        document.querySelector('#toTheTop').style.visibility = "hidden";
    }
}
