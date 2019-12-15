import * as fs from 'fs';
import ReactionChain, { ChemicalAmount, FUEL } from './ReactionChain';

const file = fs.readFileSync(`src/14/inputs/input.txt`).toString('utf-8');
const reactionChain = new ReactionChain(file);
const oreCount = reactionChain.getOreFor(new ChemicalAmount(FUEL, 1));

console.log({oreCount});