import { Instruction, Operation, Parameter, ParameterMode } from "./Instruction";

export enum RunResultType {
  Output = "Output",
  Halt = "Halt"
}

export interface IResult {
  type: RunResultType;
  value: number;
}

export class Result implements IResult {
  constructor(public type: RunResultType, public value: number = -1) {
  }
}

export interface IComputer {
  addInput(input: number): void;
  getNextResult(): Result;
  getNextResults(numberOfResults: number): Result[];
  getLastResult(): Result | null;
  runUntilHalt(): Result[];
}

export class Computer implements IComputer {

  private strip: number[];
  private instructionPointer: number = 0;
  private relativeBase: number = 0;

  private inputs: number[] = []
  private result: Result | null = null;

  constructor(program: string) {
    this.instructionPointer = 0;
    this.inputs = [];
    this.strip = program.split(",").map(num => parseInt(num, 10));
  }

  public addInput(input: number): void {
    this.inputs.push(input);
  }

  public getNextResult(): Result {
    this.result = null;

    while (this.result == null) {
      const instruction = new Instruction(this.strip, this.instructionPointer);
      this.executeInstruction(instruction);
    }

    return this.result;
  }

  public getNextResults(numberOfResults: number): Result[] {
    const results: Result[] = [];
    for (let i = 0; i < numberOfResults; i++) {
      const result = this.getNextResult();
      results.push(result);
      if (result.type == RunResultType.Halt) {
        break;
      }
    }
    return results;
  }

  public getLastResult(): Result | null {
    return this.result;
  }

  runUntilHalt(): Result[] {
    const results: Result[] = [];

    let result: Result;
    do {
      result = this.getNextResult();
      results.push(result);
    } while (result != null && result.type != RunResultType.Halt);

    return results;
  }

  private executeInstruction(instruction: Instruction): void {
    switch (instruction.operation) {
      case Operation.Add:
        this.executeAdd(instruction);
        return;
      case Operation.Multiply:
        this.executeMultiply(instruction);
        return;
      case Operation.Input:
        this.executeInput(instruction);
        return;
      case Operation.Output:
        this.executeOutput(instruction);
        return;
      case Operation.JumpIfTrue:
        this.executeJumpIfTrue(instruction);
        return;
      case Operation.JumpIfFalse:
        this.executeJumpIfFalse(instruction);
        return;
      case Operation.LessThan:
        this.executeLessThan(instruction);
        return;
      case Operation.Equals:
        this.executeEquals(instruction);
        return;
      case Operation.AdjustRelativeBase:
        this.executeAdjustRelativeBase(instruction);
        return;
      case Operation.Halt:
        this.executeHalt()
        return;
      default:
        throw new Error(`Unrecognized operation: ${instruction.operation}`);
    }
  }

  private executeHalt() {
    this.result = new Result(RunResultType.Halt);
  }

  private executeAdd(instruction: Instruction) {
    if (instruction.parameters.length != 3) {
      throw new Error(`Unexpected number of parameters for add, expected 3, got ${instruction.parameters.length}`);
    }
    const addend1 = this.getParameterValue(instruction.parameters[0])
    const addend2 = this.getParameterValue(instruction.parameters[1]);
    const result = addend1 + addend2;

    this.writeToStrip(instruction.parameters[2], result);
    this.moveToNextInstruction(instruction);
  }

  private executeMultiply(instruction: Instruction) {
    if (instruction.parameters.length != 3) {
      throw new Error(`Unexpected number of parameters for multiply, expected 3, got ${instruction.parameters.length}`);
    }
    const factor1 = this.getParameterValue(instruction.parameters[0])
    const factor2 = this.getParameterValue(instruction.parameters[1]);
    const result = factor1 * factor2;

    this.writeToStrip(instruction.parameters[2], result);
    this.moveToNextInstruction(instruction);
  }

  private executeInput(instruction: Instruction) {
    if (this.inputs.length == 0) {
      throw new Error("Ran out of inputs");
    }
    if (instruction.parameters.length != 1) {
      throw new Error(`Unexpected number of parameters for input, expected 1, got ${instruction.parameters.length}`);
    }
    
    const input = this.inputs.shift() as number;
    this.writeToStrip(instruction.parameters[0], input);
    this.moveToNextInstruction(instruction);
  }

  private executeOutput(instruction: Instruction) {
    if (instruction.parameters.length != 1) {
      throw new Error(`Unexpected number of parameters for output, expected 1, got ${instruction.parameters.length}`);
    }
    const value = this.getParameterValue(instruction.parameters[0]);
    this.result = new Result(RunResultType.Output, value);
    this.moveToNextInstruction(instruction);
  }

  private executeJumpIfTrue(instruction: Instruction) {
    if (instruction.parameters.length != 2) {
      throw new Error(`Unexpected number of parameters for jump if true, expected 2, got ${instruction.parameters.length}`);
    }

    const value = this.getParameterValue(instruction.parameters[0]);
    if (value != 0) {
      this.instructionPointer = this.getParameterValue(instruction.parameters[1]);
    } else {
      this.moveToNextInstruction(instruction);
    }
  }

  private executeJumpIfFalse(instruction: Instruction) {
    if (instruction.parameters.length != 2) {
      throw new Error(`Unexpected number of parameters for jump if false, expected 2, got ${instruction.parameters.length}`);
    }

    const value = this.getParameterValue(instruction.parameters[0]);
    if (value == 0) {
      this.instructionPointer = this.getParameterValue(instruction.parameters[1]);
    } else {
      this.moveToNextInstruction(instruction);
    }
  }

  private executeLessThan(instruction: Instruction) {
    if (instruction.parameters.length != 3) {
      throw new Error(`Unexpected number of parameters for less than, expected 3, got ${instruction.parameters.length}`);
    }

    const compare1 = this.getParameterValue(instruction.parameters[0])
    const compare2 = this.getParameterValue(instruction.parameters[1]);
    const result = compare1 < compare2 ? 1 : 0;

    this.writeToStrip(instruction.parameters[2], result);
    this.moveToNextInstruction(instruction);
  }

  private executeEquals(instruction: Instruction) {
    if (instruction.parameters.length != 3) {
      throw new Error(`Unexpected number of parameters for equals, expected 3, got ${instruction.parameters.length}`);
    }

    const compare1 = this.getParameterValue(instruction.parameters[0])
    const compare2 = this.getParameterValue(instruction.parameters[1]);
    const result = compare1 == compare2 ? 1 : 0;

    this.writeToStrip(instruction.parameters[2], result);
    this.moveToNextInstruction(instruction);
  }

  private executeAdjustRelativeBase(instruction: Instruction) {
    if (instruction.parameters.length != 1) {
      throw new Error(`Unexpected number of parameters for adjust relative base, expected 1, got ${instruction.parameters.length}`);
    }

    const adjustmentAmount = this.getParameterValue(instruction.parameters[0]);
    this.relativeBase += adjustmentAmount;
    this.moveToNextInstruction(instruction);
  }

  private getParameterValue(parameter: Parameter): number {
    if (parameter.parameterMode == ParameterMode.Immediate) {
      return parameter.value;
    }

    if (parameter.parameterMode == ParameterMode.Position || parameter.parameterMode == ParameterMode.Relative) {
      const position = parameter.parameterMode == ParameterMode.Position
        ? parameter.value
        : parameter.value + this.relativeBase;

      if (position < 0) {
        throw new Error("Attempted to read from a position less than zero");
      }

      if (position >= this.strip.length) {
        this.expandStrip(position);
      }

      return this.strip[position];
    }

    throw new Error(`Unrecognized parameter mode: ${parameter.parameterMode}`);
  }

  private writeToStrip(parameter: Parameter, value: number): void {
    if (parameter.parameterMode == ParameterMode.Immediate) {
      throw new Error("Attempted to write data in immediate mode. This is not allowed.");
    }

    if (parameter.parameterMode == ParameterMode.Position || parameter.parameterMode == ParameterMode.Relative) {
      const position = parameter.parameterMode == ParameterMode.Position
        ? parameter.value
        : parameter.value + this.relativeBase;

      if (position < 0) {
        throw new Error("Attempted to write to a position less than zero");
      }

      if (position >= this.strip.length) {
        this.expandStrip(position);
      }

      this.strip[position] = value;
      return;
    }

    throw new Error(`Unrecognized parameter mode: ${parameter.parameterMode}`);

  }

  private expandStrip(size: number): void {
    const amountToAdd = size - this.strip.length + 1;
    const newZeroes: number[] = new Array(amountToAdd).fill(0);
    this.strip = this.strip.concat(newZeroes);
  }

  private moveToNextInstruction(instruction: Instruction): void {
    this.instructionPointer += instruction.parameters.length + 1;
  }

  private stripStr() {
    return this.strip.map((num, index) => {
      const isInstruction = this.instructionPointer == index;
      let str = "";
      if (isInstruction)
        str += "["
      str += num;
      if (isInstruction)
        str += "]";
      return str
    }).join(",");
  }
}