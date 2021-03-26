class Character {
    constructor(charName, charRace){
        this.charName = charName;
        this.charRace = charRace;
        this.str = 0;
        this.dex = 0;
        this.con = 0;
        this.int = 0;
        this.wis = 0;
        this.cha = 0;
        this.proficiencies = new Set();
        this.saves = [];
        this.charLevels = [];
        this.levelInfo = [];
    };

    // Returns a total for one ability score
    statRoll() {
        let rolls = [];
        for (let i = 0; i < 4; i++) {
            rolls.push(rollD(6)); 
        };
        removeLowest(rolls);
        return addDice(rolls);
    }; 

    // Returns a set of 6 ability scores for a character, sorted highest to lowest
    rollCharacter() {
        let stats = [];
        for (let i = 0; i < 6; i++) {
            stats.push(this.statRoll());
        };
        return stats.sort( (a, b) => b - a);
    };

    statsByClass(){
        if (this.charLevels.length > 1){
            return
        }
        const abilityScores = this.rollCharacter();
        const charClass = this.charLevels[0];

        // TODO: set prop for subclass selection, branch out
        // Light Cleric only class that would benefit
        switch (charClass) {
            case "barbarian":
                this.str += abilityScores[0];
                this.dex += abilityScores[2];
                this.con += abilityScores[1];
                this.int += abilityScores[5];
                this.wis += abilityScores[4];
                this.cha += abilityScores[3];
                break;
            
            case "bard":
                this.str += abilityScores[4];
                this.dex += abilityScores[1];
                this.con += abilityScores[3];
                this.int += abilityScores[5];
                this.wis += abilityScores[2];
                this.cha += abilityScores[0];
                break;
            
            case "cleric":
                this.str += abilityScores[3];
                this.dex += abilityScores[5];
                this.con += abilityScores[1];
                this.int += abilityScores[4];
                this.wis += abilityScores[0];
                this.cha += abilityScores[2];
                break;

            case "druid":
                this.str += abilityScores[5];
                this.dex += abilityScores[2];
                this.con += abilityScores[4];
                this.int += abilityScores[3];
                this.wis += abilityScores[0];
                this.cha += abilityScores[1];
                break;

            case "fighter":
                this.str += abilityScores[0];
                this.dex += abilityScores[2];
                this.con += abilityScores[1];
                this.int += abilityScores[3];
                this.wis += abilityScores[5];
                this.cha += abilityScores[4];
                break;

            case "monk":
                this.str += abilityScores[3];
                this.dex += abilityScores[1];
                this.con += abilityScores[2];
                this.int += abilityScores[4];
                this.wis += abilityScores[0];
                this.cha += abilityScores[5];
                break;

            case "paladin":
                this.str += abilityScores[1];
                this.dex += abilityScores[5];
                this.con += abilityScores[2];
                this.int += abilityScores[4];
                this.wis += abilityScores[3];
                this.cha += abilityScores[0];
                break;

            case "ranger":
                this.str += abilityScores[3];
                this.dex += abilityScores[0];
                this.con += abilityScores[2];
                this.int += abilityScores[4];
                this.wis += abilityScores[1];
                this.cha += abilityScores[5];
                break;
            
            case "rogue":
                this.str += abilityScores[5];
                this.dex += abilityScores[0];
                this.con += abilityScores[1];
                this.int += abilityScores[4];
                this.wis += abilityScores[3];
                this.cha += abilityScores[2];
                break;

            case "sorcerer":
                this.str += abilityScores[5];
                this.dex += abilityScores[1];
                this.con += abilityScores[2];
                this.int += abilityScores[3];
                this.wis += abilityScores[4];
                this.cha += abilityScores[0];
                break;

            case "warlock":
                this.str += abilityScores[4];
                this.dex += abilityScores[2];
                this.con += abilityScores[1];
                this.int += abilityScores[3];
                this.wis += abilityScores[5];
                this.cha += abilityScores[0];
                break;

            case "wizard":
                this.str += abilityScores[5];
                this.dex += abilityScores[1];
                this.con += abilityScores[3];
                this.int += abilityScores[0];
                this.wis += abilityScores[2];
                this.cha += abilityScores[4];
                break;      
            
            default:
                this.str += abilityScores[0];
                this.dex += abilityScores[1];
                this.con += abilityScores[2];
                this.int += abilityScores[3];
                this.wis += abilityScores[4];
                this.cha += abilityScores[5];
                break;
            }
      
        return this;
    };

};


/*  
// Character Helper Methods:
*/

// Factory function to create a character from an API response
async function createCharacter(charName, charRace, charClass){
    try {

        //Promise all this
        const raceInfo = await searchApi("/api/races/" + charRace);
        const classInfo = await searchApi("/api/classes/" + charClass);

        const character = new Character(charName, charRace);

        // Add race things to character
    // Info for debugging, remove later
    character.raceInfo = raceInfo;
    character.classInfo = classInfo;

        raceInfo.ability_bonuses.forEach(bonus => character[bonus.ability_score.index] += bonus.bonus);
        
        character.size = raceInfo.size;
        character.speed = raceInfo.speed;
        raceInfo.starting_proficiencies.forEach(skill => character.proficiencies.add(skill)); 

        // Add class things to character
        addClassLevel(character, charClass);
        character.statsByClass();
        character.strMod = calculateMod(character.str);
        character.dexMod = calculateMod(character.dex);
        character.conMod = calculateMod(character.con);
        character.intMod = calculateMod(character.int);
        character.wisMod = calculateMod(character.wis);
        character.chaMod = calculateMod(character.cha);

        character.hitDie = classInfo.hit_die;
        character.hp = character.hitDie + character.conMod;
        classInfo.proficiencies.forEach(skill => character.proficiencies.add(skill));
        classInfo.saving_throws.forEach(save => character.saves.push(save));

        // TODO: Spell things go here

        console.log("Race Info choices I see:");
        pickOptions(raceInfo);
        console.log("Class Info choices I see:");
        pickOptions(classInfo);


        return character;

    } catch (error) {
        handleError(error);
    }
};

const calculateMod = (stat) => Math.floor((stat - 10) / 2 );

function pickOptions(info) {
    const strOptions = Object.getOwnPropertyNames(info).
        filter(str => str.includes("_options") || str.includes("_choices"));
    
    const options = strOptions.map(option => info[option]);

        // Sometimes the API has options with no choices
        if (options.length > 0){
            options.forEach( option => 
                { 
                    console.log(`For ${info.name} `);
                    console.log(option);
                    //randomChoices(info[option]);
                });
        } else { console.log("none");};               
};

function showChoices(options) {
    charDisplay.classList.remove("hidden");
    let html = "<h3>MAKE SOME CHOICES</h3> ";
    

    charDisplay.innerHTML = html;
};

function randomChoices(options) {
    options.forEach( option => {
        let picks = option.choose;
        let choices = option.from;

        let display = `Pick ${picks} from: `;

        choices.forEach( choice => display += `${choice.name}, `);

        console.log(display);
    });
};


// Adds a level of a given class to character
async function addClassLevel(character, charClass){
    // Max levels is 20
    if (character.charLevels.length < 19){
        character.charLevels.push(charClass); 
        // After First Level - Do different things
        if (character.charLevels.length > 1) {
            // TODO: ADD HEALTH
        }
        // Function I found to count occurances in an array
        const countLevels = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
        const levelsOfClass = countLevels(character.charLevels, charClass);
        const classLevel = await searchApi(`/api/classes/${charClass}/levels/${levelsOfClass}`);

        character.levelInfo.push(classLevel);

        console.log("Class level options I see:");
        pickOptions(classLevel);

    } else{
        throw new Error("Max level is 20");
    };

    return character;
};

   // TODO: better way to do this? Short answer: yes
function displayCharacter(character) {
    // Hide the character creator form and add button to restore it
    document.getElementById('charForm').classList.add("hidden");
    charDisplay.classList.remove("hidden");
    saveButton.classList.remove("hidden");
    newButton.classList.remove("hidden");

    const html = `<div class="border-2 border-grey-500 rounded-md">Character name: ${character.charName}</div>
    <div class="border-2 border-grey-500 rounded-md">Character race: ${character.charRace}</div>
    <div class="border-2 border-grey-500 rounded-md">Character class: ${character.charLevels[0]}</div>
    <div class="border-2 border-grey-500 rounded-md">Strength: ${character.str} (Modifier ${character.strMod})</div>
    <div class="border-2 border-grey-500 rounded-md">Dexterity: ${character.dex} (Modifier ${character.dexMod})</div>
    <div class="border-2 border-grey-500 rounded-md">Constitution: ${character.con} (Modifier ${character.conMod})</div>
    <div class="border-2 border-grey-500 rounded-md">Intelligence: ${character.int} (Modifier ${character.intMod})</div>
    <div class="border-2 border-grey-500 rounded-md">Wisdom: ${character.wis} (Modifier ${character.wisMod})</div>
    <div class="border-2 border-grey-500 rounded-md">Charisma: ${character.cha} (Modifier ${character.chaMod})</div>
    <div class="border-2 border-grey-500 rounded-md">Hit Points: ${character.hp}</div>
    `;

    charDisplay.innerHTML = html;
};


/*  
// Random generation methods:
*/

// Simple Dice Roller
const rollD = diceSides => Math.floor(Math.random() * diceSides) + 1;

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

