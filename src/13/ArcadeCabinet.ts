import { TileType, tileTypeFromId } from './TileType';
import { Computer, IComputer, RunResultType } from './Computer';

export interface IArcadeCabinet {
  getTileCount(tileType: TileType): number;
  // printOutput(): void;
}

export default class ArcadeCabinet implements IArcadeCabinet {
  private computer: IComputer;
  private tiles: { [y: number]: { [x: number]: TileType } } = {};

  constructor(program: string) {
    this.computer = new Computer(program);
    this.initialize();
  }

  private initialize(): void {

    while (true) {
      const results = this.computer.getNextResults(3);
      if (results.length != 3 || results[0].type == RunResultType.Halt) {
        break;
      }
      const x = results[0].value;
      const y = results[1].value;
      const type = tileTypeFromId(results[2].value);

      this.addTile(x, y, type);
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

  // public printOutput(): void {
  //   const lines = this.getOutputAsLines();
  //   lines.forEach(line => console.log(line));
  // }

  // private getOutputAsLines(): string[] {

  //   const lines = Object.keys(this.tiles).map(y => parseInt(y, 10)).sort((a, b) => b - a).map(y => {
  //     // TODO: sort and save to line
  //     let line = "";
  //     for (let x = 0; x <= max; x++) {
  //       line += rows[y].includes(x) ? "█" : " ";
  //     };
  //     return line;
  //   })

  //   return lines;
  // }

  // private getTileChar(tileType: TileType): string {

  // }

}