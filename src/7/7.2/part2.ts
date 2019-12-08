import * as fs from 'fs';
import { getMaxThrustSignal } from './ComputerArray';

const fileProgram = fs.readFileSync('src/7/input.txt').toString('utf-8');

const maxThrustSignal = getMaxThrustSignal(fileProgram);
console.log({ maxThrustSignal })
