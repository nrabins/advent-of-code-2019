import Phaser from './Phaser';

test('Phaser works', () => {
  const input = '12345678';
  const signals = new Phaser(input).getSignals(4);
  expect(signals).toHaveLength(5);
  expect(signals[0].join("")).toBe(input);
  expect(signals[1].join("")).toBe('48226158')
  expect(signals[2].join("")).toBe('34040438')
  expect(signals[3].join("")).toBe('03415518')
  expect(signals[4].join("")).toBe('01029498')
});

[
  { repeatCount: 1, start: 0, end: 7, expected: [1, 0, -1, 0, 1, 0, -1, 0], name: 'Single repeat in range' },
  { repeatCount: 1, start: 1, end: 8, expected: [0, -1, 0, 1, 0, -1, 0, 1], name: 'Single repeat in range, offset 1' },
  { repeatCount: 1, start: 9, end: 16, expected: [0, -1, 0, 1, 0, -1, 0, 1], name: 'Single repeat outside range, offset 1' },
  { repeatCount: 2, start: 0, end: 7, expected: [0, 1, 1, 0, 0, -1, -1, 0], name: 'Double repeat in range' },
  { repeatCount: 2, start: 1, end: 8, expected: [1, 1, 0, 0, -1, -1, 0, 0], name: 'Double repeat in range, offset 1' },
  { repeatCount: 2, start: 9, end: 16, expected: [1, 1, 0, 0, -1, -1, 0, 0], name: 'Double repeat outside range, offset 1' },
].forEach(testCase => test(testCase.name, () => {
  const pattern = Phaser.patternForRange(testCase.start, testCase.end, testCase.repeatCount);
  expect(pattern).toHaveLength(testCase.end - testCase.start + 1);
  pattern.forEach((p, i) => {
    expect(p).toBe(testCase.expected[i]);
  })
}));