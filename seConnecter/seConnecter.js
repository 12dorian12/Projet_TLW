function recupForm() {
    var docQ = document.querySelector("#c1 > form")
    localStorage["prenom"] = docQ.elements["prenom"].value;
    localStorage["etatConnexion"] = "Connecte";
    docQ.elements["nom"].value;
}

function deconnexion() {
    localStorage["etatConnexion"] = "pasConnecte";
    document.location.href="seConnecter.html";
}

function nomDuBo() {
    console.log(document.querySelector("#logout"));

}

function redirDuTur() {
    if (localStorage["etatConnexion"] == "Connecte"){
        document.location.href="connected.html";
    }
    
}

function loadConnected() {
    if (localStorage["etatConnexion"] == "pasConnecte"){
        document.location.href="seConnecter";
        
    }
    document.querySelector("#logout").innerHTML = localStorage["prenom"];
    
}

function verifForm(info,visible) {
    var docQ = document.querySelector("#c1 > form")
    if (info==1){
        if ( docQ.elements["prenom"].value!= "" ){
            
        }
    }
}