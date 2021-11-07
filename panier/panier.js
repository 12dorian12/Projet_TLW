var panier = document.querySelector("#panier");
let template = document.querySelector("#panierListe");



fetch("../json/article.json")
.then((response) => response.json())
.then((articles)=>{
    for ([index, calecon] of JSON.parse(localStorage["panier"]).entries() ){
        var goodSlip = articles.slip[parseInt(calecon.type)]

        let clone = document.importNode(template.content, true);
        clone.querySelector("#img1").src=calecon.img1
        clone.querySelector("#img2").src=calecon.img2
        clone.querySelector("#img3").src=calecon.img3
        clone.querySelector(".nom").innerHTML=goodSlip.nom;
        clone.querySelector(".prix").innerHTML=parseInt(calecon.prix*100)/100+"€";
        clone.querySelector(".prix").id= "prix"+index;
        clone.querySelector(".imgPoub > img").id = index;
        clone.querySelector(".imgPoub > img").onclick = supprElem;
        clone.querySelector(".subLess").id="less"+index;
        clone.querySelector(".addMore").id="more"+index;
        clone.querySelector(".numQuant").id="quant"+index;
        clone.querySelector(".numQuant").innerHTML=calecon.quantiter;
        panier.appendChild(clone);
    }

    var curentDate = new Date()
    var annee = curentDate.getFullYear();
    var mois = curentDate.getMonth()+1;
    var jour = curentDate.getDate()+1;
    jour >= 10 ? true : jour = "0"+jour;
    mois >= 10 ? true : mois = "0"+mois;

    var jour3 = curentDate.getDate()+4;
    jour3 >= 10 ? true : jour3 = "0"+jour3;

    document.querySelector("#dateLiv").min = annee+"-"+mois+"-"+jour;
    document.querySelector("#dateLiv").value = annee+"-"+mois+"-"+jour3;

    recharger()
    setPrix()
});



function supprElem (cible){
    cibleId = cible.target.id;
    console.log(cibleId);
    panierListe = JSON.parse(localStorage["panier"]);
    panierListe.splice(parseInt(cibleId), 1)
    localStorage["panier"] = JSON.stringify(panierListe);
    document.location = ""
}

function setPrix (){
    console.log(JSON.parse(localStorage["dateVal"]))
    var prix = JSON.parse(localStorage["dateVal"])[1] == 0 ?  0 : 8
    var quantite =0
    for ([index, calecon] of JSON.parse(localStorage["panier"]).entries() ){
        quantite += calecon.quantiter;
        prix += (calecon.prix)*(calecon.quantiter);
        document.querySelector("#prix"+index).innerHTML= parseInt((calecon.prix)*(calecon.quantiter)*100)/100+"€"
    }
    document.querySelector("#prixH1").innerHTML = parseInt(prix*100)/100+"€";
}

function subLessFunc(cible){
    index = cible.id.slice(4,cible.id.lenght);
    calecon=JSON.parse(localStorage["panier"])
    console.log(calecon[0].quantiter)
    var numQuant = document.querySelector("#quant"+index);
    var curentQuant = parseInt(numQuant.innerHTML) - 1;
    curentQuant <= 0 ? curentQuant=1 : 1; 
    numQuant.innerHTML = curentQuant;
    calecon[index].quantiter = curentQuant;
    localStorage["panier"]= JSON.stringify(calecon);
    setPrix()
}

function addMoreFunc(cible){
    index = cible.id.slice(4,cible.id.lenght);
    calecon=JSON.parse(localStorage["panier"])
    var numQuant = document.querySelector("#quant"+index);
    var curentQuant = parseInt(numQuant.innerHTML) + 1;
    numQuant.innerHTML = curentQuant;
    calecon[index].quantiter = curentQuant;
    localStorage["panier"]= JSON.stringify(calecon);
    setPrix()
}



function recharger() {
    var prix =0
    var dateUser= (document.querySelector("#dateLiv")).valueAsNumber;
    var datePlus3= Date.now()+259200000;
    var dateInfo = [dateUser, 0]
    if(dateUser <= datePlus3) {
        document.querySelector("#modeExp").style.display = "block";
        dateInfo[1] = 1;
        localStorage["dateVal"]= JSON.stringify(dateInfo);
        setPrix()
    }
    else{
        document.querySelector("#modeExp").style.display = "none";
        dateInfo[1] = 0;
        localStorage["dateVal"]= JSON.stringify(dateInfo);
        setPrix()
    }
}

function test(){
    var user = JSON.parse(localStorage["user"])
    document.querySelector("#modeExp").style.display = "none";

    if (localStorage["etatConnexion"] != -1){
        document.querySelector("#adresseLiv").innerHTML=user[localStorage["etatConnexion"]].adresse;
    }
    else{
        document.querySelector("#adresse").style.display = "none";
    }
}

function goToValideForm(){
    document.location = "validation/commandeForm.html"
}