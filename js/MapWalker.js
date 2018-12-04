class MapWalker {
  constructor( map ) {
    this.map = map;
    this.position = {
      x: this.randomPostion( map.squareLength ),
      y: this.randomPostion( map.squareLength ),
      // x: 0,
      // y: 0,
    };
  }

  randomPostion ( length ) {
    return Math.ceil( Math.random() * ( length - 1 ) );
  }

  moveNorth () {
    return this.move( 'north' );
  }

  moveSouth () {
    return this.move( 'south' );
  }

  moveEast () {
    return this.move( 'east' );
  }

  moveWest () {
    return this.move( 'west' );
  }

  move ( direction ) {
    if ( this.map.grid[this.position.x][this.position.y].canMove[direction] ) {
      switch ( direction ) {
        case 'north':
          this.position.x--;
          break;
        case 'south':
          this.position.x++;
          break;
        case 'east':
          this.position.y++;
          break;
        case 'west':
          this.position.y--;
          break;
        default:
          break;
      }
    } else {
      console.log( `You cannot move ${direction} from here!` );
      this.printAvailableDirections();
    }

    return this.position;
  }

  printMap () {
    let playerX = this.position.x;
    let playerY = this.position.y;
    let createdMap = '';

    for ( let x_axis in this.map.grid ) {
      let row = '';
      for ( let y_axis in this.map.grid ) {
        let playerHere = false;
        if (
          Number.parseInt( x_axis ) === playerX &&
          Number.parseInt( y_axis ) === playerY
        )
          playerHere = true;

        if ( playerHere ) {
          let coord = `${x_axis}${y_axis}`;
          row += `(${coord})`;
        } else {
          let coord = ` ${x_axis}${y_axis} `;
          row += `${coord}`;
        }
      }
      row = row.concat( '\n' );
      createdMap = createdMap.concat( row );
    }
    return createdMap;
  }

  printAvailableDirections () {
    const directions = this.map.grid[this.position.x][this.position.y].canMove;
    const availableDirections = []
    Object.keys( directions ).forEach( ( key ) => {
      if ( directions[key] === true ) availableDirections.push( key );
    } )
    return `You can move in these directions:${availableDirections.map( ( dir ) => ` ${dir}` )}.`;
  }
}
