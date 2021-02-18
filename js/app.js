const charName = document.getElementById('charName');
const submitButton = document.getElementById('submitButton');
const charClass = document.getElementById('charClass');
const charLevel = document.getElementById('charLevel');
const charRace = document.getElementById('charRace');

// FETCH METHODS
// BASIC API SEARCH:
function searchApi(search){
    return fetch('https://www.dnd5eapi.co/api/' + search)
        .then(checkStatus)  
        .then(response => response.json())
        .catch(error => console.log('Looks like there was a problem!', error));
};

// BASIC RESPONSE CHECKING
function checkStatus(response) {
    if (response.ok) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(new Error(response.statusText));
    }
  }

// STAT GENERATION METHODS
// SIMPLE DICE ROLLER
function rollD(diceSides) {
    return Math.floor(Math.random() * diceSides) + 1
};

// RETURNS A TOTAL ROLL FOR ONE ABILITY SCORE
function statRoll() {
    let rolls = [];
    for (let i = 0; i < 4; i++) {
        rolls.push(rollD(6)); 
    };
    removeLowest(rolls);
    return addDice(rolls);
}; 

// REMOVES LOWEST NUMBER FROM ARRAY, RETURNS ARRAY SORTED LOW TO HIGH
function removeLowest(rolls) {
    rolls.sort( (a, b) => a-b);
    rolls.shift();
    return rolls;
};

// ADDS ALL TOGETHER, RETURNS TOTAL
function addDice(rolls) {
    let total = 0;
    for (let i = 0; i < rolls.length; i++) {
        const roll = rolls[i];
        total += roll;
    }
    return total
};

// RETURNS A SET OF 6 ABILITY SCORES FOR A CHARACTER, SORTED HIGHEST TO LOWEST
function rollCharacter() {
    let stats = [];
    for (let i = 0; i < 6; i++) {
        stats.push(statRoll());
    };
    return stats.sort( (a, b) => b - a);
};

// POPULATE OUR INPUT LISTS THE LAZY WAY
// CLASSES:
searchApi('classes')
    .then( data => data.results)
    .then( results => {
        for (const cName in results) {
            if (Object.hasOwnProperty.call(results, cName)) {
                const element = results[cName];      
                const classOption = document.createElement('option');
                classOption.label = element.name;
                classOption.value = element.name.toLowerCase();
                classOption.text = element.name;
                charClass.appendChild(classOption);
            }
        }
    });

// RACES:
searchApi('races')
    .then( data => data.results)
    .then( results => {     
        for (const rName in results) {
            if (Object.hasOwnProperty.call(results, rName)) {
                const element = results[rName];      
                const raceOption = document.createElement('option');
                raceOption.label = element.name;
                raceOption.value = element.name.toLowerCase();
                raceOption.text = element.name;
                charRace.appendChild(raceOption);
            }
        }
    });

submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    console.log("Character name: " + charName.value);
    console.log("Character race: " + charRace.value);
    console.log("Character class: " + charClass.value);
    console.log("Character level: " + charLevel.value);
});