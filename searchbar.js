import desiredPokemons from main.js;

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
    /**let inputedNames = e.target.value;**/
    let trainerData = e.target.value;
    
}