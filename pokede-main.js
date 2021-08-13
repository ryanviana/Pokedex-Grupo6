function pokedexPage1(pokemon) {
    if(thePokemon[0].name == undefined) {
        thePokemon = pokemon;
    }
    const pokedexPage1HTML = [];
    const button2HTML = [];
    pokedexPage1HTML.push(`
        <img src="${thePokemon[0].image3d}" alt="this ${thePokemon[0].name} moves"/>
    `);
    button2HTML.push(`
        <li onclick="pokedexPage2()">
            <div class="button2" type="button"></div>
        </li>
    `);
    displayRight.innerHTML = button2HTML;
    displayLeft.innerHTML = '';
    ecra.innerHTML = pokedexPage1HTML;
}

function pokedexPage2() {
    const pokedexPage2HTML = [];
    const button1HTML = [];
    const button3HTML = [];
    pokedexPage2HTML.push(`
    <div class="titlebar"> PAGE 2</div>
    `);
    button1HTML.push(`
        <li onclick="pokedexPage1()">
            <div class="button1" type="button"></div>
        </li>
    `);
    button3HTML.push(`
        <li onclick="pokedexPage3()">
            <div class="button3" type="button"></div>
        </li>
    `);
    displayLeft.innerHTML = button1HTML;
    displayRight.innerHTML = button3HTML;
    ecra.innerHTML = pokedexPage2HTML;
}

function pokedexPage3(pokemon) {
    const pokedexPage3HTML = [];
    const button4HTML = [];
    pokedexPage3HTML.push(`
    <div class="titlebar"> PAGE 3</div>
    `);
    button4HTML.push(`
        <li onclick="pokedexPage2()">
            <div class="button4" type="button"></div>
        </li>
    `);
    displayLeft.innerHTML = button4HTML;
    displayRight.innerHTML = '';
    ecra.innerHTML = pokedexPage3HTML;
}
