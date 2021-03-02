class Character {
    constructor(charName, charRace, charClass, raceInfo, classInfo){
        this.charName = charName;
        this.charRace = charRace;
        this.str = 0;
        this.dex = 0;
        this.con = 0;
        this.cha = 0;
        this.wis = 0;
        this.int = 0;
        this.proficiencies = [];
        this.saves = [];
        this.charLevels = [charClass];

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

        this.hitDie = classInfo.hit_die;

        this.hp = this.hitDie + Math.floor((this.con- 10) / 2 );

        classInfo.proficiencies.forEach(skill => this.proficiencies.push(skill));

        // TODO: function to chose proficiencies goes here

        classInfo.saving_throws.forEach(save => this.saves.push(save));

        // Saving starting equipment?

        // TODO: Spell things go here

        this.statsByClass();

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
        // Stats for base classes with no subclass selected
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


    // TODO: better way to do this? Short answer: yes
    displayCharacter() {
        const html = `<div class="border-2 border-grey-500 rounded-md">Character name: ${this.charName}</div>
        <div class="border-2 border-grey-500 rounded-md">Character race: ${this.charRace}</div>
        <div class="border-2 border-grey-500 rounded-md">Character class: ${this.charLevels[0]}</div>
        <div class="border-2 border-grey-500 rounded-md">Strength: ${this.str}</div>
        <div class="border-2 border-grey-500 rounded-md">Constitution: ${this.con}</div>
        <div class="border-2 border-grey-500 rounded-md">Dexterity: ${this.dex}</div>
        <div class="border-2 border-grey-500 rounded-md">Charisma: ${this.cha}</div>
        <div class="border-2 border-grey-500 rounded-md">Intelligence: ${this.int}</div>
        <div class="border-2 border-grey-500 rounded-md">Wisdom: ${this.wis}</div>
        <div class="border-2 border-grey-500 rounded-md">Hit Points: ${this.hp}</div>
        `;
        return html ;
    };
};