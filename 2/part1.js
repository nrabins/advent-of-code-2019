const fs = require('fs');
const text = fs.readFileSync('2/input.txt').toString('utf-8');

// const text = '1,1,1,4,99,5,6,0,99';

const strip = text.split(',').map(i => parseInt(i, 10));

let i = 0;

// 1202 program alarm overrides
strip[1] = 12;
strip[2] = 2;

while (strip[i] != 99) {
  if (i+3 >= strip.length) {
    throw "Ran out of strip"
  }

  const operation = strip[i]
  const num1 = strip[strip[i+1]];
  const num2 = strip[strip[i+2]];
  const dest = strip[i+3];
  
  let result;
  if (operation == 1) {
    result = num1 + num2;
} else if (operation == 2) {
    result = num1 * num2;
  } else {
    throw "Unrecognized operation: " + operation
  }

  strip[dest] = result;
  i += 4;
}

console.log(strip.join(','));