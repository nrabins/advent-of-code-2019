import { Point } from './../../../util/Point';
import * as fs from 'fs';

export class AsteroidField {
  private constructor(private asteroids: Point[], private width: number, private height: number) {
  }

  public static fromFile(filePath: string): AsteroidField {
    const str = fs.readFileSync(filePath).toString('utf-8');
    return AsteroidField.fromString(str);
  }
  
  public static fromString(str: string): AsteroidField {
    const asteroids: Point[] = [];

    const rows = str.split('\n');
    for (let row = 0; row < rows.length; row++) {
      let rowAsteroids: Point[] = rows[row].split("").map((char, col) => {
        return char == "#" ? new Point(col, row) : null
      }).filter(point => point != null) as Point[];
      asteroids.push(...rowAsteroids);
    }

    return new AsteroidField(asteroids, rows[0].length, rows.length);
  }

  private countVisibleAsteroids(point: Point): number {
    /* Approach: 
      - Make an 2D array of points representing visible locations
      - Iterate through asteroids from near to far from point
        - First, check the row the asteroid is on starting from the asteroid's x coordinate and working out in both directions
        - Then, check the rows above and below the asteroid's y coordinate, working out.
          (The asteroids within these rows don't have to be checked in any particular order, as they can't occlude one another.)
        - Mark off asteroid as a visible one if it's in the visible location array
        - Mark off all the 'shadows' of the asteroid as non-visible
    */
   
    const visiblePoints: boolean[][] = [];


  }

  /**
   * Find if there are any asteroids between point a and point b on the asteroid field
   * @param a Point
   * @param b Point
   */
  private anyBetween(a: Point, b: Point): boolean {
    // TODO 
    //for ()
  }
}