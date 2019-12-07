export enum Operation {
  Add = 1,
  Multiply = 2,
  Input = 3,
  Output = 4
}

export interface IParameter {
  parameterMode: ParameterMode;
  value: number;
}

export class Parameter implements IParameter {
  constructor(public parameterMode: ParameterMode, public value: number) {
  }
}

export enum ParameterMode {
  Position,
  Immediate
}

export interface IInstruction {
  operation: Operation;
  parameters: IParameter[];
}

export class Instruction implements IInstruction {
  operation: Operation;
  parameters: IParameter[];

  constructor(strip: number[], i: number) {
    const instruction = strip[i];
    const opCodeStr = getDigitFromRight(instruction, 1) + getDigitFromRight(instruction, 0)
    let numberOfParameters;
    switch (opCodeStr) {
      case "01":
        this.operation = Operation.Add;
        numberOfParameters = 3;
        break;
      case "02":
        this.operation = Operation.Multiply;
        numberOfParameters = 3;
        break;
      case "03":
        this.operation = Operation.Input;
        numberOfParameters = 1;
        break;
      case "04":
        this.operation = Operation.Output;
        numberOfParameters = 1;
        break;
      default:
        throw `Unrecognized opcode: ${opCodeStr}`;
    }

    if (i + numberOfParameters >= strip.length) {
      throw "Ran out of strip"
    }

    const parameterValues = strip.slice(i+1, i+numberOfParameters+1);
    this.parameters = parameterValues.map((value, index) => {
      const parameterModeChar = getDigitFromRight(instruction, index+2);
      let parameterMode: ParameterMode;
      switch (parameterModeChar) {
        case "0": parameterMode = ParameterMode.Position; break;
        case "1": parameterMode = ParameterMode.Immediate; break;
        default: throw `Unrecognized ParameterMode: ${parameterModeChar}`
      }

      return new Parameter(parameterMode, value);
    });

  }
}

/**
 * 
 * @param value The number
 * @param positionFromRight The distance from right to get the digit (0 => 1's, 1=> 10's e.g.)
 */
function getDigitFromRight(value: number, positionFromRight: number) {
  const chars = value.toString().padStart(positionFromRight + 1, "0").split("");
  return chars[chars.length - 1 - positionFromRight]
  // pfr = 3, chars = 3 [4] 2 1 5, length = 5, want chars[1] so... length-pfr-1
}

// testGetDigitFromRight(12345, 0);
// testGetDigitFromRight(12345, 1);
// testGetDigitFromRight(12345, 2);
// testGetDigitFromRight(12345, 3);
// testGetDigitFromRight(12345, 4);
// testGetDigitFromRight(12345, 5);
// testGetDigitFromRight(12345, 100);

function testGetDigitFromRight(value: number, positionFromRight: number) {
  console.log(`getDigitFromRight(${value}) = ${getDigitFromRight(value, positionFromRight)}`)
}
