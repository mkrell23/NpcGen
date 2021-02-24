class Character {
    constructor(charName, charRace, charClass){
        this.charName = charName;
        this.charRace = charRace;
        this.charClass = [charClass];

// ***THIS IS NOT WORKING*** - how to attach properties from results easily? 
        searchApi("/races/" + this.charRace).then( results => this.raceInfo = results);
        this.statsByClass();
    }

    // RETURNS A TOTAL ROLL FOR ONE ABILITY SCORE
    statRoll() {
        let rolls = [];
        for (let i = 0; i < 4; i++) {
            rolls.push(rollD(6)); 
        };
        removeLowest(rolls);
        return addDice(rolls);
    }; 

    // RETURNS A SET OF 6 ABILITY SCORES FOR A CHARACTER, SORTED HIGHEST TO LOWEST
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

    displayCharacter() {
        const html = `<div>Character name: ${this.charName}</div>
        <div>Character race: ${this.charRace}</div>
        <div>Character class: ${this.charClass[0]}</div>
        <div>Strength: ${this.str}</div>
        <div>Constitution: ${this.con}</div>
        <div>Dexterity: ${this.dex}</div>
        <div>Charisma: ${this.cha}</div>
        <div>Intelligence: ${this.int}</div>
        <div>Wisdom: ${this.wis}</div>`;
        return html ;
    };
}