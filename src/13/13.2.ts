import * as fs from 'fs';
import ArcadeCabinet from './ArcadeCabinet';

const fileProgram = fs.readFileSync('src/13/input-paddles.txt').toString('utf-8');

const arcadeCabinet = new ArcadeCabinet(fileProgram, 0);
