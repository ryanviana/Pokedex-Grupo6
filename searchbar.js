const pokeNames = ["bulbasaur", "ivysaur", "venusaur", "charmander", "charmeleon", "charizard", "squirtle", "wartortle", 
"blastoise", "caterpie", "metapod", "butterfree", "weedle", "kakuna", "beedrill", "pidgey", "pidgeotto", "pidgeot", "rattata", 
"raticate", "spearow", "fearow", "ekans", "arbok", "pikachu", "raichu", "sandshrew", "sandslash", "nidoran-f", "nidorina", "nidoqueen", 
"nidoran-m", "nidorino", "nidoking", "clefairy", "clefable", "vulpix", "ninetales", "jigglypuff", "wigglytuff", "zubat", "golbat", "oddish", 
"gloom", "vileplume", "paras", "parasect", "venonat", "venomoth", "diglett", "dugtrio", "meowth", "persian", "psyduck", "golduck", 
"mankey", "primeape", "growlithe", "arcanine", "poliwag", "poliwhirl", "poliwrath", "abra", "kadabra", "alakazam", "machop", "machoke", 
"machamp", "bellsprout", "weepinbell", "victreebel", "tentacool", "tentacruel", "geodude", "graveler", "golem", "ponyta", 
"rapidash", "slowpoke", "slowbro", "magnemite", "magneton", "farfetchd", "doduo", "dodrio", "seel", "dewgong", "grimer", 
"muk", "shellder", "cloyster", "gastly", "haunter", "gengar", "onix", "drowzee", "hypno", "krabby", "kingler", "voltorb",
"electrode", "exeggcute", "exeggutor", "cubone", "marowak", "hitmonlee", "hitmonchan", "lickitung", "koffing", "weezing",
"rhyhorn", "rhydon", "chansey", "tangela", "kangaskhan", "horsea", "seadra", "goldeen", "seaking", "staryu", "starmie", 
"mr-mime", "scyther", "jynx", "electabuzz","magmar","pinsir","tauros","magikarp","gyarados","lapras","ditto","eevee",
"vaporeon","jolteon","flareon","porygon","omanyte","omastar","kabuto","kabutops","aerodactyl","snorlax","articuno",
"zapdos","moltres","dratini","dragonair","dragonite","mewtwo"]

const icon = document.querySelector('.icon');
const search = document.querySelector('.search-bar');
icon.onclick = function(){
    search.classList.toggle('active');
}
const searchWrapper = document.querySelector(".input");
const InputBox = searchWrapper.querySelector("input")

function beginWith(string ,query) {
    let len = query.length;
    let number_matches = 0;
    for(let i = 0; i < len; i++) {
        if(string[i] == query[i]) {
            number_matches++;
        }
    }
    if(number_matches == (len)) {
        return true;
    }
    else {
        return false;
    }
}

InputBox.onkeyup = (e)=>{
    let trainerData = e.target.value;
    let emptyArray = [];
    emptyArray = pokeNames.filter(poke => beginWith(poke, trainerData));
    console.log(emptyArray);
    let desiredPokemons = emptyArray;
}