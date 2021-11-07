function recupForm() {
    var docQu = document.querySelector("#formumu")
    let mail  = docQu.elements["mailVerif"].value;
    let mdp = docQu.elements["mdpVerif"].value;
    verifId(mail, mdp);
}

function verifId(mail, mdp) {
    var ok = false
    var user = JSON.parse(localStorage["user"]);
    for ([index, perso] of user.entries()){
        if (mail==perso.mail){
            if (mdp==perso.mdp){
                localStorage["etatConnexion"]= index;
                ok = true
            }
        } 
    }
    if (ok){
        document.location.href="../connected/connected.html"; 
    }
    else{
        localStorage["error"] = "mauvais identifiant"
        document.location.href=""; 
    }
}

function redirDuTur() {
    if (localStorage["etatConnexion"] != -1){
        document.location.href="../connected/connected.html";
    }
    /*qsq*/
    if (localStorage["error"] == "mauvais identifiant"){
        document.querySelector("#errorMsg").innerHTML = "Adresse mail ou mot de passe incorrecte"
        localStorage["error"] = "aucune"
        for (i of document.querySelectorAll(".colorRed")){
            i.style.color = "red"
        }
    }
}