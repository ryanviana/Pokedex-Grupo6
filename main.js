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
        <li class="pokemon">
            <img src="${pokeman.image}"/>
            <h2>${pokeman.id} ${pokeman.name}</h2>
            <p>Type: ${pokeman.type}</p>
        </li>
    `
        )
        .join('');
    pokeContainer.innerHTML = pokemonHTMLString;
}

fetchPoke();

document.getElementsByClassName("card").addEventListener("click",click());

function click(){
    window.alert("deu certo");
}