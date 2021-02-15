const charName = document.getElementById('charName');
const submitButton = document.getElementById('submitButton');
const charClass = document.getElementById('charClass');

searchApi('classes')
    .then( data => data.results)
    .then( results => {
        for (const cName in results) {
            if (Object.hasOwnProperty.call(results, cName)) {
                const element = results[cName];
                console.log(element.name);          
                const classOption = document.createElement('option');
                classOption.label = element.name;
                classOption.value = element.name;
                classOption.text = element.name;
                charClass.appendChild(classOption);
            }
        }
    });

submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(charName.value);
});