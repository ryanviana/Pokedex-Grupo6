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
    console.log(desiredPokemons);
    pokeCard(pokemon, desiredPokemons);
}

// função ani() -> realiza a animação do icone da pokebola
function ani() {
    document.getElementById('img-pkb').className = 'pokebola';
}

function openPokedex(i) {
    promises=[];
    id = i+1;
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    promises.push(fetch(url).then((res) => res.json()));

    Promise.all(promises).then((results) => {
        const pokemon = results.map((result) => ({
            name: result.name,
            image: result.sprites['front_default'],
            type: result.types.map((type) => type.type.name),
            id: result.id,
            height: (result.height)/10,
            weight: (result.weight)/10,
            stats: result.stats,
            ability: result.abilities.map((ability) => ability.ability.name)
        }));
    });
    window.open(`pokede-info.html?id=${id}`, "_self");

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
