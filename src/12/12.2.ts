import Moon from "./Moon"
import Point3d from "../util/Point3d"
import MoonSystem from "./MoonSystem";

const moonSystem = new MoonSystem([
  new Moon(new Point3d(-6, 2, -9)),
  new Moon(new Point3d(12, -14, -4)),
  new Moon(new Point3d(9, 5, -6)),
  new Moon(new Point3d(-1, -4, 9)),
]);

const cycleLength = moonSystem.calculateCycleLength();

console.log({cycleLength});