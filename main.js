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
            
            /* <<<<<<< HEAD =======  >>>>>>> 1d64f107fe9a34b55e5a355c76d802055f19716f*/
            
            <h2 class="pokeinfo">${pokeman.name}</h2> <h2 class="pokeinfo"> - </h2>
            <h2 class="pokeinfo">${pokeman.id}</h2>
            <p class="poketype">${pokeman.type}</p>

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