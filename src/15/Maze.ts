import { Point } from "../util/Point";

enum Tile {
  Wall = "Wall",
  Open = "Open"
}

class Cell {
  public distance?: number;
  constructor(public point: Point, public tile: Tile) {
  }
}

class QueueNode {
  constructor(public point: Point, public distance: number) {
  }
}

export default class Maze {
  // Cell[y][x]
  private grid: Cell[][] = [];

  public start?: Point;
  public oxygen?: Point;

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
        row.push(new Cell(new Point(x, y), Maze.parseTile(symbol)))
      }
      this.grid.push(row);
    });
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

  private static rowNum: number[] = [-1, 0, 0, 1];
  private static colNum: number[] = [0, -1, 1, 0];

  public getDistanceBetween(start: Point, end: Point): number | undefined {

    if (this.grid[start.y][start.x].tile == Tile.Wall ||
      this.grid[end.y][end.x].tile == Tile.Wall) {
      return undefined;
    }


    const visited = Maze.initialize2dArray(this.grid, false);
    visited[start.y][start.x] = true;

    const q: QueueNode[] = [];

    q.push(new QueueNode(new Point(start.x, start.y), 0));

    while (q.length > 0) {
      const curr = q[0];
      const pt = curr.point;

      if (pt.equals(end)) {
        return curr.distance;
      }

      q.shift();

      for (let i = 0; i < 4; i++) {
        const row = pt.y + Maze.rowNum[i];
        const col = pt.x + Maze.colNum[i];

        if (this.isValid(row, col) &&
          this.grid[row][col].tile == Tile.Open &&
          !visited[row][col]) {
          visited[row][col] = true;
          q.push(new QueueNode(new Point(col, row), curr.distance + 1))
        }
      }
    }

    return -1;
  }

  private isValid(row: number, col: number): boolean {
    const height = this.grid.length;
    const width = this.grid[0].length;
    return row >= 0 && row < width && col >= 0 && col < height;
  }

  private static initialize2dArray<T>(gridMap: { [y: number]: { [x: number]: any } }, initialValue: T | undefined = undefined): T[][] {
    const arr: T[][] = [];
    Object.keys(gridMap).map(yStr => parseInt(yStr, 10)).forEach(y => {
      const row: T[] = [];
      Object.keys(gridMap[y]).map(xStr => parseInt(xStr, 10)).forEach(x => {
        if (initialValue) {
          row.push(initialValue)
        }
      })
      arr.push(row);
    })
    return arr;
  }

  // I know there are efficient ways to do this, but I have a hammer and this looks quite like a nail
  public getFarthestDistance(point: Point): number {
    let maxDistance = Number.MIN_SAFE_INTEGER;

    const height = this.grid.length;
    const width = this.grid[0].length;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const distance = this.getDistanceBetween(point, new Point(x, y));
        if (distance && distance > maxDistance) {
          console.log(`found new max distance: ${distance}`);
          maxDistance = distance;
        }
      }
    }

    return maxDistance;
  }

}