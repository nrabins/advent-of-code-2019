import { TileType, tileTypeFromId } from './TileType';
import { Computer, IComputer, RunResultType } from './Computer';
import { Dimensions } from '../util/Dimensions';

export interface IArcadeCabinet {
  getTileCount(tileType: TileType): number;
  // printOutput(): void;
}

export default class ArcadeCabinet implements IArcadeCabinet {
  private computer: IComputer;
  private tiles: { [y: number]: { [x: number]: TileType } } = {};
  private score: number = 0;

  constructor(program: string, private inputOverride: number | null = null) {
    this.computer = new Computer(program);
    if (inputOverride != null) {
      this.computer.setInputOverride(inputOverride);
    }
    while(true) {
      this.run();
    }
  }

  private run(): void {
    let instructionCount = 0;
    while (true) {
      instructionCount++;
      const results = this.computer.getNextResults(3);
      if (results.length != 3 || results[0].type == RunResultType.Halt) {
        break;
      }
      const x = results[0].value;
      const y = results[1].value;
      const value = results[2].value;
      
      if (x == -1 && y == 0) {
        this.score = value;
        console.log(this.score);
      } else {
        const tile = tileTypeFromId(value);
        this.addTile(x, y, tile);
      }
    }
  }

  private addTile(x: number, y: number, type: TileType): void {
    if (!this.tiles[y]) {
      this.tiles[y] = {};
    }
    this.tiles[y][x] = type;
  }

  public getTileCount(tileType: TileType): number {
    let count = 0;
    for (const y in this.tiles) {
      for (const x in this.tiles[y]) {
        const tt = this.tiles[y][x];
        if (tt == tileType) {
          count++;
        }
      }
    }
    return count;
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
      if (this.tiles[y]) {
        const chars: string[] = [];
        for (let x = dimensions.left; x <= dimensions.right; x++) {
          let char = " ";
          if (this.tiles[y][x]) {
            char = this.getTileChar(this.tiles[y][x]);
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
    const ys = Object.keys(this.tiles).map(y => parseInt(y, 10));
    const top = Math.min(...ys);
    const bottom = Math.max(...ys);

    const xs: number[] = Object.keys(this.tiles).map(yStr => parseInt(yStr, 10)).reduce((xarr, y) => {
      const rowXs = Object.keys(this.tiles[y]).map(xStr => parseInt(xStr, 10));
      return xarr.concat(rowXs);
    }, [] as number[]);

    const left = Math.min(...xs);
    const right = Math.max(...xs);
    return new Dimensions(left, right, top, bottom);
  }

  private getTileChar(tileType: TileType): string {
    switch (tileType) {
      case TileType.Ball: return "●";
      case TileType.Block: return "░";
      case TileType.Empty: return " ";
      case TileType.HorizontalPaddle: return "=";
      case TileType.Wall: return "█";
      default:
        throw new Error(`Unrecognized tile type: ${tileType}`);
    }
  }

}