/**name: result.name,
            image: result.sprites['front_default'],
            type: result.types.map((type) => type.type.name),
            id: result.id,
            height: (result.height)/10,
            weight: (result.weight)/10,
            stats: result.stats,
            ability: result.abilities.map((ability) => ability.ability.name)**/

/**const pokeContainer = document.getElementById ('pokeContainer');**/
const ecra = document.getElementById ('ecra');
const displayLeft = document.getElementById ('displayLeft');
const displayRight = document.getElementById ('displayRight');

class PoketMonsterInfo {
    constructor(name, image, type, id, image3d) {
        this.name = name;
        this.image = image;
        this.image3d = image3d;
        this.type = type;
        this.id = id;
    }
}
let idFound;
let thePokemon = [];
const fetchOnePoke = async () => {
    const promises = [];
    
    const url = `https://pokeapi.co/api/v2/pokemon/${idFound}`;
    promises.push(fetch(url).then((res) => res.json()));
    Promise.all(promises).then((results) => {
            results.map((result) => {
            const pname = result.name;
            const pimage = result.sprites['front_default'];
            const ptype = result.types.map((type) => type.type.name);
            const pid = result.id;
            const pimage3d = `https://projectpokemon.org/images/normal-sprite/${pname}.gif`;
            thePokemon.push(new PoketMonsterInfo(pname, pimage, ptype, pid, pimage3d));
            console.log("Mochi mochi");
            });
            pokedexPage1(thePokemon);
    });
}

idFound = catchIdFromUrl();
console.log(idFound);
if(idFound > 0 && idFound < 899) {
    fetchOnePoke();
}
else {
    ecra.innerHTML = `<div class="errormessage"> UNKNOWED POKEMON </div>`;
}
fetchOnePoke();

function catchIdFromUrl() {
    const rawUrl = window.location.href.split('?');
    if(rawUrl[1] != undefined) {
        const semiRawUrl = rawUrl[1].split('=');
        if(semiRawUrl[1] != undefined) {
            const idFound = semiRawUrl[1];
            if(idFound != undefined) {
                return idFound;
            }
            else {
                return 0;
            }
        }
        else {
            return 0;
        }
    }
    else {
        return 0;
    }
}