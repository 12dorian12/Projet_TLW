function recupForm() {
    var remplie = true
    for(inp of document.querySelectorAll("input")){
        if(typeof(inp.value) == "undifined" || inp.value == ""){
            remplie = false
        }
    }
    if(remplie){
        var docQ = document.querySelector("#formumu")
        var user = JSON.parse(localStorage["user"]);
        var newUser= {
            "mail":docQ.elements["mail"].value,
            "mdp": docQ.elements["mdp"].value,
            "prenom": docQ.elements["prenom"].value,
            "nom": docQ.elements["nom"].value,
            "num": docQ.elements["num"].value,
            "adresse": docQ.elements["adresse"].value,
            "ville": docQ.elements["ville"].value
        }
        user.push(newUser)
        console.log(newUser)
        localStorage["user"]= JSON.stringify(user)
        
        localStorage["etatConnexion"] = user.length -1 ;
        docQ.elements["nom"].value;
    }
    else{
        localStorage["error"] = "pas rempli"
        document.location=""
    }
}
function redirDuTur() {
    if (localStorage["etatConnexion"] != -1){
        document.location.href="../connected/connected.html";
    }
    /*qsq*/
    if (localStorage["error"] == "pas rempli"){
        document.querySelector("#errorMsg").innerHTML = "Veuillez remplir tout le formulaire"
        localStorage["error"] = "aucune"
    }
}

