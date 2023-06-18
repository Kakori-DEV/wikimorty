let pageIndex = 1;
var favoritos = [];

const buscaInfosLista = async () => {
    const response = await fetch('https://rickandmortyapi.com/api/character/'+localStorage.getItem('lista'));
    listaJson = await response.json();
    console.log('ta rolando')
    const modalContent = document.getElementsByClassName("modal-content");
    modalContent.item(0).innerHTML = '';
    for (var i = 0; i < listaJson.length; i++) {
        const img = document.createElement("img");
        img.setAttribute('src', listaJson[i].image);
        modalContent.item(0).appendChild(img);
    }
}

window.addEventListener("load", async (event) => {
    await buscaInfosLista();
});

const userAction = async (i) => {
    const response = await fetch('https://rickandmortyapi.com/api/character/?page='+i);
    const myJson = await response.json();

    const ul = document.createElement("ul")
    ul.className = 'lista';
    
    const divBody = document.getElementsByClassName("lista-personagens");

    for (var i = 0; i < 19; i++) {
        const li = document.createElement("li")
        li.innerText = myJson.results[i].name;
        li.setAttribute('onclick', "showBlock("+myJson.results[i].id+")");
        li.style.cursor = 'pointer';
        ul.appendChild(li);
    }

    divBody.item(0).appendChild(ul);
}

const showBlock = async (id) => {
    const response = await fetch('https://rickandmortyapi.com/api/character/'+id);
    const myJson = await response.json();

    const h2 = document.getElementsByTagName("h2");
    h2.item(0).textContent = myJson.name;
    h2.item(0).style.display = 'block';

    var opacity = 0;
    const img = document.getElementsByClassName("image-persongem");
    img.item(0).setAttribute('src', myJson.image);
    img.item(0).style.opacity = opacity;
    img.item(0).style.display = 'block';
    var intervalID = setInterval(function() {
          
        if (opacity < 1) {
            opacity = opacity + 0.1
            img.item(0).style.opacity = opacity;
        } else {
            clearInterval(intervalID);
        }
    }, 100);
    var tamanho = 200;
    var right = 100;
    var top = 70;
    img.item(0).addEventListener(
        "mouseenter",
        (event) => {
            var intervalID = setInterval(function() {
                if (tamanho < 250) {
                    tamanho = tamanho + 2
                    right = right - 1.1
                    top = top - 1.1
                    event.target.style.top = top+"px";
                    event.target.style.right = right+"px";
                    event.target.style.width = tamanho+"px";
                    event.target.style.height = tamanho+"px";
                } else {
                    clearInterval(intervalID);
                }
            }, 3);
        },
        false
      );
      img.item(0).addEventListener(
        "mouseleave",
        (event) => {
            var intervalID = setInterval(function() {
                if (tamanho > 200) {
                    tamanho = tamanho - 2
                    right = right + 1.1
                    top = top + 1.1
                    event.target.style.top = top+"px";
                    event.target.style.right = right+"px";
                    event.target.style.width = tamanho+"px";
                    event.target.style.height = tamanho+"px";
                } else {
                    clearInterval(intervalID);
                }
            }, 5);
        },
        false
    );

    const btn = document.getElementsByClassName("btn-favoritar");
    btn.item(0).setAttribute("onclick", "favoritar("+ myJson.id +")");
    btn.item(0).style.display = 'inline';

    const btn2 = document.getElementsByClassName("btn-salvar");
    btn2.item(0).setAttribute("onclick", "salvarFavoritos()");
    btn2.item(0).style.display = 'inline';
}

const proximaPagina = async () => {
    if(pageIndex == 1){
        const voltarPaginaButtonDisabled = document.getElementsByClassName("voltar-pagina-disabled");
        voltarPaginaButtonDisabled.item(0).style.display = 'none';
    }
    const voltarPaginaButton = document.getElementsByClassName("voltar-pagina");
    voltarPaginaButton.item(0).style.display = 'inline';
    const list = document.getElementsByClassName("lista");
    list.item(0).remove();
    pageIndex++;
    userAction(pageIndex);
}
const voltarPagina = async () => {
    if(pageIndex > 2){
        const list = document.getElementsByClassName("lista");
        list.item(0).remove();
        pageIndex--;
        userAction(pageIndex);
    }
    else{
        const list = document.getElementsByClassName("lista");
        list.item(0).remove();
        pageIndex--;
        userAction(pageIndex);
        const voltarPaginaButton = document.getElementsByClassName("voltar-pagina");
        voltarPaginaButton.item(0).style.display = 'none';
        const voltarPaginaButtonDisabled = document.getElementsByClassName("voltar-pagina-disabled");
        voltarPaginaButtonDisabled.item(0).style.display = 'inline';
    }
}

function favoritar(id){
    if(favoritos < 1){
        favoritos.push(0);
    }
    
    if(!favoritos.includes(id)){
        favoritos.push(id);
        const divListaPreSave = document.getElementsByClassName("lista-pre-save");
        divListaPreSave.item(0).style.display = 'block';
        const imgPersonagem = document.getElementsByClassName("image-persongem");
        const imgUrl = imgPersonagem.item(0).getAttribute('src');
        const imgOnList = document.createElement("img");
        imgOnList.setAttribute('src', imgUrl);
        divListaPreSave.item(0).appendChild(imgOnList);
    }else{
        console.log('O personagem já está na lista');
    }
}

function salvarFavoritos(){
    localStorage.setItem('lista',favoritos)
    console.log(localStorage.getItem('lista'));
    buscaInfosLista();
    alert('Lista salva com sucesso!'+favoritos);
}

const abrirModal = async(modalName) =>{
    const response = await fetch('https://rickandmortyapi.com/api/character/'+favoritos);
    const myJson = await response.json(); //extract JSON from the http response
    console.log(myJson);

    const modal = document.getElementById("modal");
    const modalContent = document.getElementsByClassName(modalName);
    console.log(modalContent)
    modal.style.display = 'block';  
    modalContent.item(0).style.display = 'block';  

}

function fecharModal(modalName){
    const modal = document.getElementById("modal");

    modal.style.display = 'none';
}