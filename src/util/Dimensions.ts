import { Point } from "./Point";

export interface IDimensions {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

/**
 * Describes a rectangle with top and left being negative and bottom and right being positive
 */
export class Dimensions implements IDimensions {
  public constructor(public left: number, public right: number, public top: number, public bottom: number) {
  }

  public static fromPoints(points: Point[]): Dimensions {
    if (points.length == 0) {
      throw new Error("Attempted to find the dimension of an empty list of points");
    }

    let top = Number.MAX_SAFE_INTEGER;
    let left = Number.MAX_SAFE_INTEGER;
    let right = Number.MIN_SAFE_INTEGER;
    let bottom = Number.MIN_SAFE_INTEGER;

    points.forEach(point => {
      top = Math.min(top, point.y);
      bottom = Math.max(bottom, point.y);
      left = Math.min(left, point.x);
      right = Math.max(right, point.x);
    });

    return new Dimensions(left, right, top, bottom);
  }

  /**
   * Fills a 2D array [y][x] with the specified fill value
   * @param fillValue The value to fill the array with
   */
  public fill<T>(fillValue: T) : T[][] {
    const filledArray: T[][] = [];
    for (let y = this.top; y <= this.bottom; y++) {
      const row: T[] = [];
      for (let x = this.left; x <= this.right; x++) {
        row.push(fillValue);
      }
      filledArray.push(row);
    }
    return filledArray;
  }
}