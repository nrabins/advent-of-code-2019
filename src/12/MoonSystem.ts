import Moon from './Moon';
import MathLib from '../util/MathLib';

export interface IMoonSystem {
  tickMany(number: number): void;
  tick(): void;
  getTotalEnergy(): number;
  calculateCycleLength(): number;
  toString(): string;
}

export default class MoonSystem implements IMoonSystem {
  constructor(public moons: Moon[]) {

  }

  public tickMany(number: number): void {
    for (let i = 0; i < number; i++) {
      this.tick();
    }
  }

  public tick(): void {
    this.applyGravity();
    this.applyVelocity();
  }

  private applyGravity(): void {
    for (let i = 0; i + 1 < this.moons.length; i++) {
      const mi = this.moons[i];
      for (let j = i + 1; j < this.moons.length; j++) {
        const mj = this.moons[j];
        if (mi.position.x < mj.position.x) {
          mi.velocity.x++;
          mj.velocity.x--;
        } else if (mi.position.x > mj.position.x) {
          mi.velocity.x--;
          mj.velocity.x++;
        }

        if (mi.position.y < mj.position.y) {
          mi.velocity.y++;
          mj.velocity.y--;
        } else if (mi.position.y > mj.position.y) {
          mi.velocity.y--;
          mj.velocity.y++;
        }

        if (mi.position.z < mj.position.z) {
          mi.velocity.z++;
          mj.velocity.z--;
        } else if (mi.position.z > mj.position.z) {
          mi.velocity.z--;
          mj.velocity.z++;
        }
      }
    }
  }

  private applyVelocity(): void {
    this.moons.forEach(moon => {
      moon.position.x += moon.velocity.x;
      moon.position.y += moon.velocity.y;
      moon.position.z += moon.velocity.z;
    });
  }

  public getTotalEnergy(): number {
    return this.moons.reduce((sum, moon) => {
      return sum + moon.calculateTotalEnergy();
    }, 0);
  }

  public calculateCycleLength(): number {
    const xs = this.moons.map(moon => new Point(moon.position.x, moon.velocity.x));
    const xCycle = calculateCycle(xs);

    const ys = this.moons.map(moon => new Point(moon.position.y, moon.velocity.y));
    const yCycle = calculateCycle(ys);

    const zs = this.moons.map(moon => new Point(moon.position.z, moon.velocity.z));
    const zCycle = calculateCycle(zs);

    return MathLib.lcm(xCycle, yCycle, zCycle);
  }


  public toString(): string {
    const lines = this.moons.map(moon => moon.toString())

    return lines.join("\r\n");
  }
}

class Point {
  constructor(public position: number, public velocity: number) {
  }

  public equals(other: Point): boolean {
    return this.position == other.position && this.velocity == other.velocity;
  }
}

function calculateCycle(originalPoints: Point[]): number {
  const MAX = 10000000;

  const points = originalPoints.map(point => new Point(point.position, point.velocity));

  let cycleCount = 0;
  do {
    if (cycleCount > MAX) {
      throw new Error(`Didn't find a cycle after ${MAX} cycles`)
    }
    cycleCount++;
    tick(points);
  }
  while (!areIdentical(originalPoints, points));

  return cycleCount;
}

function areIdentical(aPoints: Point[], bPoints: Point[]): boolean {
  return aPoints.every((aPoint, i) => aPoint.equals(bPoints[i]));
}

function tick(points: Point[]): void {
  applyGravity(points);
  applyVelocity(points);
}

function applyGravity(points: Point[]): void {
  for (var i = 0; i + 1 < points.length; i++) {
    const iPoint = points[i];
    for (var j = i + 1; j < points.length; j++) {
      const jPoint = points[j];
      if (iPoint.position < jPoint.position) {
        iPoint.velocity++;
        jPoint.velocity--;
      } else if (iPoint.position > jPoint.position) {
        iPoint.velocity--;
        jPoint.velocity++;
      }
    }
  }
}

function applyVelocity(points: Point[]): void {
  points.forEach(point => point.position += point.velocity);
}
