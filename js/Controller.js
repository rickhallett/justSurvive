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

  moveNorth () { 
    return this.mapWalker.moveNorth();
  }

  moveSouth () {
    return this.mapWalker.moveSouth();
  }

  moveEast () { 
    return this.mapWalker.moveEast();
  }

  moveWest () { 
    return this.mapWalker.moveWest();
  }

  initGame() {
    if (!this.model.game.player.name) {
      // this.model.game.player.name = "Slayer";
      this.view.askForName();
      this.initGameClock();
      this.startTimeLapsed();
    } else {
      console.log('Game already initialised!');
    }
  }

  initGameClock() {
    const self = this;
    self.timerId = setTimeout(function tick() {
      self.clockInterface(self.gameClock.runTime());
      // debugger;
      self.mapWalker.map.creeperGenerator();
      self.timerId = setTimeout(tick, 1000); // (*)
    }, 1000);
  }

  startTimeLapsed () {
    this.startTime = new Date();
  };

  findTimeLapsed () {
    this.endTime = new Date();
    let timeDiff = this.endTime - this.startTime; //in ms
    // strip the ms
    timeDiff /= 1000;

    // get seconds 
    const seconds = Math.round( timeDiff );
    return `${seconds} seconds`;
  }

  stopGameClock() {
    clearInterval(this.timerId);
  }

  clockInterface(timeData) {
    this.view.updateClock(timeData);
  }

  creeperGenerator() {
    
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
