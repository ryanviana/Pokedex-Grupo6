/**<div class="bt-direita" type="button"></div>
        <div class="bt-esquerda" type="button"></div>**/

const button1 = document.querySelector('.button1');
const  button2  = document.querySelector('.button2');
const button3 = document.querySelector('.button3');
const button4 = document.querySelector('.button4');

button1.onclick = function(){
    pokedexPage1(thePokemon);
}

button2.onclick = function(){
    pokedexPage2(thePokemon);
}

button3.onclick = function(){
    pokedexPage3(thePokemon);
}

button4.onclick = function(){
    pokedexPage2(thePokemon);
}

function pokedexPage1(pokemon) {
    const pokedexPage1HTML = [];
    const button2HTML = [];
    pokedexPage1HTML.push(`
    
    `);
    displayRight.innerHTML;
    ecra.innerHTML = pokedexPage1HTML;
}

function pokedexPage2(pokemon) {
    const pokedexPage2HTML = [];
    const button1HTML = [];
    const button3HTML = [];
    pokedexPage2HTML.push(`
    
    `);
    displayLeft.innerHTML;
    displayRight.innerHTML;
    ecra.innerHTML = pokedexPage2HTML;
}

function pokedexPage3(pokemon) {
    const pokedexPage3HTML = [];
    const button4HTML = [];
    pokedexPage3HTML.push(`
    
    `);
    displayLeft.innerHTML;
    ecra.innerHTML = pokedexPage3HTML;
}
