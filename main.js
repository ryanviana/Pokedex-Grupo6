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
            type: result.types.map((type) => type.type.name),
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
            <h2 class="pokeinfo">${pokeman.name} - ${pokeman.id}</h2
            <br>
            <p class="poketype">${pokeman.type [0]}</p>
        </li>
         `
        )
        .join('');
    pokeContainer.innerHTML = pokemonHTMLString;
}
// função ani() -> realiza a animação do icone da pokebola
function ani() {
    document.getElementById('img-pkb').className = 'pokebola';
}


fetchPoke();

function openPokedex() {
    window.alert("poxa");
}