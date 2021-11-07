/*################################## variable ########################################*/

var filterListe = document.querySelector("#filterListe");
var leMain = document.querySelector("main");
var laSection = document.querySelector("section");
var sectionTemplate = document.querySelector("#sectionTemplate");

/*################################## fonction ########################################*/

function goToGoodBlock(e) {
    var goodBlock = e.target
    while (goodBlock.className != "blockSelection") {
        goodBlock = goodBlock.parentNode;
    }
    localStorage["slipType"] = goodBlock.id;
    document.location.href = "/12dorian12.github.io/personnalisation/personnalisation.html";
}
function listSelect(index) {
    var listeLi = document.querySelectorAll(".listeLi")
    if (index != -1){
        localStorage["filtre"] = index
        document.location = ""
    }
    else{
        index = localStorage["filtre"]
    }
    for ([i, val] of listeLi.entries()){
        if (i == index){
            val.style.fontWeight = 'bold';
            val.style.listStyleType = "disc";
        }
        else{
            val.style.fontWeight = 'normal';
            val.style.listStyleType = "circle";
        }
    }
}
function fonOpenFilter(){
    var openFilter = document.querySelector("#openFilter")
    if (openFilter.style.transform == "rotate(180deg)"){
        document.querySelector("#filterListe").style.height = "80px"
        document.querySelector("#openFilter").style.transform = "rotate(0deg)";
    }
    else{
        document.querySelector("#filterListe").style.height = "300px"
        document.querySelector("#openFilter").style.transform = "rotate(180deg)";
    }
}

/*################################## XMLHttpRequest ########################################*/

fetch("json/article.json")
.then((response) => response.json())
.then((articles)=>{
    for([i, art] of articles.slip.entries()){
        if (art.filtre.includes(parseInt(localStorage["filtre"]))){
            var currentSection = document.importNode(sectionTemplate.content, true);

            currentSection.querySelector(".blockSelection").id = i;
            currentSection.querySelector(".blockSelection").addEventListener("click", goToGoodBlock);
            currentSection.querySelector(".absoluteBox > div > img").src = art.imgSrc;
            currentSection.querySelector(".absoluteBox > h2 > span").innerHTML = art.nom;
            currentSection.querySelector(".absoluteBox > span").innerHTML = "prix : "+art.prix+"€";
            var com = "<ul>"
            for (ligneCom of art.commentaires){
                com += "<li>"+ligneCom+"</li>"
            }
            com += "</ul>"
            currentSection.querySelector(".commentaires").innerHTML = com;

            laSection.appendChild(currentSection);
        }
    }
});
