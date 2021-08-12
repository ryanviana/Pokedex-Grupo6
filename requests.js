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
    for (let i = 0; i < pokeNumber; i++){
        if(desiredPokemons.includes(pokemon[i].name)) {
            pokemonHTMLStringRaw.push(buildCard(pokemon, i));
        }
    }
    const pokemonHTMLStringFinal = pokemonHTMLStringRaw.join(' ');
    pokeContainer.innerHTML = pokemonHTMLStringFinal;
}

fetchPoke();