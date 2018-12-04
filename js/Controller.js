class Controller {
  constructor() {
  }

  setView(view) {
    this.view = view;
  }

  setModel(model) {
    this.model = model;
  }

  setGameClock(gameClock) {
    this.gameClock = gameClock;
  }

  setMapWalker(mapWalker) {
    this.mapWalker = mapWalker;
  }

  initGame() {
    if (!this.model.game.player.name) {
      // this.model.game.player.name = "Slayer";
      this.view.askForName();
      this.initGameClock();
    } else {
      console.log('Game already initialised!');
    }
  }

  initGameClock() {
    const self = this;
    self.timerId = setTimeout(function tick() {
      self.clockInterface(self.gameClock.runTime());
      self.timerId = setTimeout(tick, 1000); // (*)
    }, 1000);
  }

  stopGameClock() {
    clearInterval(this.timerId);
  }

  clockInterface(timeData) {
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
