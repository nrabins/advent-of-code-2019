import { Computer, RunResultType } from "../computer/Computer";
import { Direction } from "../util/Direction";
import { Point } from "../util/Point";
import { Dimensions } from "../util/Dimensions";



enum TileType {
  Open = "Open",
  Wall = "Wall",
  Oxygen = "Oxygen"
}

export default class MazeGenerator {
  private computer: Computer

  private grid: { [y: number]: { [x: number]: TileType } } = {};
  private point: Point = new Point(0, 0);

  constructor(program: string) {
    this.computer = new Computer(program);
  }

  public scout(moves: number): void {
    let count = 0;
    while (count <= moves) {
      if (count % (moves/100) == 0) {
        console.log(`${Math.floor(count/moves*100)}%`);
      }
      count++;

      const directionRand = Math.random()
      if (directionRand > .75) {
        this.move(Direction.Up);
      } else if (directionRand > .5) {
        this.move(Direction.Down)
      } else if (directionRand > .25) {
        this.move(Direction.Left)
      } else {
        this.move(Direction.Right)
      }
    }

    this.printOutput();
  }

  private move(direction: Direction): void {
    this.computer.addInput(MazeGenerator.getCommandForDirection(direction));
    const result = this.computer.getNextResult()
    if (result.type != RunResultType.Output) {
      throw new Error(`Received result of type ${result.type} when we shouldn't have.`)
    }

    const testPoint = new Point(this.point.x, this.point.y);
    switch (direction) {
      case Direction.Left: testPoint.x--; break;
      case Direction.Right: testPoint.x++; break;
      case Direction.Up: testPoint.y--; break;
      case Direction.Down: testPoint.y++; break;
      default:
        throw new Error(`Unrecognized direction: ${direction}`)
    }

    const tileType = MazeGenerator.getTileTypeForStatus(result.value);
    this.recordTile(tileType, testPoint);

    switch (tileType) {
      case TileType.Wall:
        break;
      case TileType.Open:
      case TileType.Oxygen:
        this.point = testPoint;
        break;
      default:
        throw new Error(`Unrecognized TileType: ${tileType}`)
    }
  }

  private recordTile(tileType: TileType, point: Point): void {
    if (!this.grid[point.y]) {
      this.grid[point.y] = {};
    }
    this.grid[point.y][point.x] = tileType;
  }

  private static getCommandForDirection(direction: Direction): number {
    switch (direction) {
      case Direction.Up: return 1;
      case Direction.Down: return 2;
      case Direction.Left: return 3;
      case Direction.Right: return 4;
      default:
        throw new Error(`Unrecognized direction: ${direction}`)
    }
  }

  private static getTileTypeForStatus(status: number): TileType {
    switch (status) {
      case 0: return TileType.Wall;
      case 1: return TileType.Open;
      case 2: return TileType.Oxygen;
      default:
        throw new Error(`Unrecognized status: ${status}`);
    }
  }

  public printOutput(): void {
    const lines = this.getOutputAsLines();
    lines.forEach(line => console.log(line));
  }

  private getOutputAsLines(): string[] {
    const dimensions = this.getDimensions();
    const lines: string[] = [];

    for (let y = dimensions.top; y <= dimensions.bottom; y++) {
      let line = "";
      if (this.grid[y]) {
        const chars: string[] = [];
        for (let x = dimensions.left; x <= dimensions.right; x++) {
          let char = " ";
          if (this.grid[y][x]) {
            char = this.getTileChar(this.grid[y][x]);
          }
          if (x == 0 && y == 0) {
            char = "S"
          }
          chars.push(char);
        }
        line = chars.join("");
      } else {
        line = "\r\n";
      }
      lines.push(line);
    }

    return lines;
  }

  private getDimensions(): Dimensions {
    const ys = Object.keys(this.grid).map(y => parseInt(y, 10));
    const top = Math.min(...ys);
    const bottom = Math.max(...ys);

    const xs: number[] = Object.keys(this.grid).map(yStr => parseInt(yStr, 10)).reduce((xarr, y) => {
      const rowXs = Object.keys(this.grid[y]).map(xStr => parseInt(xStr, 10));
      return xarr.concat(rowXs);
    }, [] as number[]);

    const left = Math.min(...xs);
    const right = Math.max(...xs);
    return new Dimensions(left, right, top, bottom);
  }

  private getTileChar(tileType: TileType): string {
    switch (tileType) {
      case TileType.Open: return ".";
      case TileType.Wall: return "█";
      case TileType.Oxygen: return "o";
      default:
        throw new Error(`Unrecognized tile type: ${tileType}`);
    }
  }
}

import * as fs from 'fs';
const program = fs.readFileSync("src/15/input.txt").toString("utf-8");
const mazeGenerator = new MazeGenerator(program);
mazeGenerator.scout(1000000);