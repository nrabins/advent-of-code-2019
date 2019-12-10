export interface IPoint {
  x: number,
  y: number
}

export class Point implements IPoint {

  constructor(public x: number, public y: number) {
  };
}