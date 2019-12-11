import { Point } from '../../util/Point';
import { Dimensions } from '../../util/Dimensions';

import * as fs from 'fs';

export class AsteroidField {
  private dimensions: Dimensions;

  private constructor(private asteroids: Point[]) {
    this.dimensions = Dimensions.fromPoints(asteroids);
  }

  public static fromFile(filePath: string): AsteroidField {
    const str = fs.readFileSync(filePath).toString('utf-8');
    return AsteroidField.fromString(str);
  }

  public static fromString(str: string): AsteroidField {
    const asteroids: Point[] = [];

    const rows = str.split('\r\n');
    for (let row = 0; row < rows.length; row++) {
      let rowAsteroids: Point[] = rows[row].split("").map((char, col) => {
        return char == "#" ? new Point(col, row) : null
      }).filter(point => point != null) as Point[];
      asteroids.push(...rowAsteroids);
    }

    return new AsteroidField(asteroids);
  }

  public getVaporizationOrder(origin: Point): Point[] {
    const sortedPoints = Point.getPointsSortedByDistance(origin, this.asteroids)
      .filter(point => !point.equals(origin));

    const visited: Point[] = [];
    const rays: { angleInDegrees: number, points: Point[] } = {};

    sortedPoints.forEach(point => {
      if (visited.includes(point)) {
        return;
      }

      const asteroidsOnRay = Point.getAllOnRay(origin, point, this.asteroids);
      const angle = Point.getAngleInDegrees(origin, point);
    })


    // const rays = this.getRays(origin);
    return rays;
  }


  // public getRays(origin: Point): Point[][] {
  //   let maxDistanceToWall = Number.MIN_SAFE_INTEGER;
  //   maxDistanceToWall = Math.max(maxDistanceToWall, origin.x - this.dimensions.left);
  //   maxDistanceToWall = Math.max(maxDistanceToWall, this.dimensions.right - origin.x);
  //   maxDistanceToWall = Math.max(maxDistanceToWall, origin.y - this.dimensions.top);
  //   maxDistanceToWall = Math.max(maxDistanceToWall, this.dimensions.bottom - origin.y);

  //   for (let ringDistance = 1; ringDistance <= maxDistanceToWall; ringDistance++) {
  //     const ring = this.getRing(origin, ringDistance);
  //   }

  // }

  // public getRing(origin: Point, distance: number): Point[] {

  //   const ring: Point[] = [];
  //   // top
  //   if (origin.y - distance >= this.dimensions.top) {
  //     const left = Math.max(this.dimensions.left, origin.x-distance);
  //     const right = Math.min
  //   }

  //   // bottom

  //   // left

  //   // right


  //   return ring;
  // }
}