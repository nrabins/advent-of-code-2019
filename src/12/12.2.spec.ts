import MoonSystem from './MoonSystem';
import Moon from './Moon';
import Point3d from '../util/Point3d';


test("Example 1", () => {
  const moonSystem = new MoonSystem([
    new Moon(new Point3d(-1, 0, 2)),
    new Moon(new Point3d(2, -10, -7)),
    new Moon(new Point3d(4, -8, 8)),
    new Moon(new Point3d(3, 5, -1)),
  ]);

  const cycleLength = moonSystem.calculateCycleLength();

  expect(cycleLength).toBe(2772);
})


test("Example 2", () => {
  const moonSystem = new MoonSystem([
    new Moon(new Point3d(-8, -10, 0)),
    new Moon(new Point3d(5, 5, 10)),
    new Moon(new Point3d(2, -7, 3)),
    new Moon(new Point3d(9, -8, -3)),
  ]);

  const cycleLength = moonSystem.calculateCycleLength();

  expect(cycleLength).toBe(4686774924);
})