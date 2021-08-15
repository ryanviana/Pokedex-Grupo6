const capitalize = str => {
	if (typeof str !== 'string') {
		return '';
	}
	return str.charAt(0).toUpperCase() + str.substr(1);
}

// função ani() -> realiza a animação do icone da pokebola
function ani() {
    document.getElementById('img-pkb').className = 'pokebola';
}

function numberFormater(number) {
    let outputNumber;
    if(number > 99) {
        return `${number}`;
    }
    else {
        if(number > 9){
            outputNumber = `0` + `${number}`;
            return outputNumber;
        }
        else {
            outputNumber = `00` + `${number}`;
            return outputNumber;
        }
    }
}

async function catchItemPhoto(url) {
    console.log(url);
    apiData = await fetchData(url);
    myItem = await apiData.json();
    
    console.log(myItem.sprites);
    return myItem.sprites.default;
}

async function catchPokeData(rawurl) {
    let modurl = rawurl.split("/");
    modurl[5] = "pokemon";
    const url = modurl.join("/");
    const apiData = await fetchData(url);
    const myPokemon = await apiData.json();
    
    const psprite =  myPokemon.sprites.front_default;
    const pname = myPokemon.species.name;
    const ptypes = []; 
    for(let i = 0; i < myPokemon.types.length; i++) {
        ptypes.push(myPokemon.types[i].type.name);
    }
    const pid = myPokemon.id;
    pokeJson = {
        "name" : pname,
        "image" : psprite,
        "type" : ptypes,
        "id" : pid
    }; 
    return pokeJson;
}

function openPokedex(id) {
    window.open(`pokede-info.html?id=${id}`, "_self");
}

function showEvolutionDetails(value) {
    let input = `${value}`;
    let firstEvo = parseInt(input[0]);
    if(input.length > 1) {
        let secEvo = parseInt(input[1]);
        console.log(theChain.evolves_to[firstEvo].evolves_to[secEvo].evolution_details);
    } else {
        console.log(theChain.evolves_to[firstEvo].evolution_details);
    }

}

async function buildTazo(pokemon, k) {
    const pokemonHTMLTazoRaw = [];
    pokemonHTMLTazoRaw.push(`
        <li class="pokeTazo">
            <img id = "tazo" src="${pokemon.image}" class="tazoImage" onclick="openPokedex(${pokemon.id})"/>
            <h2 class="pokeinfo-inner">${capitalize(pokemon.name)} - ${numberFormater(pokemon.id)}</h2>
        `);

    if(k != null) {
        pokemonHTMLTazoRaw.push(`
            <div class="evolution-details" type="button" onclick="showEvolutionDetails(${k})">Evolutions Deatils</div>
        `);
    }

    pokemonHTMLTazoRaw.push(`
            <br>
        </li>
    `);
    const pokemonHTMLTazoFinal = pokemonHTMLTazoRaw.join(' ');
    return pokemonHTMLTazoFinal;
}

async function loadEvolutionChain() {
    const firstColumn = document.getElementById('indexPokemon');
    const secondColumn = document.getElementById('firstEvolution');
    const thirdColumn = document.getElementById('secondEvolution');
    let firstEvolutionTazo = [];
    let secondEvolutionTazo = [];
    const indexPokemon = await catchPokeData(theChain.species.url);
    const indexPokemonTazo =  await buildTazo(indexPokemon, null);
    if(theChain.evolves_to != null) {
        for(let i = 0; i < theChain.evolves_to.length; i++) {
            const pokeFirstEvolution = theChain.evolves_to[i];
            const firstEvolution = await catchPokeData(pokeFirstEvolution.species.url);
            firstEvolutionTazo.push(await buildTazo(firstEvolution, i*10));
            if(pokeFirstEvolution.evolves_to != null) {
                for(let j = 0; j < pokeFirstEvolution.evolves_to.length; j++) {
                    const pokeSecondEvolution = theChain.evolves_to[i].evolves_to[j];
                    console.log(pokeSecondEvolution);
                    const secondEvolution = await catchPokeData(pokeSecondEvolution.species.url);
                    secondEvolutionTazo.push(await buildTazo(secondEvolution, (i*10 + j)));
                }
            }
        }
    }
    else{
        firstEvolutionTazo = `<div class="notEvolve">This Pokémon does not evolve</div>`;
    }

    firstColumn.innerHTML = indexPokemonTazo;
    secondColumn.innerHTML = firstEvolutionTazo;
    thirdColumn.innerHTML = secondEvolutionTazo;
}

/*`https://projectpokemon.org/images/normal-sprite/${pname}.gif`*/
async function model3dDebuger(errorurl) {
    let splitedUrl = errorurl.split("/");
    let dotGif = splitedUrl[5].split(".");
    let maybeTheCorectName;
    try {
        maybeTheCorectName = dict3dSprites[`${dotGif[0]}`];
    }
    catch {
        maybeTheCorectName = dotGif[0];
    }
    dotGif[0] = maybeTheCorectName;
    splitedUrl[5] = dotGif.join(".");
    const newUrl = splitedUrl.join("/");
    return newUrl;
}

async function callMe() {
    const oldGifUrl = thePokemon[0].image3d;
    thePokemon[0].image3d = await model3dDebuger(thePokemon[0].image3d);
    if(oldGifUrl == thePokemon[0].image3d) {
        pokedexPage1(thePokemon, 1);
    }
    else {
        pokedexPage1(thePokemon, 0);
    }
}
function pokedexPage1(pokemon, faildOnce) {
    if(thePokemon[0].name == undefined) {
        thePokemon = pokemon;
    }
    const pokedexPage1HTML = [];
    const button2HTML = [];
    let modelOnDisplay = thePokemon[0].image3d;
    if(faildOnce) {
        modelOnDisplay = thePokemon[0].image;
    }

    pokedexPage1HTML.push(`
        <div class="titleBar"> ${capitalize(thePokemon[0].name)} - Nº${numberFormater(idFound)}</div>
        <div class="pokeModel">    
            <img class="image-3DPokemon" src="${modelOnDisplay}" alt="this ${thePokemon[0].name} moves" onerror="callMe()"/>
        </div>
        <div class="pokemonsDescription">
            <p class="pokeText">${thePokemon[0].info}</p>
        </div>
        <div class="darkRetangle">
            <p>Height: ${thePokemon[0].height}m</p>
            <p>Weight: ${thePokemon[0].weight}kg</p>
            <p>Abilities: ${thePokemon[0].abilities}</p>
        </div>

    `);
    button2HTML.push(`
        <li onclick="pokedexPage2()">
            <div class="button2" type="button" onclick="buttonSound.play();"></div>
        </li>
    `);
    displayRight.innerHTML = button2HTML;
    displayLeft.innerHTML = '';
    ecra.innerHTML = pokedexPage1HTML;
}

function alertStatusName(i) {
    window.alert(capitalize(thePokemon[0].nameStat[i]));
}

/*
Statuses
<p>${capitalize(thePokemon[0].nameStat[0])}: ${thePokemon[0].stats[0]}</p>
        <p>${capitalize(thePokemon[0].nameStat[1])}: ${thePokemon[0].stats[1]}</p>
        <p>${capitalize(thePokemon[0].nameStat[2])}: ${thePokemon[0].stats[2]}</p>
        <p>${capitalize(thePokemon[0].nameStat[3])}: ${thePokemon[0].stats[3]}</p>
        <p>${capitalize(thePokemon[0].nameStat[4])}: ${thePokemon[0].stats[4]}</p>
*/
function pokedexPage2() {
    const pokedexPage2HTML = [];
    const button1HTML = [];
    const button3HTML = [];
    pokedexPage2HTML.push(`
    <div class="nameNote">${capitalize(thePokemon[0].name)} - Nº${numberFormater(idFound)}</div>
    <div class="statusTable">Statuses
        <div class="columnBar" style="height: ${(thePokemon[0].stats[0]/ 180) * 260}px; margin-left : 8%">${thePokemon[0].stats[0]}</div>
        <div class="columnBar" style="height: ${(thePokemon[0].stats[1]/ 180) * 260}px; margin-left : 26%">${thePokemon[0].stats[1]}</div>
        <div class="columnBar" style="height: ${(thePokemon[0].stats[2]/ 180) * 260}px; margin-left : 44%">${thePokemon[0].stats[2]}</div>
        <div class="columnBar" style="height: ${(thePokemon[0].stats[3]/ 180) * 260}px; margin-left : 62%">${thePokemon[0].stats[3]}</div>
        <div class="columnBar" style="height: ${(thePokemon[0].stats[4]/ 180) * 260}px; margin-left : 80%">${thePokemon[0].stats[4]}</div>
        <div class="columnBarName" style="margin-left : 8%" onclick="alertStatusName(0)">Hp</div>
        <div class="columnBarName" style="margin-left : 26%" onclick="alertStatusName(1)">Atk</div>
        <div class="columnBarName" style="margin-left : 44%" onclick="alertStatusName(2)">Dfs</div>
        <div class="columnBarName" style="margin-left : 62%" onclick="alertStatusName(3)">SAtk</div>
        <div class="columnBarName" style="margin-left : 80%" onclick="alertStatusName(4)">SDfs</div>
    </div>
    <div class="typesNdWeaknesses">Types and Weaknesses
        <p>Types: ${thePokemon[0].type}</p>
        <p>Weakness: ${thePokemon[0].weakness} </p>
    </div>
    <div class="damageWhenAttacked">Dammage when Attacked
        <p>Double Damage: ${thePokemon[0].weakness}</p>
        <p>Half Damage: ${thePokemon[0].halfDamage}</p>
        <p>No Damage: ${thePokemon[0].noDamage}</p>
    </div>
    `);
    button1HTML.push(`
        <div onclick="pokedexPage1()">
            <div class="button1" type="button" onclick="buttonSound.play();"></div>
        </div>
    `);
    button3HTML.push(`
        <div onclick="pokedexPage3()">
            <div class="button3" type="button" onclick="buttonSound.play();"></div>
        </div>
    `);
    displayLeft.innerHTML = button1HTML;
    displayRight.innerHTML = button3HTML;
    ecra.innerHTML = pokedexPage2HTML;
}

function pokedexPage3(pokemon) {
    const pokedexPage3HTML = [];
    const button4HTML = [];
    pokedexPage3HTML.push(`
    <div class="evolution-page">
    <div class="evolutionPanel">
        <div class="arrow1" ></div>
        <div class="arrow2"></div>
        <div class="Column-ev left" id="indexPokemon"></div>
        <div class="Column-ev middle" id="firstEvolution"></div>
        <div class="Column-ev right" id="secondEvolution"></div>
    </div>
    </div>
    <div class="titleBar">
        ${capitalize(thePokemon[0].name)} - Nº${numberFormater(idFound)}
    </div>

    `);
    button4HTML.push(`
        <div onclick="pokedexPage2()">
            <div class="button4" type="button"  onclick="buttonSound.play();"></div>
        </div>
    `);
    displayLeft.innerHTML = button4HTML;
    displayRight.innerHTML = '';
    ecra.innerHTML = pokedexPage3HTML;
    loadEvolutionChain();
}

// audio do botão da pokedex
const buttonSound = new Audio();
buttonSound.src = "./audios/sound-click.wav";
buttonSound.volume = 0.28;