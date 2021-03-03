const saveButton = document.getElementById('saveButton');
const newButton = document.getElementById('newButton');
const loadButton = document.getElementById('loadButton');
const charName = document.getElementById('charName');
const submitButton = document.getElementById('submitButton');
const charClass = document.getElementById('charClass');
const charLevel = document.getElementById('charLevel');
const charRace = document.getElementById('charRace');
const charDisplay = document.getElementById('charDisplay');


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


// Function to hide the character creator form and add button to restore it
function hideNewCharacterForm(){
    document.getElementById('charForm').classList.add("hidden");
    charDisplay.classList.remove("hidden");
    saveButton.classList.remove("hidden");
    newButton.classList.remove("hidden");
};

// Hides character display, shows new character form again
function showNewCharacterForm() {
    charDisplay.classList.add("hidden");
    document.getElementById('charForm').classList.remove("hidden");
    newButton.classList.remove("hidden");
};


function handleCreateCharacterClick(e){
    e.preventDefault();
    hideNewCharacterForm();    
    createCharacter(charName.value, charRace.value, charClass.value)
        .then(character => {
            charDisplay.innerHTML = character.displayCharacter();
            console.dir(character);
        })
        .catch(handleError);
};


// Do things on button clicks
newButton.addEventListener('click', showNewCharacterForm);
submitButton.addEventListener('click', handleCreateCharacterClick);
