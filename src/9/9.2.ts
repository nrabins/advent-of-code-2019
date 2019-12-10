import * as fs from 'fs';
import { Computer } from './Computer';

const fileProgram = fs.readFileSync('src/9/input.txt').toString('utf-8');

const computer = new Computer(fileProgram);
computer.addInput(2);
const results = computer.runUntilHalt();

console.log({ results })


