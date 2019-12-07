const fs = require('fs');
const text = fs.readFileSync('input').toString('utf-8');
const lines = text.split('\n');

let sum = 0;

lines.forEach(line => {
  const num = parseInt(line);
  sum += fuelForMass(num);
})

console.log(sum);


function fuelForMass(mass) {
  const additionalFuel = Math.floor(mass/3)-2;
  if (additionalFuel > 0) {
    return additionalFuel + fuelForMass(additionalFuel);
  } else {
    return 0;
  }
}