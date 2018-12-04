console.log("Are you ready?");

const view = (i = new View());
const model = new Model(gameData);
const gameController = new Controller();
const gameClock = new GameClock();
const map = new MapConstructor(10);
const mapWalker = new MapWalker(map);

view.setController(gameController);
view.setModel(model);

gameController.setView(view);
gameController.setModel(model);
gameController.setGameClock(gameClock);
gameController.setMapWalker(mapWalker);



/* TESTING AREA */

console.log(view);
console.log(model);
console.log(gameController);

i.ready();
// i.stop();

// i.name("Lemming");
// i.train();
