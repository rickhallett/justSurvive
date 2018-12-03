/*

5x5 2D Array Coordinates

0,0   0,1   0,2   0,3   0,4
1,0   1,1   1,2   1,3   1,4
2,0   2,1   2,2   2,3   2,4
3,0   3,1   3,2   3,3   3,4
4,0   4,1   4,2   4,3   4,4

*/

class Node {
  constructor(x, y, canMove) {
    this.x = x;
    this.y = y;
    this.canMove = canMove;
    this.features = this.constructFeatures();
  }

  constructFeatures() {
    return {
      shrapnel: 0,
      zombie: 0,
      food: 0,
      item: null,
      description: 'Nothing special here...',
    };
  }
}

class Map {
  constructor(size) {
    this.grid = this.constructGrid(size);
    this.squareLength = size;
  }

  constructGrid(size) {
    const map = [];
    const max = size - 1;
    let canMove;
    for (let i = 0; i < size; i++) {
      map.push(new Array());
    }
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        canMove = this.determineBoundary(x, y, max);
        map[x][y] = new Node(x, y, canMove);
      }
    }
    return map;
  }

  determineBoundary(x, y, max) {
    let north = true;
    let south = true;
    let east = true;
    let west = true;

    if (x === 0) {
      north = false;
    }

    if (x === max) {
      south = false;
    }

    if (y === 0) {
      west = false;
    }

    if (y === max) {
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

class MapWalker {
  constructor(map) {
    this.map = map;
    this.position = {
      // x: this.randomPostion(map.squareLength),
      // y: this.randomPostion(map.squareLength),
      x: 0,
      y: 0,
    };
  }

  randomPostion(length) {
    return Math.ceil(Math.random() * length) + 1;
  }

  moveNorth() {
    if (this.map.grid[this.position.x][this.position.y].canMove.north) {
      this.position.x--;
    } else {
      console.log('You cannot move north from here!');
    }
    return this.position;
  }

  moveSouth() {
    if (this.map.grid[this.position.x][this.position.y].canMove.south) {
      this.position.x++;
    } else {
      console.log('You cannot move south from here!');
    }
    return this.position;
  }

  moveEast() {
    if (this.map.grid[this.position.x][this.position.y].canMove.east) {
      this.position.y++;
    } else {
      console.log('You cannot move east from here!');
    }
    return this.position;
  }

  moveWest() {
    if (this.map.grid[this.position.x][this.position.y].canMove.west) {
      this.position.y--;
    } else {
      console.log('You cannot move west from here!');
    }
    return this.position;
  }
}

let m = new Map(3);
let mw = new MapWalker(m);
console.log(m);
console.log(mw);
