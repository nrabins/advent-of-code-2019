import { Point } from './Point';

/* Point.distance */
[
  { a: new Point(0, 0), b: new Point(0, 0), expected: 0, name: "Distance: same point" },
  { a: new Point(0, 0), b: new Point(0, 10), expected: 10, name: "Distance: Y difference" },
  { a: new Point(10, 0), b: new Point(0, 0), expected: 10, name: "Distance: X difference" },
  { a: new Point(0, 0), b: new Point(3, 4), expected: 5, name: "Distance: both difference" },
  { a: new Point(5, 3), b: new Point(8, 7), expected: 5, name: "Distance: both difference, offset" },
].forEach(testCase => test(testCase.name, () => {
  expect(Point.distance(testCase.a, testCase.b)).toBe(testCase.expected);
}));

/* Point.isBetween */
[
  // true
  { a: new Point(0, 0), b: new Point(10, 0), test: new Point(5, 0), expected: true, name: "IsBetween: true 1" },
  { a: new Point(0, 0), b: new Point(10, 0), test: new Point(1, 0), expected: true, name: "IsBetween: true 2" },
  { a: new Point(0, 0), b: new Point(10, 10), test: new Point(5, 5), expected: true, name: "IsBetween: true 3" },
  { a: new Point(5, 7), b: new Point(7, 5), test: new Point(6, 6), expected: true, name: "IsBetween: true 4" },
  { a: new Point(120, 30), b: new Point(8, 2), test: new Point(16, 4), expected: true, name: "IsBetween: true 5" },
  { a: new Point(0, 0), b: new Point(10, 0), test: new Point(0, 0), expected: true, name: "IsBetween: endpoint a" },
  { a: new Point(0, 0), b: new Point(10, 0), test: new Point(10, 0), expected: true, name: "IsBetween: endpoint b" },

  // false
  { a: new Point(0, 0), b: new Point(10, 10), test: new Point(3, 4), expected: false, name: "IsBetween: arbitrary 1" },
  { a: new Point(5, 7), b: new Point(7, 5), test: new Point(6, 4), expected: false, name: "IsBetween: arbitrary 2" },
].forEach(testCase => test(testCase.name, () => {
  expect(Point.isBetween(testCase.test, testCase.a, testCase.b)).toBe(testCase.expected);
}));


test("getPointsWithDistance()", () => {
  const point = new Point(0, 0);
  const otherPoints = [
    new Point(10, 0),
    new Point(0, 0),
    new Point(3, 4),
  ];
  const pointsWithDistance = Point.getPointsWithDistance(point, otherPoints);

  expect(pointsWithDistance[0].distance).toBe(0);
  expect(pointsWithDistance[1].distance).toBe(5);
  expect(pointsWithDistance[2].distance).toBe(10);
});

[
  { a: new Point(0, 0), b: new Point(1, 1), p: new Point(2, 2), expected: true, name: 'isOnRay(): Happy path' },
  { a: new Point(0, 0), b: new Point(1, 1), p: new Point(-1, -1), expected: false, name: 'isOnRay(): On other side of ray' },
  { a: new Point(0, 0), b: new Point(1, 1), p: new Point(0, 0), expected: true, name: 'isOnRay(): point a' },
  { a: new Point(0, 0), b: new Point(1, 1), p: new Point(1, 1), expected: true, name: 'isOnRay(): point b' },
  { a: new Point(0, 0), b: new Point(1, 1), p: new Point(3, -3), expected: false, name: 'isOnRay(): not on ray at all' },
].forEach(testCase => test(testCase.name, () => {
  expect(Point.isOnRay(testCase.p, testCase.a, testCase.b)).toBe(testCase.expected);
}));

[
  { origin: new Point(0, 0), point: new Point(1, 0), expected: 0, name: 'getAngleInDegrees(): 0 degrees' },
  { origin: new Point(0, 0), point: new Point(1, -1), expected: 45, name: 'getAngleInDegrees(): 45 degrees' },
  { origin: new Point(0, 0), point: new Point(0, -1), expected: 90, name: 'getAngleInDegrees(): 90 degrees' },
  { origin: new Point(0, 0), point: new Point(-1, 0), expected: 180, name: 'getAngleInDegrees(): 180 degrees' },
  { origin: new Point(0, 0), point: new Point(0, 1), expected: 270, name: 'getAngleInDegrees(): 270 degrees' },
].forEach(testCase => test(testCase.name, () => {
  expect(Point.getAngleInDegrees(testCase.origin, testCase.point)).toBe(testCase.expected);
}))