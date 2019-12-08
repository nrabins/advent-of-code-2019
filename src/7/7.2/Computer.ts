import { Instruction, Operation, Parameter, ParameterMode } from "./Instruction";

export enum RunResultType {
  Output = "Output",
  Halt = "Halt"
}

export interface IResult {
  type: RunResultType;
  value?: number;
}

export class Result {
  constructor(public type: RunResultType, public value?: number) {
  }
}

export interface IComputer {
  addInput(input: number): void;
  getNextResult(): Result;
  getLastResult(): Result | null;
}

export class Computer implements IComputer {

  private strip: number[];

  private i: number = 0;
  private inputs: number[] = []
  private result: Result | null = null;

  constructor(program: string) {
    this.i = 0;
    this.inputs = [];
    this.strip = program.split(",").map(num => parseInt(num, 10));
  }

  public addInput(input: number): void {
    this.inputs.push(input);
  }

  public getNextResult(): Result {
    this.result = null;

    while (this.result == null) {
      const instruction = new Instruction(this.strip, this.i);
      this.executeInstruction(instruction);
    }

    return this.result;
  }

  public getLastResult(): Result | null {
    return this.result;
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
      case Operation.Halt:
        this.executeHalt()
        return;
      default:
        throw `Unrecognized operation: ${instruction.operation}`
    }
  }

  private executeHalt() {
    this.result = new Result(RunResultType.Halt);
  }

  private executeAdd(instruction: Instruction) {
    if (instruction.parameters.length != 3) {
      throw `Unexpected number of parameters for add, expected 3, got ${instruction.parameters.length}`
    }
    const addend1 = this.getParameterValue(instruction.parameters[0])
    const addend2 = this.getParameterValue(instruction.parameters[1]);

    if (instruction.parameters[2].parameterMode == ParameterMode.Immediate)
      throw "Error: Write parameter in immediate mode"

    const writePosition = instruction.parameters[2].value;

    const result = addend1 + addend2;
    this.strip[writePosition] = result;
    this.moveToNextInstruction(instruction);
  }

  private executeMultiply(instruction: Instruction) {
    if (instruction.parameters.length != 3) {
      throw `Unexpected number of parameters for multiply, expected 3, got ${instruction.parameters.length}`
    }
    const factor1 = this.getParameterValue(instruction.parameters[0])
    const factor2 = this.getParameterValue(instruction.parameters[1]);

    if (instruction.parameters[2].parameterMode == ParameterMode.Immediate)
      throw "Error: Write parameter in immediate mode"

    const writePosition = instruction.parameters[2].value;

    const result = factor1 * factor2;
    this.strip[writePosition] = result;
    this.moveToNextInstruction(instruction);
  }

  private executeInput(instruction: Instruction) {
    if (this.inputs.length == 0) {
      throw "Ran out of inputs";
    }
    if (instruction.parameters.length != 1) {
      throw `Unexpected number of parameters for input, expected 1, got ${instruction.parameters.length}`
    }
    if (instruction.parameters[0].parameterMode == ParameterMode.Immediate) {
      throw "Error: Write parameter in immediate mode"
    }

    const input = this.inputs.shift() as number;
    const writePosition = instruction.parameters[0].value;
    this.strip[writePosition] = input;
    this.moveToNextInstruction(instruction);
  }

  private executeOutput(instruction: Instruction) {
    if (instruction.parameters.length != 1) {
      throw `Unexpected number of parameters for output, expected 1, got ${instruction.parameters.length}`
    }
    const value = this.getParameterValue(instruction.parameters[0]);
    this.result = new Result(RunResultType.Output, value);
    this.moveToNextInstruction(instruction);
  }

  private executeJumpIfTrue(instruction: Instruction) {
    if (instruction.parameters.length != 2) {
      throw `Unexpected number of parameters for jump if true, expected 2, got ${instruction.parameters.length}`
    }

    const value = this.getParameterValue(instruction.parameters[0]);
    if (value != 0) {
      this.i = this.getParameterValue(instruction.parameters[1]);
    } else {
      this.moveToNextInstruction(instruction);
    }
  }

  private executeJumpIfFalse(instruction: Instruction) {
    if (instruction.parameters.length != 2) {
      throw `Unexpected number of parameters for jump if false, expected 2, got ${instruction.parameters.length}`
    }

    const value = this.getParameterValue(instruction.parameters[0]);
    if (value == 0) {
      this.i = this.getParameterValue(instruction.parameters[1]);
    } else {
      this.moveToNextInstruction(instruction);
    }
  }

  private executeLessThan(instruction: Instruction) {
    if (instruction.parameters.length != 3) {
      throw `Unexpected number of parameters for less than, expected 3, got ${instruction.parameters.length}`
    }

    const compare1 = this.getParameterValue(instruction.parameters[0])
    const compare2 = this.getParameterValue(instruction.parameters[1]);

    if (instruction.parameters[2].parameterMode == ParameterMode.Immediate)
      throw "Error: Write parameter in immediate mode"

    const writePosition = instruction.parameters[2].value;

    const result = compare1 < compare2 ? 1 : 0;
    this.strip[writePosition] = result;
    this.moveToNextInstruction(instruction);
  }

  private executeEquals(instruction: Instruction) {
    if (instruction.parameters.length != 3) {
      throw `Unexpected number of parameters for equals, expected 3, got ${instruction.parameters.length}`
    }

    const compare1 = this.getParameterValue(instruction.parameters[0])
    const compare2 = this.getParameterValue(instruction.parameters[1]);

    if (instruction.parameters[2].parameterMode == ParameterMode.Immediate)
      throw "Error: Write parameter in immediate mode"

    const writePosition = instruction.parameters[2].value;

    const result = compare1 == compare2 ? 1 : 0;
    this.strip[writePosition] = result;
    this.moveToNextInstruction(instruction);
  }

  private getParameterValue(parameter: Parameter): number {
    switch (parameter.parameterMode) {
      case ParameterMode.Immediate:
        return parameter.value;
      case ParameterMode.Position:
        return this.strip[parameter.value];
      default:
        throw `Unrecognized parameter mode: ${parameter.parameterMode}`
    }
  }

  private moveToNextInstruction(instruction: Instruction): void {
    this.i += instruction.parameters.length + 1;
  }
}