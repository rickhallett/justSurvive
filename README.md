# justSurvive

Implementation Ideas:

1. Use a series of object arrays to mimic database tables

```javascript
const characters = [
  { name: "Gandalf", type: "Wizard", location: "Middle Earth" },
  { name: "Gandalf", type: "Wizard", location: "Middle Earth" },
  { name: "Gandalf", type: "Wizard", location: "Middle Earth" },
  ...
];

// simulate DB interaction (async)
function findCharacterByName(name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const char = characters.find(char => char.name === name);
      if(char) {
        resolve(char);
      } else {
        reject(Error('No character could be found with that name'));
      }
    }, 200);
  });
}

findGimli = findCharacterByName('Gimli')
  .then(response => {
    console.log(response);
  })
  .catch(err => {
    console.log(err);
  })

```

2. Chain custom promises to simulate merge data requests

```javascript
function hydrateStats(char) {
  return new Promise((resolve, reject) => {
    const stats = attributes.find((type) => char.type === type);
    if (stats) {
      char.stats = stats;
      resolve(char);
    } else {
      reject(Error("No stats found for this character type"));
    }
  });
}

findGimli = findCharacterByName("Gimli")
  .then((char) => {
    return hydrateStats(char);
  })
  .then((hydratedChar) => {
    console.log(hydratedChar);
  })
  .catch((err) => {
    console.log(err);
  });
```

3. Use the localStorage API to build up a Memory class with save/load features. Allow the user to save and load multiple versions of the game locally (i.e. save states);

4. Use either classes or old-school function closures to protect the majority of game state information to prevent direct user modification

```javascript
character.intelligence = 999999;
// no
```

5. Use a generator function to serve as the game calender/clock. As it gets called progressively throughout the game, it will yield up events that change gameplay (weather, twilight zones etc).

6. Use nested template literals and a series of custom string padding utilities to construct a (reasonably) elaborate console menu system, stat display and world map. Set a fixed browser width conditional for this feature to avoid responsive bullshit.

7. Create a WorldMap class that uses weak maps/Maps to simulate a 2D board, and a corresponding Navigator class that can take user commands to 'walk' over this map according to it's restrictions, and pipe up and significant tile modifiers up to the character/game state

8. Build a Schedule class that will allow the player to 'queue up' desired commands and execute them in batches (multiple movements, enemy-combat-combos etc).

9. Build in timer/action based energy system that simulates day/night cycles. Allow the user to rest over custom periods of game time (for various reward/risk...).
