import * as fs from 'fs';
import * as path from 'path';

import { Computer } from './Computer';

const text = fs.readFileSync("src/5/input.txt").toString('utf-8');
// const text = '1002,4,3,4,33';

const originalStrip = text.split(',').map((i: string) => parseInt(i, 10));

const computer = new Computer(originalStrip);
const outputs = computer.run([1]);

console.log(outputs);
console.log(outputs[outputs.length-1]);