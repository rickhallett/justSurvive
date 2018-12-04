class Model {
  constructor( seedData, store) {
    this.store = new Store( 'just-survive' );
    this.game = seedData;
    this.creeperCount = 0;
    this.str = 1;
  }

  setView(view) {
    this.view = view;
  }

  setController(ctrl) {
    this.ctrl = ctrl;
  }



  initialisePlayer ( data ) {
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
