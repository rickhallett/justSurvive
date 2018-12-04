class Node {
  constructor( x, y, canMove ) {
    this.x = x;
    this.y = y;
    this.canMove = canMove;
    this.features = this.constructFeatures();
  }

  constructFeatures () {
    return {
      shrapnel: 0,
      zombie: 0,
      food: 0,
      item: null,
      description: 'Nothing special here...',
    };
  }
}

class MapConstructor {
  constructor( size ) {
    this.grid = this.constructGrid( size );
    this.squareLength = size;
  }

  constructGrid ( size ) {
    const map = [];
    const max = size - 1;
    let canMove;
    for ( let i = 0; i < size; i++ ) {
      map.push( new Array() );
    }
    for ( let x = 0; x < size; x++ ) {
      for ( let y = 0; y < size; y++ ) {
        canMove = this.determineBoundary( x, y, max );
        map[x][y] = new Node( x, y, canMove );
      }
    }
    return map;
  }

  determineBoundary ( x, y, max ) {
    let north = true;
    let south = true;
    let east = true;
    let west = true;

    if ( x === 0 ) {
      north = false;
    }

    if ( x === max ) {
      south = false;
    }

    if ( y === 0 ) {
      west = false;
    }

    if ( y === max ) {
      east = false;
    }

    return {
      north,
      south,
      east,
      west,
    };
  }
}
