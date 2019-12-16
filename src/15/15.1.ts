import Maze from './Maze';
import * as fs from 'fs';

const mazeStr = fs.readFileSync("src/15/maze.txt").toString("utf-8");

const maze = new Maze(mazeStr);

debugger;