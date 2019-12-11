import { Point } from '../../util/Point';
import { Dimensions } from '../../util/Dimensions';

import * as fs from 'fs';

export class AsteroidField {

  private constructor(private asteroids: Point[]) {
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
    const otherAsteroids = this.asteroids.filter(asteroid => !asteroid.equals(origin));
    const sortedPoints = Point.getPointsSortedByDistance(origin, otherAsteroids);

    const visited: Point[] = [];
    const raysByAngle: { [key: number]: Point[] } = {};

    sortedPoints.forEach(point => {
      if (visited.includes(point)) {
        return;
      }

      const asteroidsOnRay = Point.getAllOnRay(origin, point, otherAsteroids);
      asteroidsOnRay.sort((a, b) => Point.distance(a, origin) - Point.distance(b, origin));

      visited.push(...asteroidsOnRay);
      const angle = Point.getAngleInDegrees(origin, point);
      const mappedAngle = ((360 - angle) + 90) % 360;

      raysByAngle[mappedAngle] = asteroidsOnRay;
    });

    const rayLists = Object.keys(raysByAngle).map(parseFloat).sort((a, b) => a - b).map(angle => {
      return raysByAngle[angle];
    });

    const vaporized: Point[] = []

    let rayIndex = 0;
    for (let i = 0; i < otherAsteroids.length; i++) {
      const ray = rayLists[rayIndex];
      const nextVaporized = ray.shift() as Point;
       vaporized.push(nextVaporized);
      if (ray.length == 0) {
        rayLists.splice(rayIndex, 1);
        if (rayIndex >= rayLists.length) {
          rayIndex = rayLists.length - 1;
        }
      } else {
        rayIndex++;
        rayIndex %= rayLists.length;
      }

    }


    return vaporized;
  }
}