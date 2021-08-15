const dictTypes = {
    "normal" : "1", "fighting" : "2", "flying": "3", 
    "poison" : "4", "ground" : "5", "rock": "6", 
    "bug" : "7", "ghost" : "8", "steel" : "9",
    "fire" : "10","water" : "11","grass" : "12",
    "electric" : "13","psychic" : "14","ice" : "15",
    "dragon" : "16","dark" : "17", "fairy" : "18"
}

const dict3dSprites = {
    "deoxys-normal" : "deoxys",
    "nidoran-f" : "nidoran_f",
    "nidoran-m" : "nidoran_m",
    "mr-mime" : "mr.mime",
    "mr-rime" : "mr.rime",
    "mime-jr" : "mime_jr",
    "wormadam-plant" : "wormadam"
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
    constructor(species, evolves_to, evolution_details) {
        this.species = species;
        this.evolves_to = evolves_to;
        this.evolution_details = evolution_details;
    }
}

class PoketMonsterInfo {
    constructor(name, image, type, id, image3d, abilities, stats, nameStat, weight, height, weakness, info, halfDamage, noDamage) {
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
        this.info = info;
        this.halfDamage = halfDamage;
        this.noDamage = noDamage;
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
            const pDamageHalf = [];
            promises2.push(fetch(url2).then((res) => res.json()));

            const promisesInfo = [];
            promisesInfo.push(fetch(`https://pokeapi.co/api/v2/pokemon-species/${pid}`).then((res) => res.json()));
            Promise.all(promisesInfo).then((resultsInfo) => {
                resultsInfo.map((resultInfo) => {
                    pInfo = resultInfo.flavor_text_entries[0].flavor_text;
                    console.log (pInfo);
                    Promise.all(promises2).then((results2) => {
                        results2.map((result2) => {
                            pWeakness [0] = result2.damage_relations.double_damage_from.map((name) => name.name).join(', ');
                            pDamageHalf [0] = result2.damage_relations.half_damage_from.map((name) => name.name).join(', ');
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
                                    pDamageHalf [1] = result3.damage_relations.half_damage_from.map((name) => name.name).join(', ');
                                    pDamageHalf.join(', ');
                                    pNoDamage = result3.damage_relations.no_damage_from.map((name) => name.name).join(', ');
                                    thePokemon.push(new PoketMonsterInfo(pname, pimage, ptype, pid, pimage3d, pabilities, pstats, pNameStats, pweight, pheight, pWeakness, pInfo, pDamageHalf, pNoDamage));
                                });
                                findEvolutionChain(thePokemon);
                                pokedexPage1(thePokemon);  
                            });
                        }
                        else {
                            thePokemon.push(new PoketMonsterInfo(pname, pimage, ptype, pid, pimage3d, pabilities, pstats, pNameStats, pweight, pheight, pWeakness[0], pInfo, pDamageHalf[0], '-'));
                            findEvolutionChain(thePokemon);
                            pokedexPage1(thePokemon);
                        }
                    });
            });
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
        let evo_path_ways_f;
        let evo_path_ways_s;
        let v;
        let w;
        let y;
        let finalone = [];
        let finaltwo = [];
        let final;
            v = new element(chain.chain.species.name, chain.chain.species.url);
            if(chain.chain.evolves_to != undefined && chain.chain.evolves_to.length > 0) {
                for(let j = 0; j < chain.chain.evolves_to.length; j++) {
                    w = new element(chain.chain.evolves_to[j].species.name, chain.chain.evolves_to[j].species.url);
                    evo_path_ways_f = chain.chain.evolves_to[j].evolution_details;
                    if(chain.chain.evolves_to[j].evolves_to != undefined && chain.chain.evolves_to[j].evolves_to.length > 0) {
                        for(let k = 0; k < chain.chain.evolves_to[j].evolves_to.length; k++) {
                            evo_path_ways_s = chain.chain.evolves_to[j].evolves_to[k].evolution_details;
                            y = new element(chain.chain.evolves_to[j].evolves_to[k].species.name, chain.chain.evolves_to[j].evolves_to[k].species.url);
                            finalone.push(new block(y, null, evo_path_ways_f));
                        }
                        finaltwo.push(new block(w, finalone, evo_path_ways_s));
                        final = new block(v, finaltwo, null);
                    } 
                    else {
                        finalone.push(new block(w, null, evo_path_ways_f));
                        final = new block(v, finalone, null);
                    }
                }
            } 
            else {
                final = new block(v, null, null);
            }
            theChain = final;
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