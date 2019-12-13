import * as fs from 'fs';
import ArcadeCabinet from './ArcadeCabinet';
import { TileType } from './TileType';

const fileProgram = fs.readFileSync('src/13/input.txt').toString('utf-8');

const arcadeCabinet = new ArcadeCabinet(fileProgram);

const blockCount = arcadeCabinet.getTileCount(TileType.Block);

console.log({ blockCount });