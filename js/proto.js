// function createNode ( element ) {
//   return document.createElement( element );
// }

// function append ( parent, el ) {
//   return parent.appendChild( el );
// }

// const ul = document.getElementById( 'authors' );
// const url = 'https://randomuser.me/api/?results=10';
// fetch( url )
//   .then( ( resp ) => resp.json() )
//   .then( function ( data ) {
//     let authors = data.results;
//     return authors.map( function ( author ) {
//       let li = createNode( 'li' ),
//         img = createNode( 'img' ),
//         span = createNode( 'span' );
//       img.src = author.picture.medium;
//       span.innerHTML = `${author.name.first} ${author.name.last}`;
//       append( li, img );
//       append( li, span );
//       append( ul, li );
//     } )
//   } )
//   .catch( function ( error ) {
//     console.log( error );
//   } );

// sep apr june nov
class GameClock {
  constructor() {
    // iterable values
    this.months = ['Jan', 'Feb', 'Mar'];
    this.week = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];
    this.monthDays = {
      Jan: 31,
      Feb: 31,
      Mar: 31,
      Apr: 30,
      May: 31,
      Jun: 30,
      Jul: 30,
      Aug: 30,
      Sep: 31,
      Oct: 31,
      Nov: 30,
      Dec: 31,
    };
    this.hours = [
      '00:00',
      '01:00',
      '02:00',
      '03:00',
      '04:00',
      '05:00',
      '06:00',
      '07:00',
      '08:00',
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
      '19:00',
      '20:00',
      '21:00',
      '22:00',
      '23:00',
    ];
    this.iterateMonth = this.monthClock(this.months);
    this.iterateDay = this.dayClock(this.week);
    this.iterateHour = this.hourClock(this.hours);

    // initial values
    this.year = 2040;
    this.month = this.iterateMonth.next().value;
    this.date = 0;
    this.day = this.iterateDay.next().value;
    this.hour = this.iterateHour.next().value;

    debugger;
  }

  yearClock() {
    return this.year++;
  }

  dateClock() {
    return this.date++;
  }

  // iterates over months
  *monthClock(months) {
    for (const name of months) {
      this.month = yield name;
    }
  }

  // iterates over week days and increments date
  *dayClock(week) {
    for (const day of week) {
      this.date++;
      console.log(`date: ${this.date}`);

      this.day = yield day;
      // if date exceeds month limit, reset
      if (this.date === this.monthDays[this.month]) {
        this.month = this.iterateMonth.next().value;
        this.date = 0;
      }
      // if reaches end of iterable, reset
      if (day == 'Sat') {
        this.iterateDay = this.dayClock(this.week);
      }
    }
  }

  *hourClock(hours) {
    for (const hour of hours) {

      console.log(`${this.hour} ${this.day} ${this.month }${this.year}`);

      this.hour = yield hour;
      // if end of iterable, reset for next use
      if (hour === '22:00') {
        this.iterateHours = this.hourClock(this.hours);
        this.day = this.iterateDay.next().value;
      }
    }
  }
}

let gc = new GameClock();

for (let i = 1; i < 96; i++) {
  gc.iterateHour.next();
}
