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
    
    // debugger;
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
      west
    };
  }
}

let m = new Map(5);
console.log(m);
