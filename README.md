# Generic NPC Generator

## [Test Out Current Version](https://mkrell23.github.io/NpcGen/)

### Create new D&D NPCs on the fly

This single page app is intended to remove the tedium of creating non-player characters in a D&D campaign, a labor intensive necessity for any DM.

Currently at "proof of concept" stage rather than "reliable tool".

Made possible thanks to the [D&D 5th Edition API](https://www.dnd5eapi.co/)

---

#### Features and Use Flow

1. Select desired class
    * Class determines stats distribution, allocating them according to the optimal use for class (ie. Wizards get strength of 8 while a fighter gets strength of 15, which is swapped for intelligence.)
    * Rolls dice, and distributes them as above.
2. Select desired race
    * Race adds certain bonuses and effects such as movement in a turn and abilities like darkvision.
3. Save and load character - currently localStorage only
4. (Future feature) Chose prestige class and make other character choices
5. (Future feature) Add levels to character
    * Levels may increase stat points, add potential spells, or give options for branching upgrade paths. 
6. (Future feature) Add more levels so the bad guy can make a comeback

Currently only basic rule 5e races and classes due to copyright. Monster race characters are planned to be added

---

#### Built for Code Louisville
Project requirements met:

* Retrieve data from an external API and display data in your app (such as with fetch() or with AJAX)
    * Data retrieved from the [D&D 5th Edition API](https://www.dnd5eapi.co/) to generate character race and class info
    * See the "Populate our lists the lazy way" section of app.js for an example of its use, or the characterClass.js constructor method
* Create an array, dictionary or list, populate it with multiple values, retrieve at least one value, and use or display it in your application
    * The rollCharacter() method in characterClass.js calls the statRoll() method in the same file. Both of these use and modify an array and return the values to another function
* Create and use a function that accepts two or more values (parameters), calculates or determines a new value based on those inputs, and returns a new value
    * The factory function for the Character class (createCharacter) takes three parameters: the character's name, race, and class

Instructions to Run:
* [Click Here](https://mkrell23.github.io/NpcGen/) to see it on GitHub Pages
* Download files, start webserver in directory, launch Chrome.
    * ie. `python3 -m http.server 8080 --bind 127.0.0.1`
