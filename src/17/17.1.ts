import Scaffold from "./Scaffold";
import * as fs from 'fs';

const program = fs.readFileSync('src/17/input.txt').toString('utf-8');

const scaffold = new Scaffold(program);
scaffold.initialize();
scaffold.print();

const sum = scaffold.getAlignmentParametersSum()
console.log({ sum });