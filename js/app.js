console.log("Are you ready?");

class View {
  constructor() {}

  setController(ctrl) {
    this.ctrl = ctrl;
  }

  /*
    PLAYER COMMANDS
  */

  ready() {
    this.ctrl.initGame();
  }

  stop() {
    this.ctrl.stopGameClock();
  }

  scan() {
    this.ctrl.pingData();
  }

  train() {
    this.ctrl.trainChest();
  }

  name(name) {
    this.ctrl.setName(name);
  }

  /*
    CONSOLE DISPLAY
  */

  askForName() {
    console.log('Please set your name with i.name("name")');
  }

  displayName(name) {
    console.log(`Welcome to the barren lands, ${name}`);
  }

  notifyWaves() {
    console.log(
      "The creepers have been alerted to your presence. You sense numbers may be growing."
    );
  }

  creeperCount(count) {
    console.log(
      `Your scanner detects there are ${count || 0} creepers in the vincinity`
    );
  }

  beginTraining() {
    console.log("You begin 20 set of incline hammer bench press!");
  }

  alertGains(str, gains) {
    console.log(
      `Gains! You have increased your strength by ${gains} to ${str}`
    );
  }
}

//==============================

class Model {
  constructor(seedData) {
    this.game = seedData;
    this.creeperCount = 0;
    this.str = 1;
  }
}

//==============================

class Controller {
  constructor(view, model, gameClock) {
    this.view = view;
    this.model = model;
    this.gameClock = new gameClock(true);
  }

  initGame() {
    if (!this.model.game.player.name) {
      // this.model.game.player.name = "Slayer";
      this.view.askForName();
      this.initGameClock();
    } else {
      console.log("Game already initialised!");
    }
  }

  initGameClock() {
    let self = this;
    self.timerId = setTimeout( function tick() {
      self.gameClock.runTime();
      self.timerId = setTimeout( tick, 1000 ); // (*)
    }, 1000 );
  }

  stopGameClock() {
    clearInterval(this.timerId);
  }

  setName(name) {
    this.model.game.player.name = name;
    this.view.displayName(name);
    this.initWaves();
    this.view.notifyWaves();
  }

  initWaves() {
    setInterval(() => {
      this.model.creeperCount++;
    }, 5000);
  }

  pingData() {
    this.view.creeperCount(this.model.creeperCount);
  }

  trainChest() {
    this.view.beginTraining();
    const set = new Promise((resolve, reject) => {
      setTimeout(() => {
        const gains = Math.ceil(Math.random() * 10);
        resolve(gains);
      }, 3000);
    });

    set.then((str) => {
      this.model.str += str;
      this.view.alertGains(this.model.str, str);
    });
  }
}

//==============================

let view = (i = new View());
let model = new Model(data);
let game = new Controller(view, model, GameClock);

view.setController(game);

i.ready();
// i.stop();

// i.name("Lemming");
// i.train();
