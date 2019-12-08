import { Instruction, Operation, Parameter, ParameterMode } from "./Instruction";

export interface IComputer {
}

const EXIT_CODE = 99;

export class Computer implements IComputer {

  private strip: number[];
  private i: number; // ha
  private inputs: number[]
  private outputs: number[];

  constructor(program: string) {
    this.i = 0;
    this.inputs = [];
    this.outputs = [];
    this.strip = program.split(",").map(num => parseInt(num, 10));
  }

  public run(inputs: number[]): number[] {
    this.resetMeta();
    this.inputs = inputs;

    while (this.strip[this.i] != EXIT_CODE) {
      const instruction = new Instruction(this.strip, this.i);
      this.executeInstruction(instruction);
    }

    return this.outputs;
  }

  private resetMeta(): void {
    this.i = 0;
    this.outputs = [];
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
      default:
        throw `Unrecognized operation: ${instruction.operation}`
    }
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
    this.outputs.push(value);
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

    const result = compare1 < compare2 ? 1: 0;
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

    const result = compare1 == compare2 ? 1: 0;
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