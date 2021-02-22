const charName = document.getElementById('charName');
const submitButton = document.getElementById('submitButton');
const charClass = document.getElementById('charClass');
const charLevel = document.getElementById('charLevel');
const charRace = document.getElementById('charRace');
const charDisplay = document.getElementById('charDisplay');

/*
// FETCH METHODS
*/

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


/*
// POPULATE OUR INPUT LISTS THE LAZY WAY
*/

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


/*  
// STAT GENERATION METHODS
*/

// SIMPLE DICE ROLLER
function rollD(diceSides) {
    return Math.floor(Math.random() * diceSides) + 1
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

// RETURNS A TOTAL ROLL FOR ONE ABILITY SCORE
function statRoll() {
    let rolls = [];
    for (let i = 0; i < 4; i++) {
        rolls.push(rollD(6)); 
    };
    removeLowest(rolls);
    return addDice(rolls);
}; 

// RETURNS A SET OF 6 ABILITY SCORES FOR A CHARACTER, SORTED HIGHEST TO LOWEST
function rollCharacter() {
    let stats = [];
    for (let i = 0; i < 6; i++) {
        stats.push(statRoll());
    };
    return stats.sort( (a, b) => b - a);
};


/*
// CHARACTER CREATION METHODS
*/

// THIS IS WHERE WE GIVE THE CHARACTER THEIR ABILITY SCORES, BASED ON WHICH CLASS IS PICKED    
function statsByClass(character){
    const abilityScores = rollCharacter();
    const charClass = character.charClass[0];

    switch (charClass) {
        case "cleric":
            character.str = abilityScores[0];
            character.dex = abilityScores[3];
            character.con = abilityScores[2];
            character.cha = abilityScores[5];
            character.wis = abilityScores[1];
            character.int = abilityScores[4];
            break;
        
        // BUILD THIS OUT!!!!!!!!!
        default:
            character.str = abilityScores[0];
            character.dex = abilityScores[1];
            character.con = abilityScores[2];
            character.cha = abilityScores[3];
            character.wis = abilityScores[4];
            character.int = abilityScores[5];
            break;
        }

        return character;
    };

// CREATE A CHARACTER OBJECT WITH THE PROPERTIES WE NEED TO GET STARTED
function createCharacter(charName, charRace, charClass){
    const character = { charName, charRace, charClass: [charClass]}
    statsByClass(character);

    // API STUFF SEARCHING AND ADDING PROPERTIES AND SUCH GOES HERE

    return character;
};

// METHOD TO GENERATE THE HTML TO DISPLAY CHARACTER INFO
function displayCharacter(character) {
    const html = `<div>Character name: ${character.charName}</div>
    <div>Character race: ${character.charRace}</div>
    <div>Character class: ${character.charClass[0]}</div>
    <div>Strength: ${character.str}</div>
    <div>Constitution: ${character.con}</div>
    <div>Dexterity: ${character.dex}</div>
    <div>Charisma: ${character.cha}</div>
    <div>Intelligence: ${character.int}</div>
    <div>Wisdom: ${character.wis}</div>`;
    charDisplay.innerHTML += html ;
}

// BASIC TESTING METHOD TO CHECK THINGS ARE HOOKED UP
function displayResults(charName, charRace, charClass){
    const charResults = document.createElement('div');
    charResults.innerHTML = `Character name: ${charName}
    Character race: ${charRace}
    Character class: ${charClass}
    `
    charDisplay.appendChild(charResults);
};

// DO SOMETHING ON SUBMIT BUTTON CLICK    
submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    // displayResults(charName.value, charRace.value, charClass.value);
    const character = createCharacter(charName.value, charRace.value, charClass.value);
    displayCharacter(character);
    console.dir(character);
});
