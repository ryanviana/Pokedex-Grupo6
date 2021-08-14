const capitalize = str => {
	if (typeof str !== 'string') {
		return '';
	}
	return str.charAt(0).toUpperCase() + str.substr(1);
}

// função ani() -> realiza a animação do icone da pokebola
function ani() {
    document.getElementById('img-pkb').className = 'pokebola';
}

function numberFormater(number) {
    let outputNumber;
    if(number > 99) {
        return `${number}`;
    }
    else {
        if(number > 9){
            outputNumber = `0` + `${number}`;
            return outputNumber;
        }
        else {
            outputNumber = `00` + `${number}`;
            return outputNumber;
        }
    }
}

function pokedexPage1(pokemon) {
    if(thePokemon[0].name == undefined) {
        thePokemon = pokemon;
    }
    const pokedexPage1HTML = [];
    const button2HTML = [];
    pokedexPage1HTML.push(`
        <div class="titleBar"> ${capitalize(thePokemon[0].name)} - Nº${numberFormater(idFound)}</div>

        <div class="pokeModel">    
            <img class="image-3DPokemon" src="${thePokemon[0].image3d}" alt="this ${thePokemon[0].name} moves"/>
        </div>
        <div class="pokemonsDescription">
            <p class="pokeText">Here will be the pokemon's description</p>
        </div>
        <div class="darkRetangle">I don't remember what we decided to put here, sorry</div>

    `);
    button2HTML.push(`
        <li onclick="pokedexPage2()">
            <div class="button2" type="button"></div>
        </li>
    `);
    displayRight.innerHTML = button2HTML;
    displayLeft.innerHTML = '';
    ecra.innerHTML = pokedexPage1HTML;
}

function pokedexPage2() {
    const pokedexPage2HTML = [];
    const button1HTML = [];
    const button3HTML = [];
    pokedexPage2HTML.push(`
    <div class="nameNote">${capitalize(thePokemon[0].name)} - Nº${numberFormater(idFound)}</div>
    <div class="statusTable">Statuses</div>
    <div class="typesNdWeaknesses">Types and Weaknesses</div>
    <div class="damageWhenAttacked">Dammage when Attacked</div>
    `);
    button1HTML.push(`
        <li onclick="pokedexPage1()">
            <div class="button1" type="button"></div>
        </li>
    `);
    button3HTML.push(`
        <li onclick="pokedexPage3()">
            <div class="button3" type="button"></div>
        </li>
    `);
    displayLeft.innerHTML = button1HTML;
    displayRight.innerHTML = button3HTML;
    ecra.innerHTML = pokedexPage2HTML;
}

function pokedexPage3(pokemon) {
    const pokedexPage3HTML = [];
    const button4HTML = [];
    pokedexPage3HTML.push(`
    <li class="evolution-page" onload="loadEvolutionChain()">
    <div class="evolutionPanel">
        <div class="arrow1"></div>
        <div class="arrow2"></div>
        <div class="leftColumn" id="indexPokemon"></div>
        <div class="midleColumn" id="firstEvolution"></div>
        <div class="rightColumn" id="secondEvolution"></div>
    </div>
    </li>
    <div class="titleBar">
        ${capitalize(thePokemon[0].name)} - Nº${numberFormater(idFound)}
    </div>

    `);
    button4HTML.push(`
        <li onclick="pokedexPage2()">
            <div class="button4" type="button"></div>
        </li>
    `);
    displayLeft.innerHTML = button4HTML;
    displayRight.innerHTML = '';
    ecra.innerHTML = pokedexPage3HTML;
}
