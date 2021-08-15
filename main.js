const searchWrapper = document.querySelector(".input");
const InputBox = searchWrapper.querySelector("input")

function beginWith(string ,query) {
    let len = query.length;
    let number_matches = 0;
    for(let i = 0; i < len; i++) {
        if(string[i] == query[i]) {
            number_matches++;
        }
    }
    if(number_matches == (len)) {
        return true;
    }
    else {
        return false;
    }
}

InputBox.onkeyup = (e)=>{
    let trainerData = e.target.value;
    let desiredPokemons = [];
    desiredPokemons = pokeNames.filter(poke => beginWith(poke, trainerData.toLowerCase()));
    pokeCard(pokemon, desiredPokemons);
}

// função ani() -> realiza a animação do icone da pokebola
function ani() {
    document.getElementById('img-pkb').className = 'pokebola';
}

function openPokedex(i) {
    window.open(`pokede-info.html?id=${i + 1}`, "_self");
}

function buildCard(pokemon, i) {
    const pokemonHTMLCardRaw = [];
    pokemonHTMLCardRaw.push(`
        <li onclick="openPokedex(${i})" class="pokemon">
        <img id = "cards" src="${pokemon[i].image}" class="pokeimg"/>
        <div class="divisor-cardpokemon"></div>
        <h2 class="pokeinfo">${capitalize(pokemon[i].name)} - ${pokemon[i].id}</h2>
        `);
    for(let j = 0; j < pokemon[i].type.length; j++) {
        pokemonHTMLCardRaw.push(`
            <div class="poketype ${pokemon[i].type[j]}">${pokemon[i].type[j]} </div>
        `);
    }
    pokemonHTMLCardRaw.push(`
            <br>
        </li>
    `)
    const pokemonHTMLCardFinal = pokemonHTMLCardRaw.join(' ');
    return pokemonHTMLCardFinal;
}

const capitalize = str => {
	if (typeof str !== 'string') {
		return '';
	}
	return str.charAt(0).toUpperCase() + str.substr(1);
}
