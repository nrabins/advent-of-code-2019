import { Computer, Result, RunResultType } from '../computer/Computer';
import { Point } from '../util/Point';

enum Tile {
  Empty = "Empty",
  Scaffold = "Scaffold",
  RobotUp = "RobotUp",
  RobotDown = "RobotDown",
  RobotLeft = "RobotLeft",
  RobotRight = "RobotRight",
}

const tileFromAscii = (asciiCode: number): Tile => {
  switch (asciiCode) {
    case 35: return Tile.Scaffold;
    case 46: return Tile.Empty;
    case 60: return Tile.RobotLeft;
    case 62: return Tile.RobotRight;
    case 94: return Tile.RobotUp;
    case 118: return Tile.RobotDown;
    default:
      throw new Error(`Unexpected ascii code: ${asciiCode}`)
  }
}

const charFromTile = (tile: Tile): string => {
  switch (tile) {
    case Tile.Scaffold: return "#";
    case Tile.Empty: return ".";
    case Tile.RobotLeft: return "<";
    case Tile.RobotRight: return ">";
    case Tile.RobotUp: return "^";
    case Tile.RobotDown: return "v";
    default:
      throw new Error(`Unexpected tile: ${tile}`)
  }
}

export default class Scaffold {
  private computer: Computer;

  private grid: Tile[][] = [];

  constructor(program: string) {
    this.computer = new Computer(program);
  }

  public initialize(): void {
    const results = this.computer.runUntilHalt();
    const tileResults = results.slice(0, -1);

    let row: Tile[] = [];
    tileResults.forEach(tileResult => {
      if (tileResult.value == 10) {
        // new line
        this.grid.push(row);
        row = [];
      } else {
        const tile = tileFromAscii(tileResult.value);
        row.push(tile);
      }
    })

    if (row.length > 0) {
      this.grid.push(row);
    }
  }

  public getAlignmentParametersSum(): number {
    const intersections = this.getIntersections();
    const sum = intersections.reduce((sum, intersection) => sum + (intersection.x * intersection.y), 0);
    return sum;
  }

  private getIntersections(): Point[] {
    const points: Point[] = [];
    for (let row = 1; row < this.grid.length - 1; row++) {
      for (let col = 1; col < this.grid[row].length; col++) {
        if (
          this.grid[row - 1][col] == Tile.Scaffold &&
          this.grid[row + 1][col] == Tile.Scaffold &&
          this.grid[row][col - 1] == Tile.Scaffold &&
          this.grid[row][col + 1] == Tile.Scaffold
        ) {
          points.push(new Point(col, row));
        }
      }
    }

    return points;
  }

  public print(): void {
    for (let row = 0; row < this.grid.length; row++) {
      const rowStr = this.grid[row].map(tile => charFromTile(tile)).join("");
      console.log(rowStr);
    }
  }

}