import { Point } from "../util/Point";

enum Tile {
  Wall = "Wall",
  Open = "Open"
}

class Cell {
  public distance?: number;

  constructor(public tile: Tile) {
  }
}

export default class Maze {
  // Cell[y][x]
  private grid: Cell[][] = [];

  private start?: Point;
  private oxygen?: Point;

  constructor(file: string) {
    this.parse(file);
  }

  private parse(file: string): void {
    const lines = file.split("\r\n");
    
    lines.forEach((line, y) => {
      const row = [];
      for (let x = 0; x < line.length; x++) {
        const symbol = line[x];
        if (symbol == "S") {
          this.start = new Point(x, y)
        } else if (symbol == "o") {
          this.oxygen = new Point(x, y);
        }
        row.push(new Cell(Maze.parseTile(symbol)))
      }
      this.grid.push(row);
    })
    debugger;
  }

  private static parseTile(char: string): Tile {
    switch (char) {
      case "█": 
        return Tile.Wall;
      case ".":
      case "S":
      case "o":
        return Tile.Open;
      default:
        throw new Error(`Unrecognized tile: ${char}`);
    }
  }
}