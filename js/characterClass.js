class Character {
    constructor(charName, charRace, charClass){
        this.charName = charName;
        this.charRace = charRace;
        this.charClass = [charClass];
        searchApi("/races/" + this.charRace)
            .then(response => { 
                this.raceInfo = response;
            });
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

    // TODO: MAKE PRETTY
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