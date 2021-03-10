const saveButton = document.getElementById('saveButton');
const newButton = document.getElementById('newButton');
const loadButton = document.getElementById('loadButton');
const charName = document.getElementById('charName');
const submitButton = document.getElementById('submitButton');
const charClass = document.getElementById('charClass');
const charLevel = document.getElementById('charLevel');
const charRace = document.getElementById('charRace');
const charDisplay = document.getElementById('charDisplay');

let character;


//Generic error handling method
function handleError(error){
    console.log('Looks like there was a problem!', error);
};


/*
// Fetch Methods
*/

// Basic API Search
// Returns promise with JSON object buried inside like a nugget of data nougat
async function searchApi(search){
    try {
        const response = await fetch('https://www.dnd5eapi.co' + search);
        const goNoGo = await checkStatus(response);
        return goNoGo.json();
    } catch (error) {
        handleError(error);
    };
};

// Basic Response Checking
async function checkStatus(response) {
    if (response.ok) {
      return await Promise.resolve(response);
    } else {
      return await Promise.reject(new Error(response.statusText));
    }
  }

// Hides character display, shows new character form again
function showNewCharacterForm() {
    charDisplay.classList.add("hidden");
    saveButton.classList.add("hidden");
    newButton.classList.add("hidden");
    document.getElementById('charForm').classList.remove("hidden");
};

// Loads a character object
function loadCharacter() {
    // POPUP ALERT WITH LIST OF STORAGE KEYS
    let alertText = 'Please enter the name of the character to load:\n Current characters saved are: \n';

    for (var i = 0; i < localStorage.length; i++){
        alertText += `${localStorage.key(i)}\n`
    };
    
    // ASK FOR KEY
    const name = window.prompt(alertText);
    // LOAD KEY
    if (name){
        character = JSON.parse(localStorage.getItem(name));
        displayCharacter(character);
    };

};

// Saves a character object to localStorage
function saveCharacter(character) {

    // Ask for name, default is character name
    const name = window.prompt("Please type a name to save your character under:", `${character.charName}`);

    localStorage.setItem(name, JSON.stringify(character));
};


function handleCreateCharacterClick(e){
    e.preventDefault();    
    
    createCharacter(charName.value, charRace.value, charClass.value)
        .then(Newcharacter => {
            displayCharacter(Newcharacter);
            console.dir(Newcharacter);
            character = Newcharacter;
        })
        .catch(handleError); 
};


// CONSOLIDATE THESE
newButton.addEventListener('click', showNewCharacterForm);
saveButton.addEventListener('click', () => saveCharacter(character));
loadButton.addEventListener('click', loadCharacter);
submitButton.addEventListener('click', handleCreateCharacterClick);


/*
// Populate our lists the lazy way:
*/

// REFACTOR THIS MESS

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