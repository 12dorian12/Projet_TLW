/*
"/" relatif a la racine 
"//" relatif au protocole
*/


/*################################## definition des variable du local storage ########################################*/

if (typeof(localStorage["user"]) == "undefined"){
    fetch("https://12dorian12.github.io/Projet_TLW//json/people.json")
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


fetch("https://12dorian12.github.io/Projet_TLW//principale/header.html") //fetch renvoie une promesse resolue avec un objet response 
.then(response => response.text()) //response.text renvoie une promesse resolue avec un USVString (qui contient le text du stream de response)
.then(body => {
    document.querySelector('header').innerHTML = body;
    window.addEventListener("scroll", toTopHidden);
    var user = JSON.parse(localStorage["user"]);
    if (localStorage["etatConnexion"] != -1){
        document.querySelector('#titreConnexion').innerHTML = user[localStorage["etatConnexion"]].prenom;
        document.querySelector('#lienConnexion').href = "https://12dorian12.github.io/Projet_TLW//seConnecter/connected/connected.html";
    }
    else{
        document.querySelector('#titreConnexion').innerHTML = "Se Connecter";
    }
   
});

fetch("https://12dorian12.github.io/Projet_TLW//principale/footer.html")
.then(response => response.text())
.then(body => {
    document.querySelector('footer').innerHTML = body;
});




function toTopHidden(e){
    if (window.scrollY >= 300){
        document.querySelector('#toTheTop').style.visibility = "visible";
    }
    else{
        document.querySelector('#toTheTop').style.visibility = "hidden";
    }
}

