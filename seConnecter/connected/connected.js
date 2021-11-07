function deconnexion() {
    localStorage["etatConnexion"] = -1;
    document.location.href="../connexion/connexion.html";
}

function afficheInfos() {
    var user = JSON.parse(localStorage["user"]);
    document.querySelector("#mail").innerHTML=user[localStorage["etatConnexion"]].mail;
    document.querySelector("#prenom").innerHTML=user[localStorage["etatConnexion"]].prenom;
    document.querySelector("#nom").innerHTML=user[localStorage["etatConnexion"]].nom;
    document.querySelector("#numero").innerHTML=user[localStorage["etatConnexion"]].num;
    document.querySelector("#adresse").innerHTML=user[localStorage["etatConnexion"]].adresse;
    document.querySelector("#ville").innerHTML=user[localStorage["etatConnexion"]].ville
    
}