export interface IPoint {
  x: number,
  y: number
}

export class Point implements IPoint {

  public constructor(public x: number, public y: number) {
  };

  public equals(o: Point): boolean {
    return this.x == o.x && this.y == o.y;
  }

  public static distance(a: Point, b: Point): number {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2))
  }
  
  public static isBetween(test: Point, a: Point, b: Point): boolean {
    const difference = Math.abs(Point.distance(a, test) + Point.distance(test, b) - Point.distance(a, b));
    return difference < .000000000001;
  }
}