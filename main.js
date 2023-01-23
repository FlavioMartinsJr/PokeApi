// consultas da api
const nomePokemonApi = document.querySelector("#nomePokemon");
const imagePokemonApi = document.querySelector("#imgPokemon");
//objetos do user
const btnResetar = document.querySelector("#trocar-Pokemon");
const btnHelp = document.querySelector("#help");
const btnConfirmar = document.querySelector("#btnConfirmar");
const btnResposta = document.querySelector("#btnResposta");
//gera html
const htmlGeracao = document.getElementById("geracaoPokemon");
// pesquisa do user
const input = document.querySelector("#nome-Pokemon");
//todos pokemons disponiveis 
const pokemonRando = pokemonRandoGeracao(pokemonRandomRange(1,898));
console.log("---joguino hulmides---pt-br");
function pegarValorCheckbox(){
    var array = [];
    for(let j = 0; j < 8;j++){
        if(localStorage.getItem('checkbox'+j) == null){
            array[j] = 'false';
        }else{
            array[j] = localStorage.getItem("checkbox"+j);    
        }
    }
    return array;
}
function validarRange(numero, rangeMin, rangeMax){
    var result = false;
    if(numero >= rangeMin && numero <= rangeMax ){
        result = true;
    }
    return result;
}
function pokemonRandoGeracao(numero){
    const geracao = {
        index: [0,1,2,3,4,5,6,7],
        rangeMax: [151,251,386,493,649,722,809,898],
        rangeMin: [1,152,252,387,494,650,723,810],
    }
    let cont = 0
    let validar = false;
    var array = pegarValorCheckbox();
    for (let k = 0; k < array.length; k++) {
        if(array[k] === 'true'){
            cont++;
            validar = validarRange(numero,geracao.rangeMin[k],geracao.rangeMax[k])
            if(validar === true){
                break;
            } 
        }
    }
    if(cont < 1){
        numero = pokemonRandomRange(1,151);
    }else if(validar === false){
        return pokemonRandoGeracao(pokemonRandomRange(1,898));
    }
    return numero;
}    

function pokemonRandomRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);  
}

function acertarPokemon(){
    swal({
        title: "Parabens!",
        text: "Você acertou o pokemon confirme \n para jogar novamente!",
        icon: "success",
        buttons: {
            cancel: "Cancelar",
            confirm: "Confirmar",
        },
    }).then((validar) =>{
        if(validar){
            window.location.reload();
        }
    }); 
}

function reloandPokemon(pokemonAleatorio){
    const pokemon = localStorage.getItem("id");
    if(pokemon === null){
        localStorage.setItem("id",pokemonAleatorio);
    }else{
        return;
    }
}

function dicaPokemon(dica){
    for(let i = 2; i <= dica.length;i +=1){
        if(i % 2 !== 0){
            if(dica[i] === "-"){
                dica = dica.replace(dica[i], "-");
            }else{
                dica = dica.replace(dica[i], "_"); 
            }
        }
    }
    return dica;
}

function validarPokemon(pokemon){
    if(imagePokemonApi.style.filter === "invert(0)"){
        window.location.reload();
        return;
    }else if(pokemon === pokemonAdivinhar){
        imagePokemonApi.style.filter = "invert(0)";
        nomePokemonApi.innerHTML = pokemonAdivinhar;
        localStorage.removeItem("id");
        reloandPokemon(pokemonRando);
        acertarPokemon();
    }else{
        input.value = "";
    }
}

function resetarPokemon(){
    swal({
        title: "Aviso!",
        text: "Você gostaria de troca o pokemon?",
        icon: "warning",
        buttons: {
            cancel: "Cancelar",
            confirm: "Confirmar",
        },
    }).then((confirmar) =>{
        if(confirmar){
            localStorage.removeItem("id");
            reloandPokemon(pokemonRando);
            window.location.reload();
        }
    });   
}

function gerarHtml(){
    const romanos = ['I','II','III','IV','V','VI','VII','VIII'];
    const imagemSrc = ['./src/img/geracao/chamander.png','./src/img/geracao/tortodile.png','./src/img/geracao/trico.png','./src/img/geracao/tintar.png','./src/img/geracao/snive.png','./src/img/geracao/frog.png','./src/img/geracao/lintelem.png','./src/img/geracao/staburn.png'];
    for (let i = 0; i < 8; i++) {
        const label = document.createElement('label');
        const input = document.createElement('input');
        const p = document.createElement('p');
        const img = document.createElement('img');
        input.value = "false";
        input.type = 'checkbox';
        input.checked = false
        input.className = 'geracao';
        p.textContent = 'Geração - '+romanos[i];
        img.src = ''+imagemSrc[i];
        [input, p, img].forEach((node) => label.appendChild(node));
        htmlGeracao.appendChild(label);
    }
    atribuirStatusCheckbox();
    verificarStatusCheckbox();
    return htmlGeracao;
}

function informacaoPokemon(){
    swal({
        title: "Informe a Geração para Jogar!",
        content: gerarHtml(),
    }).then(() =>{
        validarCheckbox();
        localStorage.removeItem("id");
        reloandPokemon(pokemonRandoGeracao(pokemonRandomRange(1,898)));
        window.location.reload();
    });   
}

function verificarStatusCheckbox(){
    const itens = document.querySelectorAll('.geracao');
    for(let j = 0; j < itens.length;j++){
        if(itens[j].value === "true"){
            itens[j].checked = true;
        }else{
            itens[j].checked = false;
        }
    }
}

function validarCheckbox(){
    const itens = document.querySelectorAll('.geracao');
    var array = [];
    for(let i = 0; i < itens.length; i++){
        if(itens[i].checked === true){
            itens[i].value = 'true'
        }else{
            itens[i].value = 'false'
        }
        array.push(itens[i].value);
    }
    for(let j = 0; j < array.length;j++){
        localStorage.removeItem("checkbox"+j);
        localStorage.setItem("checkbox"+j, array[j]);    
    }
}

function atribuirStatusCheckbox(){
    const itens = document.querySelectorAll('.geracao');
    var array = pegarValorCheckbox();
    let aux = 0;
    for (let k = 0; k < array.length; k++) {
        if(array[k] === 'false'){
            aux++;
        }
    }
    if(aux === 8){
        array[0] = 'true';
    }
    for(let i = 0; i < array.length; i++){
        itens[i].value = array[i];
    }
}

//guardar o nome do pokemon sem alterações
var pokemonAdivinhar;
const fetchPokemon = async (pokemon) => {
    const APIresponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const data = await APIresponse.json();
    const pokemonEscondido = await data.name;
    pokemonAdivinhar = pokemonEscondido;
    nomePokemonApi.innerHTML = dicaPokemon(pokemonEscondido);
    imagePokemonApi.src = data['sprites']['versions']['generation-v']['black-white']['front_default'];
}
btnConfirmar.addEventListener('click', (event) => {
    event.preventDefault();
    validarPokemon(input.value.toLowerCase());
})
btnResposta.addEventListener('click' , (event) =>{
    event.preventDefault();
    validarPokemon(pokemonAdivinhar);
})
btnResetar.addEventListener('click', (event) =>{
   event.preventDefault();
   resetarPokemon();
})
btnHelp.addEventListener('click', (event) =>{
    event.preventDefault();
    informacaoPokemon();
})
// função para sempre inicial com algum pokemon
reloandPokemon(pokemonRando);
fetchPokemon(localStorage.getItem("id"));