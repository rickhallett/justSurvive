/*

5x5 2D Array Coordinates

0,0   0,1   0,2   0,3   0,4
1,0   1,1   1,2   1,3   1,4
2,0   2,1   2,2   2,3   2,4
3,0   3,1   3,2   3,3   3,4
4,0   4,1   4,2   4,3   4,4

*/







let m = new Map(10);
let mw = new MapWalker(m);
console.log(m);
console.log(mw);
mw.printMap();
mw.printAvailableDirections();
