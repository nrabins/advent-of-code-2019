import { AsteroidField } from './AsteroidField';

const asteroidField = AsteroidField.fromFile("src/10/input.txt");

const bestLocation = asteroidField.getBestLocation();
console.log({bestLocation}) // (25, 31)