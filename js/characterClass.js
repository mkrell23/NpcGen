class Character {
    constructor(charName, charRace, charClass){
        this.charName = charName;
        this.charRace = charRace;
        this.charClass = [charClass];
        searchApi("/api/races/" + this.charRace)
            .then(response => { 
                this.raceInfo = response;
            });
        searchApi("/api/classes/" + this.charClass)
            .then(response => { 
                this.classInfo = response;
            });
        this.statsByClass();
    }

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
        const charClass = this.charClass[0];
    
        switch (charClass) {
            case "cleric":
                this.str = abilityScores[0];
                this.dex = abilityScores[3];
                this.con = abilityScores[2];
                this.cha = abilityScores[5];
                this.wis = abilityScores[1];
                this.int = abilityScores[4];
                break;
            
            // BUILD THIS OUT!!!!!!!!!
            default:
                this.str = abilityScores[0];
                this.dex = abilityScores[1];
                this.con = abilityScores[2];
                this.cha = abilityScores[3];
                this.wis = abilityScores[4];
                this.int = abilityScores[5];
                break;
            }
      
        return this;
    };

    // TODO: better way to do this? Short answer: yes
    displayCharacter() {
        const html = `<div class="border-2 border-grey-500 rounded-md">Character name: ${this.charName}</div>
        <div class="border-2 border-grey-500 rounded-md">Character race: ${this.charRace}</div>
        <div class="border-2 border-grey-500 rounded-md">Character class: ${this.charClass[0]}</div>
        <div class="border-2 border-grey-500 rounded-md">Strength: ${this.str}</div>
        <div class="border-2 border-grey-500 rounded-md">Constitution: ${this.con}</div>
        <div class="border-2 border-grey-500 rounded-md">Dexterity: ${this.dex}</div>
        <div class="border-2 border-grey-500 rounded-md">Charisma: ${this.cha}</div>
        <div class="border-2 border-grey-500 rounded-md">Intelligence: ${this.int}</div>
        <div class="border-2 border-grey-500 rounded-md">Wisdom: ${this.wis}</div>`;
        return html ;
    };
}