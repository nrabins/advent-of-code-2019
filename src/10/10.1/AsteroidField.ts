import { Point } from '../../util/Point';
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

  public getBestLocation(): { asteroid: Point | null, visibleAsteroidCount: number } {
    let bestLocation = null;
    let bestLocationVisibleAsteroidCount = Number.MIN_SAFE_INTEGER;

    this.asteroids.forEach(asteroid => {
      const visibleAsteroidCount = this.countVisibleAsteroids(asteroid);
      if (visibleAsteroidCount > bestLocationVisibleAsteroidCount) {
        bestLocation = asteroid;
        bestLocationVisibleAsteroidCount = visibleAsteroidCount;
      }
    });

    return {
      asteroid: bestLocation,
      visibleAsteroidCount: bestLocationVisibleAsteroidCount
    }
  }

  private countVisibleAsteroids(point: Point): number {
    const visibleAsteroids = this.asteroids.filter(asteroid => {
      if (asteroid.equals(point)) 
        return false;
      return !this.anyAsteroidsBetween(point, asteroid);
    })
    return visibleAsteroids.length;
  }

  /**
   * Find if there are any asteroids between point a and point b on the asteroid field
   * @param a Point
   * @param b Point
   */
  private anyAsteroidsBetween(a: Point, b: Point): boolean {
    return this.asteroids
      .filter(asteroid => !asteroid.equals(a) && !asteroid.equals(b))
      .some(test => Point.isBetween(test, a, b));
  }

}