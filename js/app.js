const charName = document.getElementById('charName');
const submitButton = document.getElementById('submitButton');
const charClass = document.getElementById('charClass');
const charLevel = document.getElementById('charLevel');
const charRace = document.getElementById('charRace');

// FETCH METHODS
function searchApi(search){
    return fetch('https://www.dnd5eapi.co/api/' + search)
        .then(checkStatus)  
        .then(response => response.json())
        .catch(error => console.log('Looks like there was a problem!', error));
};

function checkStatus(response) {
    if (response.ok) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(new Error(response.statusText));
    }
  }

// DICE METHODS
const rollD = diceSides => Math.floor(Math.random() * diceSides) + 1;

function statRoll() {
    const rolls = [];
    for (let i = 0; i < 4; i++) {
        rolls.push(rollD(6)); 
    };  
    const lowest = Math.min(...rolls);
    return rolls.filter(e => e)
}; 

// POPULATE OUR CLASS LIST THE LAZY WAY
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

// POPULATE OUR RACE LIST THE LAZY WAY
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