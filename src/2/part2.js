const fs = require('fs');
const text = fs.readFileSync('2/input.txt').toString('utf-8');

const originalStrip = text.split(',').map(i => parseInt(i, 10));

for (let noun = 0; noun <= 99; noun++) {
  for (let verb = 0; verb <= 99; verb++) {
    getResultForCodes(noun, verb);
  }
}

// getResultForCodes(12, 2);

function getResultForCodes(noun, verb) {
  // reset strip
  const strip = [...originalStrip]
  
  let i = 0;
  
  // overrides
  strip[1] = noun;
  strip[2] = verb;
  
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

  var result = strip[0];
  if (result == 19690720) {
    console.log('the answer is ' + (100 * noun + verb));
  }
}

