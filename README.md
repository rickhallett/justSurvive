# justSurvive

===

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
    const stats = attributes.find(type => char.type === type);
    char.stats = stats;
    if(stats) {
      resolve(char);
    } else {
      reject(Error('No stats found for this character type'));
    }
  });
}

findGimli = findCharacterByName("Gimli")
  .then((char) => {
    console.log(char);
    return hydrateStats(char);
  })
  .catch((err) => {
    console.log(err);
  });


```
