export interface IPoint3d {
  distanceTo(otherPoint: Point3d): number;
}

export default class Point3d implements IPoint3d {
  constructor(public x: number, public y: number, public z: number) {
  }

  public distanceTo(otherPoint: Point3d): number {
    throw new Error("Not implemeted yet");
  }
}