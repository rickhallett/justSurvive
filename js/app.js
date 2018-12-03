console.log("Are you ready?");

class View {
  constructor() {
    this.clockDisplay = new Vue( {
      el: "#timer",
      data: {
        clock: {
          day: 'Mon',
          date: '1',
          month: 'Jan',
          hour: '08:00',
          year: '2019',
        }
      }
    } );

    this.displayBackground = document.querySelector('body');
  }

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
    console.log("You begin 20 sets of incline hammer bench press!");
  }

  alertGains(str, gains) {
    console.log(
      `Gains! You have increased your strength by ${gains} to ${str}`
    );
  }

  /* BROWSER DISPLAY */
  updateClock(data) {
    this.clockDisplay.clock.day = data.day;
    this.clockDisplay.clock.date = data.date;
    this.clockDisplay.clock.month = data.month;
    this.clockDisplay.clock.hour = data.hour;
    this.clockDisplay.clock.year = data.year;
    this.dayNightAnimation(data);
  }

  dayNightAnimation(time){
    switch (time.hour) {
      case '00:00':
        this.displayBackground.classList = 'midnight';
        break;
      case '04:00':
        this.displayBackground.classList = 'dawn';
        break;
      case '09:00':
        this.displayBackground.classList = 'midday';
        break;
      case '16:00':
        this.displayBackground.classList = 'dusk'
        break;
      case '19:00':
        this.displayBackground.classList = 'night'
        break;
      default:
        break;
    }
  }
}

//==============================

class Model {
  constructor(seedData, store) {
    this.store = new Store('just-survive');
    this.game = seedData;
    this.creeperCount = 0;
    this.str = 1;
  }

  initialisePlayer(data) {
    const {
      name,
      age,
      health,
      hunger,
      strength
    } = data.player;

    return {
      name, age, health, hunger, strength
    };
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
    const self = this;
    self.timerId = setTimeout( function tick() {
      self.clockInterface(self.gameClock.runTime());
      self.timerId = setTimeout( tick, 1000 ); // (*)
    }, 1000 );
  }

  stopGameClock() {
    clearInterval(this.timerId);
  }

  clockInterface(timeData){
    this.view.updateClock(timeData);
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

const view = (i = new View());
const model = new Model(data);
const game = new Controller(view, model, GameClock);

view.setController(game);

/* TESTING AREA */

console.log(view);
console.log(model);
console.log(game);

i.ready();
// i.stop();

// i.name("Lemming");
// i.train();
