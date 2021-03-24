class Character {
    constructor(charName, charRace, charClass, raceInfo, classInfo){
        this.charName = charName;
        this.charRace = charRace;
        this.str = 0;
        this.dex = 0;
        this.con = 0;
        this.int = 0;
        this.wis = 0;
        this.cha = 0;
        this.proficiencies = [];
        this.saves = [];
        this.charLevels = [];
        this.levelInfo = [];

        //Handle the info from the raceInfo response object
        this.raceInfo = raceInfo;

        raceInfo.ability_bonuses.forEach(bonus => this[bonus.ability_score.index] += bonus.bonus);

        // languages?
        
        this.size = raceInfo.size;
        this.speed = raceInfo.speed;
        raceInfo.starting_proficiencies.forEach(skill => this.proficiencies.push(skill));
        // Proficiency choice picking?

        // Handle the info from the classInfo response object
        this.classInfo = classInfo;
        this.statsByClass();
        this.strMod = Math.floor((this.str - 10) / 2 );
        this.dexMod = Math.floor((this.dex - 10) / 2 );
        this.conMod = Math.floor((this.con - 10) / 2 );
        this.intMod = Math.floor((this.int - 10) / 2 );
        this.wisMod = Math.floor((this.wis - 10) / 2 );
        this.chaMod = Math.floor((this.cha - 10) / 2 );

        this.hitDie = classInfo.hit_die;

        this.hp = this.hitDie + this.conMod;

        classInfo.proficiencies.forEach(skill => this.proficiencies.push(skill));

        // TODO: function to chose proficiencies goes here

        classInfo.saving_throws.forEach(save => this.saves.push(save));

        // Saving starting equipment?

        // TODO: Spell things go here

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

    // TODO:
    //  function to chose class things goes here (classResponse) {
    //      startingEquipment = response.starting_equipment_options
    //      startingEquipment.foreach(choice => {
    //          numberOfChoices = choice.choose
    //          display the choice.from[{options}, {options}]
    //          push choices to character object
    //      })
    //    }

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

        const character = new Character(charName, charRace, charClass, raceInfo, classInfo);

        return addClassLevel(character, charClass);      

    } catch (error) {
        handleError(error);
    }
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

        // TODO: FUNCTION TO PICK THINGS GOES HERE

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

