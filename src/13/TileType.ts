export enum TileType {
  Empty = "Empty",
  Wall = "Wall",
  Block = "Block",
  HorizontalPaddle = "HorizontalPaddle",
  Ball = "Ball",
}

export function tileTypeFromId(id: number): TileType {
  switch (id) {
    case 0: return TileType.Empty;
    case 1: return TileType.Wall;
    case 2: return TileType.Block;
    case 3: return TileType.HorizontalPaddle;
    case 4: return TileType.Ball;
    default: throw new Error(`Unknown tile type id provided: ${id}`)
  }
}