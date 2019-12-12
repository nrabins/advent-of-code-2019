import Point3d from "../util/Point3d";

export interface IMoon {
  calculateTotalEnergy(): number;
}

export default class Moon implements IMoon {
  constructor(public position: Point3d = new Point3d(0, 0, 0), public velocity: Point3d = new Point3d(0, 0, 0)) {
  }

  public toString(): string {
    return `pos=<x=${this.position.x}, y=${this.position.y}, z=${this.position.z}>, vel=<x=${this.velocity.x}, y=${this.velocity.y}, z=${this.velocity.z}>`
  }

  public calculateTotalEnergy(): number {
    return this.calculatePotentialEnergy() * this.calculateKineticEnergy();
  }

  private calculatePotentialEnergy(): number {
    return Math.abs(this.position.x) + Math.abs(this.position.y) + Math.abs(this.position.z);
  }

  private calculateKineticEnergy(): number {
    return Math.abs(this.velocity.x) + Math.abs(this.velocity.y) + Math.abs(this.velocity.z);
  }
}
