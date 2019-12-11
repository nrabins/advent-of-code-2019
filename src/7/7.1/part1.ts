import * as fs from 'fs';
import { Computer } from './Computer';
import { permutator } from '../../util/util';

const program = fs.readFileSync('src/7/input.txt').toString('utf-8');

const AMPLIFIERS = [0, 1, 2, 3, 4]

const maxThrustSignal = getMaxThrustSignal(program);
console.log({maxThrustSignal})

export function getMaxThrustSignal(program: string): number {
  const orders = permutator(AMPLIFIERS);

  let max = Number.MIN_SAFE_INTEGER;
  orders.forEach(order => {
    const signal = getThrustSignal(program, order);
    if (signal > max) {
      max = signal;
      console.log(`Found a new max [${max}] using phase order [${order.join(',')}]`);
    }
  })
  return max;
}

export function getThrustSignal(program: string, phaseSequence: number[]): number {
  let signal = 0;
  
  phaseSequence.forEach(phase => {
    const computer = new Computer(program);
    const outputs = computer.run([phase, signal]);
    if (outputs.length != 1) {
      throw `Got an unexpected number of outputs. Expected 1, got ${outputs.length}`
    }
    signal = outputs[0];
  });

  return signal;
}

/*
const computer = new Computer(originalStrip);
const outputs = computer.run([1]);

console.log(outputs);
console.log(outputs[outputs.length-1]);
*/