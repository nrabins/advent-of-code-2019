import * as fs from 'fs';
import { Computer, Result, RunResultType } from './Computer';
import Painter from './Painter';
import { Color } from './Color';
import { Direction } from './Direction';

const fileProgram = fs.readFileSync('src/11/input.txt').toString('utf-8');

const painter = new Painter(Color.White);
const computer = new Computer(fileProgram);

while (true) {
  const input = painter.getColor() == Color.Black ? 0 : 1;
  computer.addInput(input);

  const result1 = computer.getNextResult();
  if (result1.type == RunResultType.Halt) {
    // Reached the end of the program
    break;
  } else if (result1.type != RunResultType.Output) {
    throw new Error(`Unexpected result type from paint output: ${result1.type}`);
  }
  const paintColor = result1.value == 0 ? Color.Black : Color.White;

  const result2 = computer.getNextResult();
  if (result2.type != RunResultType.Output) {
    throw new Error(`Unexpected result type from turn output: ${result2.type}`);
  }
  const turnDirection = result2.value == 0 ? Direction.Left : Direction.Right;

  painter.paint(paintColor);
  painter.turnAndMove(turnDirection);
}

painter.printOutput();
