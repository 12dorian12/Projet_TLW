var customProdiut = {
    "taille" : 0,
    "cou1" : 0,
    "cou2" : 0,
    "motif" : 0,
    "qualiter" : 0,
    "prix" : 0,
    "type" : localStorage["slipType"],
    "quantiter": 1,
    "img1": "",
    "img2": "",
    "img3": "",
    "nom": ""
}

var lignes = document.querySelectorAll(".formLigne")

var goodSlip; /*initialiser par le fetch*/

var canvas1 = document.querySelector('#customCanvas1');
var ctx1 = canvas1.getContext("2d");
var canvas2 = document.querySelector('#customCanvas2');
var ctx2 = canvas2.getContext("2d");
var canvas3 = document.querySelector('#customCanvas3');
var ctx3 = canvas3.getContext("2d");

var imgSlip = new Image;
var imgSlipInt = new Image;
var imgSlipMotif = new Image;
imgSlip.onload = draw
imgSlipInt.onload = draw
imgSlipMotif.onload = draw
/*################################## XMLHttpRequest ########################################*/


fetch("../json/article.json")
.then((response) => response.json())
.then((articles)=>{
    goodSlip = articles.slip[parseInt(localStorage["slipType"])]
    imgSlip.src = goodSlip.imgSrc;
    imgSlipInt.src = goodSlip.imgSrc.replace(/.png/, " (1).png");
    imgSlipMotif.src = "";

    var name = document.querySelector("#name");
    name.innerHTML = goodSlip.nom;
    customProdiut.nom = goodSlip.nom
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
}

function resetStyle() {
    tFunc(0);
    cFunc(0);
    c2Func(0);
    mFunc(0);
    qFunc(0);
}
function setPrix() {
    var prix = document.querySelector("#prix");
    currentPrix = goodSlip.prix
    currentPrix += goodSlip.couleur1[customProdiut.cou1][2];
    currentPrix += goodSlip.couleur2[customProdiut.cou2][2];
    currentPrix += goodSlip.motif[customProdiut.motif][1];
    currentPrix += goodSlip.qualiter[customProdiut.qualiter];
    currentPrix = Math.round(currentPrix*100)/100; //arrondie au centieme
    customProdiut.prix = currentPrix;
    prix.innerHTML = "Prix : "+ Math.round(currentPrix*customProdiut.quantiter*100)/100 + "€";//arrondie enoer parcque js ne sais pas multiplier par 3 ...
}

/*################################## canvas ########################################*/

function draw() {
    
    ctx1.globalCompositeOperation = "source-over"; //on repasse en mode dafficha par defaut
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height); //on efface tout
    ctx1.drawImage(imgSlip, 0, 0); //affiche l'image 
    ctx1.globalCompositeOperation = "source-in"; // mode d'affichage uniquement a l'intereur de l'image
    ctx1.fillStyle = "#ffffff"; // un cree un carre de la couleur voulue
    ctx1.fillRect(0, 0, canvas1.width, canvas1.height); // un remplit d'un carre de la couleur voulue

    ctx2.globalCompositeOperation = "source-over";
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    ctx2.drawImage(imgSlipInt, 0, 0);
    ctx2.globalCompositeOperation = "source-in";
    ctx2.fillStyle = goodSlip.couleur1[customProdiut.cou1][0];
    ctx2.fillRect(0, 0, canvas2.width, canvas2.height);

    ctx3.globalCompositeOperation = "source-over";
    ctx3.clearRect(0, 0, canvas3.width, canvas3.height);
    ctx3.drawImage(imgSlipMotif, 0, 0);
    ctx3.globalCompositeOperation = "source-in";
    ctx3.fillStyle = goodSlip.couleur2[customProdiut.cou2][0];
    ctx3.fillRect(0, 0, canvas3.width, canvas3.height);
}

/*################################## section prix ########################################*/

function sendToPanier(){
    customProdiut.img1 = canvas1.toDataURL();
    customProdiut.img2 = canvas2.toDataURL();
    customProdiut.img3 = canvas3.toDataURL();
    var panier = JSON.parse(localStorage["panier"]);
    panier.push(customProdiut);
    localStorage["panier"] = JSON.stringify(panier);
    console.log(localStorage);
    console.log(JSON.parse(localStorage["panier"]));

    document.location = "../panier/panier.html";
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

function hideAndSeek(vision) {
    lignes[2].style.transition = "height 0.5s, padding 0.5s";
    if (vision){
        lignes[2].style.height = lignes[1].clientHeight + "px";
        lignes[2].style.paddingTop = "1em";
        lignes[2].style.paddingBottom = "1em";
        lignes[2].style.overflow = "hidden";
        lignes[2].style.borderTop = "1px solid rgb(180, 180, 180)";
    }
    else {
        lignes[2].style.height = "0px";
        lignes[2].style.paddingTop = "0";
        lignes[2].style.paddingBottom = "0";
        lignes[2].style.overflow = "hidden";
        lignes[2].style.borderTop = "none";
        c2Func(0);
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
    draw()
}

function mFunc(x) {
    var cercleMotif = document.querySelectorAll(".cercleMotif");
    for (i of cercleMotif){
        i.style.borderColor = "white";
    }
    cercleMotif[x].style.borderColor = "steelblue";
    customProdiut.motif = x;
    if (x != 0){
        imgSlipMotif.src = goodSlip.imgSrc.replace(/.png/, " (" + (x + 1) + ").png");
        hideAndSeek(true);
    }
    else{
        imgSlipMotif.src = "";
        draw();
        hideAndSeek(false);
    }
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