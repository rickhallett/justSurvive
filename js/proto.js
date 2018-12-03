/*

5x5 2D Array Coordinates

0,0   0,1   0,2   0,3   0,4
1,0   1,1   1,2   1,3   1,4
2,0   2,1   2,2   2,3   2,4
3,0   3,1   3,2   3,3   3,4
4,0   4,1   4,2   4,3   4,4

*/

const map = [
  [null, null, null, null, null],
  [null, null, null, null, null],
  [null, null, null, null, null],
  [null, null, null, null, null],
  [null, null, null, null, null],
];

class Map {
  constructor(size){
    this.grid = this.constructGrid(size);
  }

  constructGrid(size){
    const map = [];
    for(let i = 0; i < size; i++) {
      map.push(new Array());
    }
    for(let y = 0; y < size; y++) {
      for(let x = 0; x < size; x++) {
        map[y][x] = null;
      }
    }
    return map;
  }
}


let m = new Map(5);
console.log(m);
