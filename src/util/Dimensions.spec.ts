import { Dimensions } from './Dimensions';
import { Point } from './Point';

test("Dimensions happy path", () => {
  const points = [
    new Point(-3, 4),
    new Point(5, 7),
    new Point(-1, -1),
    new Point(15, 7)
  ];

  const dimension = Dimensions.fromPoints(points);

  expect(dimension.left).toBe(-3);
  expect(dimension.right).toBe(15);
  expect(dimension.top).toBe(-1);
  expect(dimension.bottom).toBe(7);
})

test("Filled array works", () => {
  const dimensions = new Dimensions(0, 1, 0, 4);
  const value = 9;
  const filledArray = dimensions.fill(value);

  expect(filledArray).toHaveLength(5);
  filledArray.every(row => expect(row).toHaveLength(2));
  filledArray.every(row => row.every(point => expect(point).toBe(value)));
})