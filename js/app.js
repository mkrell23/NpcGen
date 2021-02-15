const charName = document.getElementById('charName');
const submitButton = document.getElementById('submitButton');
const charClass = document.getElementById('charClass');
const charLevel = document.getElementById('charLevel');

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

submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    console.log("Character name: " + charName.value);
    console.log("Character class: " + charClass.value);
    console.log("Character level: " + charLevel.value);
});