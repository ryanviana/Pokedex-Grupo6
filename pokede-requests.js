const dictTypes = {
    "normal" : "1", "fighting" : "2", "flying": "3", 
    "poison" : "4", "ground" : "5", "rock": "6", 
    "bug" : "7", "ghost" : "8", "steel" : "9",
    "fire" : "10","water" : "11","grass" : "12",
    "electric" : "13","psychic" : "14","ice" : "15",
    "dragon" : "16","dark" : "17", "fairy" : "18"
}

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
    constructor(name, image, type, id, image3d, abilities, stats, nameStat, weight, height, weakness) {
        this.name = name;
        this.image = image;
        this.image3d = image3d;
        this.type = type;
        this.id = id;
        this.abilities = abilities;
        this.stats = stats;
        this.nameStat = nameStat;
        this.weight = weight;
        this.height = height;
        this.weakness = weakness;
    }
}
// Global VAR
let theChain;
let idFound;
let thePokemon = [];
//  END Global VAR
const fetchOnePoke = async (url) => {
    const promises = [];

    promises.push(fetch(url).then((res) => res.json()));
    Promise.all(promises).then((results) => {
        results.map((result) => {
            const pname = result.name;
            const pimage = result.sprites['front_default'];
            const ptype = result.types.map((type) => type.type.name).join(', ');
            const pid = result.id;
            const pimage3d = `https://projectpokemon.org/images/normal-sprite/${pname}.gif`;
            const pabilities = result.abilities.map((ability) => ability.ability.name).join(', ');
            const pstats = result.stats.map((base_stat) => base_stat.base_stat);
            const pNameStats = result.stats.map((stat) => stat.stat.name);
            const pweight = result.weight/10;
            const pheight = result.height/10;
            let pcode = [];
            pcode.push(dictTypes[`${result.types[0].type.name}`]);
            const url2 = `https://pokeapi.co/api/v2/type/${pcode[0]}`;
            let url3;
            const promises2 = [];
            const pWeakness = [];
            promises2.push(fetch(url2).then((res) => res.json()));
            Promise.all(promises2).then((results2) => {
                results2.map((result2) => {
                    pWeakness [0] = result2.damage_relations.double_damage_from.map((name) => name.name).join(', ');
                    thePokemon.push(new PoketMonsterInfo(pname, pimage, ptype, pid, pimage3d, pabilities, pstats, pNameStats, pweight, pheight, pWeakness[0]));
                });
                if(result.types[1] != undefined) {
                    pcode.push(dictTypes[`${result.types[1].type.name}`]);
                    url3 = `https://pokeapi.co/api/v2/type/${pcode[1]}`;
                    const promises3 = [];
                    promises3.push(fetch(url3).then((res) => res.json()));
                    Promise.all(promises3).then((results3) => {
                        results3.map((result3) => {
                            pWeakness [1] = result3.damage_relations.double_damage_from.map((name) => name.name).join(', ');
                            pWeakness.join(', ');
                            thePokemon.push(new PoketMonsterInfo(pname, pimage, ptype, pid, pimage3d, pabilities, pstats, pNameStats, pweight, pheight, pWeakness));
                        });
                        findEvolutionChain(thePokemon);
                        pokedexPage1(thePokemon);  
                    });
                }
                else {
                    findEvolutionChain(thePokemon);
                    pokedexPage1(thePokemon);
                }
            });
    });
});
}

async function findEvolutionChain() {
    const pokeUrl = `https://pokeapi.co/api/v2/pokemon-species/${idFound}/`;
    const rawDataSpecies = await fetchData(pokeUrl);
    const dataSpecies = await rawDataSpecies.json();
    const rawDataChain = await fetchData(dataSpecies.evolution_chain.url);
    const chain = await rawDataChain.json();
        let a;
        let b;
        let v;
        let w;
        let x;
        let y;
        let z;
        let finalone = [];
        let finaltwo = [];
        let final;
            v = new element(chain.chain.species.name, chain.chain.species.url);
    
            if(chain.chain.evolves_to != undefined && chain.chain.evolves_to.length > 0) {
                for(let j = 0; j < chain.chain.evolves_to.length; j++) {
                    w = new element(chain.chain.evolves_to[j].species.name, chain.chain.evolves_to[j].species.url);
                    if(chain.chain.evolves_to[j].evolution_details.item != undefined) {
                        x = new element(chain.chain.evolves_to[j].evolution_details.item.name, chain.chain.evolves_to[j].evolution_details.item.url);
                    }
                    if(chain.chain.evolves_to[j].evolution_details.min_level != undefined) {
                        a = hain.chain.evolves_to[j].evolution_details.min_level;
                    }
                    console.log("Daijobu Daijobu...");
                    if(chain.chain.evolves_to[j].evolves_to != undefined && chain.chain.evolves_to[j].evolves_to.length > 0) {
                        console.log("nasete...");
                        for(let k = 0; k < chain.chain.evolves_to[j].evolves_to.length; k++) {
                            console.log("Watashidakita!!");
                            y = new element(chain.chain.evolves_to[j].evolves_to[k].species.name, chain.chain.evolves_to[j].evolves_to[k].species.url);
                            if(chain.chain.evolves_to[j].evolves_to[k].evolution_details.item != undefined) {
                                z = new element(chain.chain.evolves_to[j].evolves_to[k].evolution_details.item.name, chain.chain.evolves_to[j].evolves_to[k].evolution_details.item.url);
                            }
                            if(chain.chain.evolves_to[j].evolves_to[k].evolution_details.min_level != undefined) {
                                b = chain.chain.evolves_to[j].evolves_to[k].evolution_details.min_level;
                            }
                            finalone.push(new block(y, null,b, z));
                        }
                        finaltwo.push(new block(w, finalone, a, x));
                        final = new block(v, finaltwo, null, null);
                    } 
                    else {
                        finalone.push(new block(w, null, a, x));
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
        fetchOnePoke(`https://pokeapi.co/api/v2/pokemon/${idFound}`);
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