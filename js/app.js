const charName = document.getElementById('charName');
const submitButton = document.getElementById('submitButton');
const charClass = document.getElementById('charClass');
const charLevel = document.getElementById('charLevel');
const charRace = document.getElementById('charRace');
const charDisplay = document.getElementById('charDisplay');

/*
// Fetch Methods
*/

// Basic API Search:
function searchApi(search){
    return fetch('https://www.dnd5eapi.co' + search)
        .then(checkStatus)  
        .then(response => response.json())       
        .catch(error => console.log('Looks like there was a problem!', error));
};

// Basic Response Checking
function checkStatus(response) {
    if (response.ok) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(new Error(response.statusText));
    }
  }


/*
// Populate our lists the lazy way:
*/

// Classes:
searchApi('/api/classes')
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
searchApi('/api/races')
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
// Random generation methods:
// MAYBE MOVE TO CHARACTER CLASS?
*/

// Simple Dice Roller
function rollD(diceSides) {
    return Math.floor(Math.random() * diceSides) + 1
};

// Removes lovest number from array, returns array sorted low to high
function removeLowest(rolls) {
    rolls.sort( (a, b) => a-b);
    rolls.shift();
    return rolls;
};

// Adds all together, returns total
function addDice(rolls) {
    let total = 0;
    for (let i = 0; i < rolls.length; i++) {
        const roll = rolls[i];
        total += roll;
    }
    return total
};

// TODO:
// Function to hide the character creator form and add button to restore it
function hideCharacterCreatorForm(){
    // DO THINGS HERE
    // MODIFY EVENT LISTENER TO LISTEN FOR OTHER BUTTON CLICKS
};

// TODO: generalize it and add if statement for different buttons

// Do something on button click
submitButton.addEventListener('click', (e) => {
    e.preventDefault();

    hideCharacterCreatorForm();

    const character = new Character(charName.value, charRace.value, charClass.value);
    charDisplay.classList.remove("hidden");
    charDisplay.innerHTML = character.displayCharacter();
    
    console.dir(character);
});
