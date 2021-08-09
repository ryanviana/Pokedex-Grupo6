const pokeContainer = document.getElementById ('pokeContainer');
const pokeNumber = 150;

const getPoke = async id => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pokemon = await res.json();
    pokeCard (pokemon);
}

const pokeCard = (pokemon) => {
    const pokeElement = document.createElement('div');
    pokeElement.classList.add ('pokemon');
    const {id, name, sprites, types} = pokemon;
    const type = types[0].type.name;
    const pokeInnerHTML = `
        <div class="img-container">
            <img src="${sprites.front_default}" alt="${name}" />
        </div>
        <div class="info">
            <span class="number">${name}</span>
            <h3 class="name">${id}</h3>
            <small class="type">Type: <span>${type}</span></small>
        </div>`
    pokeElement.innerHTML = pokeInnerHTML;
        pokeContainer.appendChild (pokeElement);
}

const fetchPoke = async () => {
    for (let i = 1; i <= 150; i++){
        await getPoke (i);
    }
}

fetchPoke();