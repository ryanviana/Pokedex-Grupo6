const pokeContainer = document.getElementById ('pokeContainer');
const pokeNumber = 150;

class PoketMonsterCard {
    constructor(name, image, type, id) {
        this.name = name;
        this.image = image;
        this.type = type;
        this.id = id;
    }
}

let pokemon = [];
let pokeNames = [];
let serverERROR = 0;
const fetchPoke = async () => {
    const promises = [];
    
    for (let i = 1; i <= pokeNumber; i++){
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }
    Promise.all(promises).then((results) => {
            results.map((result) => {
            const pname = result.name;
            const pimage = result.sprites['front_default'];
            const ptype = result.types.map((type) => type.type.name);
            const pid = result.id;
            pokemon.push(new PoketMonsterCard(pname, pimage, ptype, pid));
            console.log("Mochi mochi");
            });
            for(let i = 0; i < pokeNumber; i++) {
                pokeNames.push(pokemon[i].name);
            }
            console.log(pokeNames);
            pokeCard(pokemon, pokeNames);
    });
}

const pokeCard = (pokemon, desiredPokemons) => {
    const pokemonHTMLStringRaw = [];
    let printedCards = 0;
    for (let i = 0; i < pokeNumber; i++){
        if(desiredPokemons.includes(pokemon[i].name)) {
            pokemonHTMLStringRaw.push(buildCard(pokemon, i));
            printedCards++;
        }
    }
    if(printedCards == 0 && serverERROR == 0) {
        pokemonHTMLStringRaw.push(`<p class="errormessage"> Sorry!! We haven't found any Pokemon that matches your search!</p>`);
    }
    else {
        if(serverERROR == 1) {
            pokemonHTMLStringRaw.push(`<p class="errormessage"> Sorry!! We were unsuccessful in accessing the database of PokeAPI!</p>`);
        }
    }
    const pokemonHTMLStringFinal = pokemonHTMLStringRaw.join(' ');
    pokeContainer.innerHTML = pokemonHTMLStringFinal;
}

fetchPoke();