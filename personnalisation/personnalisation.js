var customProdiut = {
    "taille" : 0,
    "cou1" : 0,
    "cou2" : 0,
    "motif" : 0,
    "qualiter" : 0,
    "position" : 0,
    "prix" : 19.99,
    "type" : localStorage["slipType"],
    "quantiter": 1
}

var goodSlip; /*initialiser par le fetch*/

var c = document.querySelector('#customCanvas');
var ctx = c.getContext("2d");


/*################################## XMLHttpRequest ########################################*/


fetch("../json/article.json")
.then((response) => response.json())
.then((articles)=>{
    goodSlip = articles.slip[parseInt(localStorage["slipType"])]
    

    var name = document.querySelector("#name");
    name.innerHTML = goodSlip.nom;
    setPrix();
    setCouleur();
    resetStyle();
});

/*################################## gestion données ########################################*/

function setStyle(customInfo) {
    tFunc(customInfo.taille);
    cFunc(customInfo.cou1);
    c2Func(customInfo.cou2);
    mFunc(customInfo.motif);
    qFunc(customInfo.qualiter);
    pFunc(customInfo.position);
}

function resetStyle() {
    tFunc(0);
    cFunc(0);
    c2Func(0);
    mFunc(0);
    qFunc(0);
    pFunc(0);
}
function setPrix() {
    var prix = document.querySelector("#prix");
    currentPrix = goodSlip.prix
    currentPrix += goodSlip.couleur1[customProdiut.cou1][2];
    currentPrix += goodSlip.couleur2[customProdiut.cou2][2];
    currentPrix += goodSlip.motif[customProdiut.motif][1];
    currentPrix += goodSlip.qualiter[customProdiut.qualiter];
    currentPrix += goodSlip.prixImage*customProdiut.position;
    currentPrix = Math.round(currentPrix*100)/100; //arrondie au centieme
    customProdiut.prix = currentPrix;
    prix.innerHTML = "Prix : "+ Math.round(currentPrix*customProdiut.quantiter*100)/100 + "€";//arrondie enoer parcque js ne sais pas multiplier par 3 ...
}

/*################################## canvas ########################################*/

function draw() {
    var imgSlip = new Image;
    imgSlip.src = goodSlip.imgSrc;
    imgSlip.onload = function(){
        ctx.drawImage(imgSlip, 0, 0);

        // set composite mode
        ctx.globalCompositeOperation = "source-in";
        // draw color
        ctx.fillStyle = goodSlip.couleur1[customProdiut.cou1][0];
        ctx.fillRect(0, 0, c.width, c.height);
      }
}

/*################################## section prix ########################################*/

function sendToPanier(){
    if (typeof(localStorage["panier"]) == "undefined"){
        localStorage["panier"] = JSON.stringify([]);
    }
    var panier = JSON.parse(localStorage["panier"]);
    panier.push(customProdiut);
    localStorage["panier"] = JSON.stringify(panier);
    console.log(localStorage);
    console.log(JSON.parse(localStorage["panier"]));

    location = "../panier/panier.html";
}

function subLessFunc(){
    var numQuant = document.querySelector("#numQuant");
    curentQuant = parseInt(numQuant.innerHTML) - 1;
    curentQuant <= 0 ? curentQuant=1 : 1; 
    numQuant.innerHTML = curentQuant;
    customProdiut.quantiter = curentQuant;
    setPrix();
}
function addMoreFunc(){
    var numQuant = document.querySelector("#numQuant");
    curentQuant = parseInt(numQuant.innerHTML)
    curentQuant = parseInt(numQuant.innerHTML) + 1;
    numQuant.innerHTML = curentQuant;
    customProdiut.quantiter = curentQuant;
    setPrix();
}

/*################################## formulaire ########################################*/

function setCouleur() {
    for ([index, cou] of goodSlip.couleur1.entries())
    {
        document.querySelector(".couleur1"+index).style.backgroundColor = cou[0]
    }
    for ([index, cou] of goodSlip.couleur2.entries())
    {
        document.querySelector(".couleur2"+index).style.backgroundColor = cou[0]
    }
}

function tFunc(x){
    var btnText = document.querySelectorAll(".btnText");
    for (i of btnText){
        i.style.borderColor = "white";
        i.style.fontWeight = "normal";
    }
    btnText[x].style.border = "2px solid steelblue";
    btnText[x].style.fontWeight = "bold";
}

function cFunc(x) {
    var cercleCouleur = document.querySelectorAll(".cercleCouleur");
    for (i of cercleCouleur){
        i.style.borderColor = "white";
    }
    cercleCouleur[x].style.borderColor = "steelblue";
    customProdiut.cou1 = x;
    setPrix();
    draw()
}

function c2Func(x) {
    var cercleCouleur2 = document.querySelectorAll(".cercleCouleur2");
    for (i of cercleCouleur2){
        i.style.borderColor = "white";
    }
    cercleCouleur2[x].style.borderColor = "steelblue";
    customProdiut.cou2 = x;
    setPrix();
}

function mFunc(x) {
    var cercleMotif = document.querySelectorAll(".cercleMotif");
    for (i of cercleMotif){
        i.style.borderColor = "white";
    }
    cercleMotif[x].style.borderColor = "steelblue";
    customProdiut.motif = x;
    setPrix();
}
function qFunc(x) {
    var btnGText = document.querySelectorAll(".btnGText");
    for (i of btnGText){
        i.style.borderColor = "white";
        i.style.fontWeight = "normal";
    }
    btnGText[x].style.borderColor = "steelblue";
    btnGText[x].style.fontWeight = "bold";
    customProdiut.qualiter = x;
    setPrix();
}
function pFunc(x) {
    var btnG2Text = document.querySelectorAll(".btnG2Text");
    for (i of btnG2Text){
        i.style.borderColor = "white";
        i.style.fontWeight = "normal";
    }
    btnG2Text[x].style.borderColor = "steelblue";
    btnG2Text[x].style.fontWeight = "bold";
    customProdiut.position = x+1;
    setPrix();
}