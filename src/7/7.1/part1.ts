import * as fs from 'fs';
import { Computer } from './Computer';

const text = fs.readFileSync('src/7/input.txt').toString('utf-8');

const AMPLIFIER_COUNT = 5;

const originalStrip = text.split(',').map((i: string) => parseInt(i, 10));

export const getMaxThrustSignal = (program: string): number => {
  const orders = permutator([1, 2, 3, 4, 5]);
  return 54321;
}

// taken from https://stackoverflow.com/questions/9960908/permutations-in-javascript/20871714#20871714
export const permutator = (inputArr) => {
  let result = [];

  const permute = (arr, m = []) => {
    if (arr.length === 0) {
      result.push(m)
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next))
     }
   }
 }

 permute(inputArr)

 return result;
}
/*
const computer = new Computer(originalStrip);
const outputs = computer.run([1]);

console.log(outputs);
console.log(outputs[outputs.length-1]);
*/