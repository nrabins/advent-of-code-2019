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
  { a: new Point(0, 0), b: new Point(10, 10), test: new Point(5, 5), expected: true, name: "IsBetween: true 2" },
  { a: new Point(5, 7), b: new Point(7, 5), test: new Point(6, 6), expected: true, name: "IsBetween: true 3" },
  { a: new Point(120, 30), b: new Point(8, 2), test: new Point(16, 4), expected: true, name: "IsBetween: true 4" },
  
  // false
  { a: new Point(0, 0), b: new Point(10, 0), test: new Point(0, 0), expected: false, name: "IsBetween: endpoint a" },
  { a: new Point(0, 0), b: new Point(10, 0), test: new Point(10, 0), expected: false, name: "IsBetween: endpoint b" },
  { a: new Point(0, 0), b: new Point(10, 10), test: new Point(3, 4), expected: false, name: "IsBetween: arbitrary 1" },
  { a: new Point(5, 7), b: new Point(7, 5), test: new Point(6, 4), expected: false, name: "IsBetween: arbitrary 2" },
].forEach(testCase => test(testCase.name, () => {
  expect(Point.isBetween(testCase.test, testCase.a, testCase.b)).toBe(testCase.expected);
}))