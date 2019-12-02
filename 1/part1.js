const fs = require('fs');
const text = fs.readFileSync('1/input.txt').toString('utf-8');
const lines = text.split('\n');

let sum = 0;

lines.forEach(line => {
  const num = parseInt(line);
  const modified = Math.floor(num/3)-2;
  sum += modified;
})

console.log(sum);