import Maze from './Maze';
import * as fs from 'fs';
import { Point } from '../util/Point';

const mazeStr = fs.readFileSync("src/15/maze.txt").toString("utf-8");
const maze = new Maze(mazeStr);
const distance = maze.getDistanceBetween(maze.start as Point,  maze.oxygen as Point);
console.log({ distance });