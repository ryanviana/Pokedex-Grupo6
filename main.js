const pokeContainer = document.getElementById ('pokeContainer');
const pokeNumber = 150;

const fetchPoke = async () => {
    const promises = [];
    
    for (let i = 1; i <= pokeNumber; i++){
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }
    Promise.all(promises).then((results) => {
        const pokemon = results.map((result) => ({
            name: result.name,
            image: result.sprites['front_default'],
            type: result.types.map((type) => type.type.name),
            id: result.id
        }));
        pokeCard(pokemon);
    });
}

const pokeCard = (pokemon) => {
    const pokemonHTMLStringRaw = [];
    for (let i = 0; i < pokeNumber; i++){
        pokemonHTMLStringRaw.push(buildCard(pokemon, i));
    }
    const pokemonHTMLStringFinal = pokemonHTMLStringRaw.join(' ');
    pokeContainer.innerHTML = pokemonHTMLStringFinal;
}

// função ani() -> realiza a animação do icone da pokebola
function ani() {
    document.getElementById('img-pkb').className = 'pokebola';
}


fetchPoke();

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
}

function buildCard(pokemon, i) {
    const pokemonHTMLCardRaw = [];
    pokemonHTMLCardRaw.push(`
        <li onclick="openPokedex(${i})" class="pokemon">
        <img id = "cards" src="${pokemon[i].image}" class="pokeimg"/>
        <h2 class="pokeinfo">${pokemon[i].name} - ${pokemon[i].id}</h2>
        <br>
        <div class="poketype">
        `);
    for(let j = 0; j < pokemon[i].type.length; j++) {
        pokemonHTMLCardRaw.push(`
            <div class="${pokemon[i].type[j]}">
                <p> ${pokemon[i].type[j]} </p>
            </div>
        `);
    }
    pokemonHTMLCardRaw.push(`
            </div>
        </li>
    `)
    const pokemonHTMLCardFinal = pokemonHTMLCardRaw.join(' ');
    return pokemonHTMLCardFinal;
}