import * as fs from 'fs';

import Phaser from './Phaser';

const signal = fs.readFileSync('src/16/input.txt').toString("utf-8").repeat(10000);
const offset = parseInt(signal.slice(0, 7), 10);

if (offset <= signal.length / 2) {
  throw new Error("offset less than half, can't use heuristic")
}

const signals = new Phaser(signal).getOffsetSignalsViaHeuristic(offset, 100);

const lastSignal = signals[100];
const firstDigits = lastSignal.slice(0, 8);

console.log(firstDigits.join(""));
