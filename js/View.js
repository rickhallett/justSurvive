class View {
  constructor() {
    this.clockDisplay = new Vue({
      el: '#timer',
      data: {
        clock: {
          day: 'Mon',
          date: '1',
          month: 'Jan',
          hour: '08:00',
          year: '2019',
        },
      },
    });

    this.displayBackground = document.querySelector('body');
  }

  setController(ctrl) {
    this.ctrl = ctrl;
  }

  setModel(model) {
    this.model = model;
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

  moveNorth() {
    console.log(this.ctrl.moveNorth());
  }

  moveSouth() {
    tconsole.log(his.ctrl.moveSouth());
  }

  moveEast() {
    console.log(this.ctrl.moveEast());
  }

  moveWest() {
    console.log(this.ctrl.moveWest());
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
      'The creepers have been alerted to your presence. You sense numbers may be growing.',
    );
  }

  creeperCount(count) {
    console.log(
      `Your scanner detects there are ${count || 0} creepers in the vincinity`,
    );
  }

  beginTraining() {
    console.log('You begin 20 sets of incline hammer bench press!');
  }

  alertGains(str, gains) {
    console.log(
      `Gains! You have increased your strength by ${gains} to ${str}`,
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

  dayNightAnimation(time) {
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
        this.displayBackground.classList = 'dusk';
        break;
      case '19:00':
        this.displayBackground.classList = 'night';
        break;
      default:
        break;
    }
  }
}
