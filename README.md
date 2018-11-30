# justSurvive

============

Implementation Ideas:

1. Use a series of object arrays to mimic database tables

```
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
        reject(Error('No character could be found with that name));
      }
    }, 200);
  });
}

```
