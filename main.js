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
    const pokemonHTMLString = [];
    for (let i = 0; i < 150; i++){
        if (pokemon[i].type[1] == undefined){
            pokemonHTMLString.push (`
            <li onclick="openPokedex(${i})" class="pokemon">
                <img id = "cards" src="${pokemon[i].image}" class="pokeimg"/>
                <h2 class="pokeinfo">${pokemon[i].name} - ${pokemon[i].id}</h2
                <br>
                <div class="poketype">
                    <div class="${pokemon[i].type[0]}">
                        <p> ${pokemon[i].type [0]} </p>
                    </div>
                </div>
            </li>
            `)
        }
        else {
            pokemonHTMLString.push (`
            <li onclick="openPokedex(${i})" class="pokemon">
                <img id = "cards" src="${pokemon[i].image}" class="pokeimg"/>
                <h2 class="pokeinfo">${pokemon[i].name} - ${pokemon[i].id}</h2>
                <br>
                <div class="poketype">
                    <div class="${pokemon[i].type[0]}">
                        <p> ${pokemon[i].type [0]} </p>
                    </div>
                    <div class="${pokemon[i].type[1]}">
                        <p>${pokemon[i].type[1]}</p>
                    </div>
                </div>
            </li>
            `)
        }
    }
    pokeContainer.innerHTML = pokemonHTMLString;
}

// função ani() -> realiza a animação do icone da pokebola
function ani() {
    document.getElementById('img-pkb').className = 'pokebola';
}


fetchPoke();

function openPokedex(i) {
    window.alert(i);
}
