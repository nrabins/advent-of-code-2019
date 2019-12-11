import { AsteroidField } from './AsteroidField';
import { Point } from '../../util/Point';

const asteroidField = AsteroidField.fromFile("src/10/input.txt");

const vaporizeOrder = asteroidField.getVaporizationOrder(new Point(25, 31)); // from part 1
const asteroid = vaporizeOrder[199];

console.log(`200th asteroid to be destroyed = ${asteroid}`)

console.log(`problem answer = ${asteroid.x * 100 + asteroid.y}`)
