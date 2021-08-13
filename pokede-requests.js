//Global VAR
const ecra = document.getElementById('ecra');
const displayLeft = document.getElementById('displayLeft');
const displayRight = document.getElementById('displayRight');
//END Global VAR

class element {
    constructor(nick, url) {
        this.nick = nick;
        this.url = url;
    }
}

class block {
    constructor(species, evolves_to, minimum_level, item) {
        this.species = species;
        this.evolves_to = evolves_to;
        this.minimum_level = minimum_level;
        this.item = item;
    }
}

class PoketMonsterInfo {
    constructor(name, image, type, id, image3d, abilities/*, weakness, stats, description*/) {
        this.name = name;
        this.image = image;
        this.image3d = image3d;
        this.type = type;
        this.id = id;
        this.abilities = abilities;
        /*this.weakness = weakness;
        this.stats = stats;
        this.description = description;*/
    }
}
// Global VAR
let theChain;
let idFound;
let thePokemon = [];
//  END Global VAR
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
            const pabilities = result.abilities.map((ability) => ability.ability.name);
            /*const pweakness = result.types.damage_relations.map((double_damage_from) => double_damage_from);
            const pstats = result.stats.map((base_stat) => base_stat);
            const pdescription = result.descriptions.map((description) => description);*/
            thePokemon.push(new PoketMonsterInfo(pname, pimage, ptype, pid, pimage3d, pabilities/*, pweakness, pstats, pdescription*/));
            console.log("Mochi mochi");
        });
        findEvolutionChain(thePokemon);
        pokedexPage1(thePokemon);
    });
}

async function findEvolutionChain(pokemon) {
    const pokeUrl = `https://pokeapi.co/api/v2/pokemon-species/${idFound}/`;
    const rawDataSpecies = await fetchData(pokeUrl);
    const dataSpecies = await rawDataSpecies.json();
    const rawDataChain = await fetchData(dataSpecies.evolution_chain.url);
    const chain = await rawDataChain.json();
        let a = [];
        let b = [];
        let v;
        let w = [];
        let x = [];
        let y = [];
        let z = [];
        let finalone;
        let finaltwo;
        let final;
            v = new element(chain.chain.species.name, chain.chain.species.url);
    
            if(chain.chain.evolves_to != undefined && chain.chain.evolves_to.length > 0) {
                for(let j = 0; j < chain.chain.evolves_to.length; j++) {
                    w.push(new element(chain.chain.evolves_to[j].species.name, chain.chain.evolves_to[j].species.url));
                    if(chain.chain.evolves_to[j].evolution_details.item != undefined) {
                        x.push(new element(chain.chain.evolves_to[j].evolution_details.item.name, chain.chain.evolves_to[j].evolution_details.item.url));
                    }
                    if(chain.chain.evolves_to[j].evolution_details.min_level != undefined) {
                        a.push(chain.chain.evolves_to[j].evolution_details.min_level);
                    }
                    if(chain.chain.evolves_to[j].evolves_to != undefined && chain.chain.evolves_to[j].evolves_to.length > 0) {
                        for(let k = 0; k < chain.chain.evolves_to[j].evolves_to[k].length; k++) {
                            y.push( new element(chain.chain.evolves_to[j].evolves_to[k].species.name, chain.chain.evolves_to[j].evolves_to[k].species.url));
                            if(chain.chain.evolves_to[j].evolves_to[k].evolution_details.item != undefined) {
                                z.push(new element(chain.chain.evolves_to[j].evolves_to[k].evolution_details.item.name, chain.chain.evolves_to[j].evolves_to[k].evolution_details.item.url));
                            }
                            if(chain.chain.evolves_to[j].evolves_to[k].evolution_details.min_level != undefined) {
                                b.push(chain.chain.evolves_to[j].evolves_to[k].evolution_details.min_level);
                            }
                        }
                        finalone = new block(y, null,b, z);
                        finaltwo = new block(w, finalone, a, x);
                        final = new block(v, finaltwo, null, null);
                    } 
                    else {
                        finalone = new block(w, null, a, x);
                        final = new block(v, finalone, null, null);
                    }
                }
            } 
            else {
                final = new block(v, null, null, null);
            }
            theChain = final;
            console.log("We succeded!! YAY");
            console.log(theChain.species.nick);
}

    // MAIN
    idFound = catchIdFromUrl();
    console.log(idFound);
    if (idFound > 0 && idFound < 899) {
        fetchOnePoke();
    }
    else {
        ecra.innerHTML = `<div class="errormessage"> UNKNOWED POKEMON </div>`;
    }
    // END MAIN
    function catchIdFromUrl() {
        const rawUrl = window.location.href.split('?');
        if (rawUrl[1] != undefined) {
            const semiRawUrl = rawUrl[1].split('=');
            if (semiRawUrl[1] != undefined) {
                const idFound = semiRawUrl[1];
                if (idFound != undefined) {
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

    async function fetchData(url) {
        const res = await fetch(url);
        return res;
    }