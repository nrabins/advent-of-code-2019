import * as fs from 'fs';

import Phaser from './Phaser';

const signal = fs.readFileSync('src/16/input.txt').toString("utf-8").repeat(10000);
const offset = parseInt(signal.slice(0, 7), 10);

const signals = new Phaser(signal, offset, 8).getSignals(100);

const lastSignal = signals[100];
const firstDigits = lastSignal.slice(0, 8);

console.log(firstDigits.join(""));
