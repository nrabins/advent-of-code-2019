import MathLib from './MathLib';

/* GCD */

[
  // { numbers: [1, 2, 3], expected: 6},
  { numbers: [ 2, 4, 6, 8, 16], expected: 48},
  { numbers: [18, 28, 44], expected: 2772},
].forEach(testCase => test(`lcm(${testCase.numbers.join(", ")}) = ${testCase.expected}`, () => {
  const lcm = MathLib.lcm(...testCase.numbers);
  expect(lcm).toBe(testCase.expected);
}));
