import { Computer, RunResultType } from './Computer';

test("Quine", () => {
  const program = "109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99";
  const computer = new Computer(program);
  const results = computer.runUntilHalt();

  const outputs = results.slice(0, -1);
  expect(outputs.length).toBe(16);
  expect(outputs.every(result => result.type == RunResultType.Output)).toBeTruthy();
  expect(outputs.map(output => output.value.toString()).join(",")).toBe(program); // quine-iness

  const haltResult = results[results.length - 1];
  expect(haltResult.type).toBe(RunResultType.Halt);
});

test("16 digit number", () => {
  const program = "1102,34915192,34915192,7,4,7,99,0";
  const computer = new Computer(program);
  const results = computer.runUntilHalt();

  const outputs = results.slice(0, -1);
  expect(outputs.length).toBe(1);
  expect(outputs.every(result => result.type == RunResultType.Output)).toBeTruthy();
  
  expect(outputs[0].value.toString(10).length).toBe(16); // should have 16 digits

  const haltResult = results[results.length - 1];
  expect(haltResult.type).toBe(RunResultType.Halt);
})

test("large number", () => {
  const program = "104,1125899906842624,99";
  const computer = new Computer(program);
  const results = computer.runUntilHalt();

  const outputs = results.slice(0, -1);
  expect(outputs.length).toBe(1);
  expect(outputs.every(result => result.type == RunResultType.Output)).toBeTruthy();
  expect(outputs[0].value).toBe(1125899906842624); // output the large number in the middle

  const haltResult = results[results.length - 1];
  expect(haltResult.type).toBe(RunResultType.Halt);
})