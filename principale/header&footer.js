/*
"/" relatif a la racine 
"//" relatif au protocole
*/


fetch("/principale/header.html") //fetch renvoie une promesse resolue avec un objet response 
.then(response => response.text()) //response.text renvoie une promesse resolue avec un USVString (qui contient le text du stream de response)
.then(body => {
    document.querySelector('header').innerHTML = body;
    window.addEventListener("scroll", toTopHidden);
    if (localStorage["etatConnexion"] == undefined){
        localStorage["etatConnexion"] = "pasConnecte";
    }
    if (localStorage["etatConnexion"] == "Connecte"){
        document.querySelector('#titreConnexion').innerHTML = localStorage["prenom"];
    }
    else{
        document.querySelector('#titreConnexion').innerHTML = "Se Connecter";
    }
   
});

fetch("/principale/footer.html")
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

