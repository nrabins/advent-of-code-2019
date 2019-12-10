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
    if (test.equals(a) || test.equals(b)) {
      // We don't consider a point inbetween two points if it IS one of the points
      return false; 
    }
    
    return Point.distance(a, test) + Point.distance(test, b) == Point.distance(a, b);
  }
}