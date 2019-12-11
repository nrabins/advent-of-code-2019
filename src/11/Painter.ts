import { Color } from "./Color";
import { Direction } from "./Direction";
import { Point } from "../util/Point";


export interface IPainter {
  getColor(): Color;
  paint(color: Color): void;
  turnAndMove(direction: Direction): void;
  getTotalPainted(): number;

}

export default class Painter implements IPainter {
  private colorByPoint: { [x: number]: { [y: number]: Color } } = {};
  private point: Point = new Point(0, 0);
  private facing: Direction = Direction.Up;
  
  public getColor(): Color {
    if (this.colorByPoint[this.point.x]) {
      return this.colorByPoint[this.point.x][this.point.y] || Color.Black;
    }
    return Color.Black;
  }

  public paint(color: Color): void {
    if (!this.colorByPoint[this.point.x]) {
      this.colorByPoint[this.point.x] = {};
    }
    this.colorByPoint[this.point.x][this.point.y] = color;
  }
  
  getTotalPainted(): number {
    let sum = 0;
    for (const x in this.colorByPoint) {
      sum += Object.keys(this.colorByPoint[x]).length;
    }
    return sum;
  }
  
  public turnAndMove(direction: Direction): void {
    if (direction != Direction.Left && direction != Direction.Right) {
      throw new Error(`Attempted to turn an unsupported direction: ${direction}`);
    }
    
    this.turn(direction);
    this.move(1);
  }
  
  private turn(direction: Direction): void {
    switch (direction) {
      case Direction.Left: this.turnLeft(); break;
      case Direction.Right: this.turnRight(); break;
      default:
        throw new Error(`Unsupported direction in turn(): ${direction}`)
      }
    }
    
    private turnLeft(): void {
      switch (this.facing) {
        case Direction.Up:
          this.facing = Direction.Left;
          break;
      case Direction.Left:
        this.facing = Direction.Down;
        break;
      case Direction.Down:
        this.facing = Direction.Right;
        break;
      case Direction.Right:
        this.facing = Direction.Up;
        break;
      default:
        throw new Error(`Unsupported direction in turnLeft(): ${this.facing}`);
    }
  }

  private turnRight(): void {
    switch (this.facing) {
      case Direction.Up:
        this.facing = Direction.Right;
        break;
      case Direction.Left:
        this.facing = Direction.Up;
        break;
      case Direction.Down:
        this.facing = Direction.Left;
        break;
      case Direction.Right:
        this.facing = Direction.Down;
        break;
      default:
        throw new Error(`Unsupported direction in turnRight(): ${this.facing}`);
    }
  }

  private move(distance: number): void {
    switch (this.facing) {
      case Direction.Up:
        this.point.y += distance;
        break;
      case Direction.Left:
        this.point.x -= distance;
        break;
      case Direction.Down:
        this.point.y -= distance;
        break;
      case Direction.Right:
        this.point.x += distance;
        break;
      default:
        throw new Error(`Unsupported direction in move(): : ${this.facing}`);
    }
  }

}