import * as fs from 'fs';
import ReactionChain, { ChemicalAmount, FUEL } from './ReactionChain';

const file = fs.readFileSync(`src/14/inputs/input.txt`).toString('utf-8');
const reactionChain = new ReactionChain(file);
const fuelCount = reactionChain.getMaxForOreAmount(FUEL, 1000000000000);

console.log({fuelCount});