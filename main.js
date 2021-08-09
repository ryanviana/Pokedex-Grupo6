const pokeContainer = document.getElementById ('pokeContainer');
const pokeNumber = 150;

const fetchPoke = async () => {
    const promises = [];
    for (let i = 1; i <= 150; i++){
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }
    Promise.all(promises).then((results) => {
        const pokemon = results.map((result) => ({
            name: result.name,
            image: result.sprites['front_default'],
            type: result.types.map((type) => type.type.name).join(', '),
            id: result.id
        }));
        pokeCard(pokemon);
    });
}

const pokeCard = (pokemon) => {
    const pokemonHTMLString = pokemon
        .map(
            (pokeman) => `
        <li onclick="openPokedex()" class="pokemon">
            <img id = "cards" src="${pokeman.image}" class="pokeimg"/>
            <h2 class="pokename">${pokeman.name} – <class="pokeid">${pokeman.id}</h2>
            <p>Type:</p> <p class="poketype">${pokeman.type}</p>
        </li>
    `
        )
        .join('');
    pokeContainer.innerHTML = pokemonHTMLString;
}

fetchPoke();

function openPokedex() {
    window.alert("poxa");
}