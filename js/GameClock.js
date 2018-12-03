class GameClockData {
  constructor() {
    // iterable values
    this.months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
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
  }
}

class GameClock extends GameClockData {
  constructor( watching ) {
    super();

    this.iterateMonth = this.monthClock( this.months );
    this.iterateDay = this.dayClock( this.week );
    this.iterateHour = this.hourClock( this.hours );

    // initial values
    this.year = 2040;
    this.month = this.iterateMonth.next().value;
    this.date = 0;
    this.day = this.iterateDay.next().value;
    // this.hour = this.iterateHour.next().value;
    this.hour = '00:00';

    this.watching = watching;
    // debugger;
  }

  iterateYear () {
    return this.year++;
  }

  iterateDate () {
    return this.date++;
  }

  // iterates over months
  *monthClock ( months ) {
    for ( const name of months ) {
      yield name;

      if ( name == 'Dec' ) {
        this.iterateMonth = this.monthClock( this.months );
      }

      if ( name === 'Dec' && this.date === 31 ) {
        this.iterateYear();
      }
    }
  }

  // iterates over week days and increments date
  *dayClock ( week ) {
    for ( const day of week ) {
      this.iterateDate();
      yield day;

      // if date exceeds month limit, reset
      if ( this.date === this.monthDays[this.month] ) {
        this.month = this.iterateMonth.next().value;
        this.date = 0;
      }

      // if reaches end of iterable, reset
      if ( day == 'Sat' ) {
        this.iterateDay = this.dayClock( this.week );
      }
    }
  }

  *hourClock ( hours ) {
    for ( const hour of hours ) {
      yield hour;

      // if end of iterable, reset for next use
      if ( hour === '23:00' ) {
        this.day = this.iterateDay.next().value;
      }
    }
  }

  runTime () {
    this.hour = this.iterateHour.next().value;

    // reset the generator when it reaches its terminal value
    if ( this.hour === undefined ) {
      this.iterateHour = this.hourClock( this.hours );
      this.hour = this.iterateHour.next().value;
    }

    if ( this.watching ) {
      console.log(
        `${this.day} ${this.date} ${this.month} ${this.hour} ${this.year}`,
      );
    }

  }
}
