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

  moonSystem.tickMany(10);
  const totalEnergy = moonSystem.getTotalEnergy();

  expect(totalEnergy).toBe(179);
})