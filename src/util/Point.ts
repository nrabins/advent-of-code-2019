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

  public toString(): string {
    return `${this.x},${this.y}`;
  }

  public static distance(a: Point, b: Point): number {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2))
  }

  public static isBetween(test: Point, a: Point, b: Point): boolean {
    const difference = Math.abs(Point.distance(a, test) + Point.distance(test, b) - Point.distance(a, b));
    return difference < .000000000001;
  }

  public static getPointsWithDistance(point: Point, otherPoints: Point[]): { point: Point, distance: number }[] {
    const pointsWithDistances = otherPoints.map(otherPoint => ({
      point: otherPoint,
      distance: Point.distance(point, otherPoint)
    }));
    pointsWithDistances.sort((a, b) => a.distance - b.distance);
    return pointsWithDistances;
  }

  public static getPointsSortedByDistance(point: Point, otherPoints: Point[]): Point[] {
    return Point.getPointsWithDistance(point, otherPoints).map(pwd => pwd.point);
  }


  public static getAllOnRay(a: Point, b: Point, allPoints: Point[]) {
    return allPoints.filter(p => Point.isOnRay(p, a, b));
  }

  public static isOnRay(p: Point, a: Point, b: Point): boolean {
    // a point P is on the ray A -> B if:
    //   1) P is between A and B  -OR-
    //   2) B is between A and P
    return Point.isBetween(p, a, b) || Point.isBetween(b, a, p);
  }

  public static getAngleInDegrees(origin: Point, point: Point) {
    // y is inverted because we're dealing with screen orientation (y increases from top to bottom)
    // instead of cartesian orientation (y increases from bottom to top)
    const dy = origin.y - point.y;
    const dx = point.x - origin.x;
    const degrees = Math.atan2(dy, dx) * 180 / Math.PI;
    const normalizedDegrees = (degrees + 360) % 360
    return normalizedDegrees;
  }
}