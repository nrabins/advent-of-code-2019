import { permutator } from "../util/util";
import { Computer, Result, RunResultType } from "./Computer";

const AMPLIFIERS = [5, 6, 7, 8, 9]

export function getMaxThrustSignal(program: string): number {
  const orders = permutator(AMPLIFIERS);

  let max = Number.MIN_SAFE_INTEGER;
  orders.forEach(order => {
    const signal = getThrustSignal(program, order);
    if (signal > max) {
      max = signal;
      console.log(`Found a new max [${max}] using phase order ${order.join(',')}`);
    }
  })
  return max;
}

export function getThrustSignal(program: string, phaseSequence: number[]): number {
  const computers: { computer: Computer, lastSignal: number | null }[] = [];

  phaseSequence.forEach(phase => {
    const computer = new Computer(program);
    computer.addInput(phase);

    computers.push({
      computer,
      lastSignal: null
    })
  });

  let computerIndex = 0;
  let signal = 0;
  let result: Result | null = null;

  while (result == null || result.type == RunResultType.Output) {
    const computer = computers[computerIndex].computer;
    computer.addInput(signal);
    result = computer.getNextResult();
    if (result.type == RunResultType.Output && result.value) {
      signal = computers[computerIndex].lastSignal = result.value;
    }
    computerIndex = (computerIndex + 1) % computers.length;
  }

  const lastComputerResult = computers[computers.length - 1].lastSignal;
  return lastComputerResult || 0;
}
