class Character {
    constructor(charName, charRace, charClass){
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

        searchApi("/api/races/" + this.charRace)
            .then(response => { 
                this.raceInfo = response;

                response.ability_bonuses.forEach(bonus => this[bonus.ability_score.index] += bonus.bonus);

                // languages? If yes they go here, same pattern as other choices
                
                this.size = response.size;
                this.speed = response.speed;
                response.starting_proficiencies.forEach(skill => this.proficiencies.push(skill));
                // TODO : Proficiency choice picking function goes here
            });

        this.statsByClass();

        searchApi("/api/classes/" + charClass)
            .then(response => { 
                this.classInfo = response;

                this.hitDie = response.hit_die;

                this.hp = this.hitDie + Math.floor((this.con- 10) / 2 );

                response.proficiencies.forEach(skill => this.proficiencies.push(skill));

                // TODO: function to chose proficiencies goes here

                response.saving_throws.forEach(save => this.saves.push(save));

                // Saving starting equipment?

                // TODO: Spell things go here
            });

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

        switch (charClass) {
            case "cleric":
                this.str += abilityScores[0];
                this.dex += abilityScores[3];
                this.con += abilityScores[2];
                this.cha += abilityScores[5];
                this.wis += abilityScores[1];
                this.int += abilityScores[4];
                break;
            
            // BUILD THIS OUT!!!!!!!!!
            default:
                this.str += abilityScores[0];
                this.dex += abilityScores[1];
                this.con += abilityScores[2];
                this.cha += abilityScores[3];
                this.wis += abilityScores[4];
                this.int += abilityScores[5];
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