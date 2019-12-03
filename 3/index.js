const fs = require('fs');
const text = fs.readFileSync('3/input.txt').toString('utf-8');

const wires = text.split('\n').map(wireText => {
  return wireText.split(',').map(text => {
    return {
      direction: text[0],
      distance: parseInt(text.slice(1), 10)
    }
  });
});

let p = { x: 0, y: 0};
let wire1tiles = [];
wires[0].forEach(instruction => {
  for (let i = 0; i < instruction.distance; i++) {
    switch (instruction.direction) {
      case "U": p.y++; break;
      case "D": p.y--; break;
      case "L": p.x--; break;
      case "R": p.x++; break;
    }
    wire1tiles.push(p);
  }
});

p = { x: 0, y: 0};
let intersections = [];
wires[1].forEach((instruction, index) => {
  console.log(`${index}/${wires[1].length}`);
  for (let i = 0; i < instruction.distance; i++) {
    switch (instruction.direction) {
      case "U": p.y++; break;
      case "D": p.y--; break;
      case "L": p.x--; break;
      case "R": p.x++; break;
    }
    if (wire1tiles.some(tile => tile.x == p.x && tile.y == p.y)) {
      intersections.push(Object.assign({}, p));
    }
  }
});



console.log(wires);