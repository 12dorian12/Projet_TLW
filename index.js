/*################################## variable ########################################*/

var filterListe = document.querySelector("#filterListe");
var leMain = document.querySelector("main");
var leArticle = document.querySelector("article");

/*################################## fonction ########################################*/

function goToGoodBlock(e) {
    var goodBlock = e.target
    while (goodBlock.className != "blockSelection") {
        goodBlock = goodBlock.parentNode;
    }
    localStorage["slipType"] = goodBlock.id;
    document.location.href = "personnalisation/personnalisation.html";
}
function onResizeSetSize(e) {
    if(window.matchMedia("(min-width: 601px)").matches){
        filterListe.style.height = leMain.clientHeight+"px";
    }
    else{
        filterListe.style.height = "15vw"
    }
    for (const absoluteBox of document.querySelectorAll("absoluteBox")){
        absoluteBox.style.fontSize = absoluteBox.clientWidth/20+"px";
    }
}

/*################################## XMLHttpRequest ########################################*/

fetch("json/article.json")
.then((response) => response.json())
.then((articles)=>{
    for(var i=0; i<articles.slip.length; i++){
        var newSection = document.createElement("section");
        newSection.id = i;
        newSection.classList.add("blockSelection");

        var propHeigth = document.createElement("div");
        propHeigth.classList.add("propHeigth");

        var absoluteBox = document.createElement("div");
        absoluteBox.classList.add("absoluteBox");

        var imgDiv = document.createElement("div");
        var artImg = document.createElement("img");
        artImg.src = articles.slip[i].imgSrc;

        var titre2 = document.createElement("h2");
        var nameSpan = document.createElement("span");
        nameSpan.innerHTML = articles.slip[i].nom;

        var prixSpan = document.createElement("span");
        prixSpan.innerHTML = "prix : "+articles.slip[i].prix+"€";

        var commentaireSpan = document.createElement("span");
        commentaireSpan.innerHTML = articles.slip[i].commentaires[0];

        var buyBtn = document.createElement("div");
        buyBtn.classList.add("buyBtn");

        var bororo = document.createElement("div");
        bororo.classList.add("bororo");

        var rototo = document.createElement("div");
        rototo.classList.add("rototo");

        var achat = document.createElement("div");
        achat.classList.add("achat");
        achat.innerHTML = "Acheter"

        leArticle.appendChild(newSection);
        newSection.appendChild(propHeigth);
        propHeigth.appendChild(absoluteBox);
        absoluteBox.appendChild(imgDiv);
        imgDiv.appendChild(artImg);
        absoluteBox.appendChild(titre2);
        titre2.appendChild(nameSpan);
        absoluteBox.appendChild(prixSpan);
        absoluteBox.appendChild(buyBtn);
        buyBtn.appendChild(bororo);
        buyBtn.appendChild(rototo);
        buyBtn.appendChild(achat);

        newSection.addEventListener("click", goToGoodBlock);
        onResizeSetSize(); //sinon c'est on modifie la taille de larticle sens resize la fentre donc pas beau
    }
});
/* 
<section id="0" class="blockSelection">
    <div class="propHeigth">
        <div class="absoluteBox">
            <div>
                <img src="/principale/media/sousVetement/slipKangourou.png">
            </div>
            <h2>
                <span>Slip Kangourou</span>
            </h2>
            <span>prix : 19.99€</span>
            <div class="buyBtn">
                <div class="bororo"></div>
                <div class="rototo"></div>
                <div class="achat">Acheter</div>
            </div>
        </div>
    </div>
</section>
*/


/*################################## event ########################################*/

window.addEventListener("load", onResizeSetSize);
window.addEventListener("resize", onResizeSetSize);