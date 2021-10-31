var panier = document.querySelector("#panier");
let template = document.querySelector("#panierListe");

fetch("../json/article.json")
.then((response) => response.json())
.then((articles)=>{
    for (const [index, calecon] of JSON.parse(localStorage["panier"]).entries() ){

        var goodSlip = articles.slip[parseInt(calecon.type)]

        let clone = document.importNode(template.content, true);
        clone.querySelector(".photo > img").src=goodSlip.imgSrc;
        clone.querySelector(".imgPoub > img").id="poubelleNum"+index;
        clone.querySelector(".nom").innerHTML=goodSlip.nom;
        clone.querySelector(".prix").innerHTML=calecon.prix;
        clone.querySelector("#poubelleNum"+index).onclick = (e) => {supprElem(e.target.id)};
        panier.appendChild(clone);
    }
});


function supprElem (id){
    idt = parseInt(""+id.match(/[0-9]/))
    var papa = JSON.parse(localStorage["panier"]);
    papa.splice(idt, 1);
    localStorage["panier"] = JSON.stringify(papa);
    location.reload();

}