import { AsteroidField } from '../AsteroidField';
import { Point } from '../../../../util/Point';

[
  { name: "Example 1", path: "src/10/10.1/tests/example1.txt", expected: { x: 3, y: 4, count: 8 } },
  { name: "Example 2", path: "src/10/10.1/tests/example2.txt", expected: { x: 5, y: 8, count: 33 } },
  { name: "Example 3", path: "src/10/10.1/tests/example3.txt", expected: { x: 1, y: 2, count: 35 } },
  { name: "Example 4", path: "src/10/10.1/tests/example4.txt", expected: { x: 6, y: 3, count: 41 } },
  { name: "Example 5", path: "src/10/10.1/tests/example5.txt", expected: { x: 11, y: 13, count: 210 } },
].forEach(testCase => test(testCase.name, () => {
  const field = AsteroidField.fromFile(testCase.path);
  const bestLocation = field.getBestLocation();

  expect(bestLocation).not.toBeNull();
  bestLocation.asteroid = bestLocation.asteroid as Point;

  expect(bestLocation.asteroid.x).toBe(testCase.expected.x);
  expect(bestLocation.asteroid.y).toBe(testCase.expected.y);
  expect(bestLocation.visibleAsteroidCount).toBe(testCase.expected.count);
}));