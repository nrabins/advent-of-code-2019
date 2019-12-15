import ReactionChain, { FUEL, ChemicalAmount } from './ReactionChain';

import * as fs from 'fs';

[
  { fileName: "example1.txt", expected: 31 },
  { fileName: "example2.txt", expected: 165 },
  { fileName: "example3.txt", expected: 13312 },
  { fileName: "example4.txt", expected: 180697 },
  { fileName: "example5.txt", expected: 2210736 }
].forEach(testCase => test((testCase.fileName + " test 1"), () => {
  const file = fs.readFileSync(`src/14/inputs/${testCase.fileName}`).toString('utf-8');
  const reactionChain = new ReactionChain(file);
  const oreCount = reactionChain.getOreFor(new ChemicalAmount(FUEL, 1));
  expect(oreCount).toBe(testCase.expected);
}));

[
  { fileName: "example3.txt", expected: 82892753 },
  { fileName: "example4.txt", expected: 5586022 },
  { fileName: "example5.txt", expected: 460664 }
].forEach(testCase => test((testCase.fileName + " test 2"), () => {
  const file = fs.readFileSync(`src/14/inputs/${testCase.fileName}`).toString('utf-8');
  const reactionChain = new ReactionChain(file);
  const maxFuel = reactionChain.getMaxForOreAmount(FUEL, 1000000000000);
  expect(maxFuel).toBe(testCase.expected);
}));