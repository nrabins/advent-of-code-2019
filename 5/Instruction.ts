export enum Operation {
  Add,
  Multiply,
  Input,
  Output
}

export interface IParameter {
  parameterMode: ParameterMode;
  value: number;
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
    const opCode = strip[i];
    this.operation = Operation.Add;
    this.parameters = [];
  } 

}

/**
 * 
 * @param value The number
 * @param positionFromRight The distance from right to get the digit (0 => 1's, 1=> 10's e.g.)
 */
function getDigitFromRight(value: number, positionFromRight: number) {
  const chars = value.toString().padStart(positionFromRight+1, "0").split("");
  return chars[chars.length - 1 - positionFromRight]
  // pfr = 3, chars = 3 [4] 2 1 5, length = 5, want chars[1] so... length-pfr-1
}

testGetDigitFromRight(12345, 0);
testGetDigitFromRight(12345, 1);
testGetDigitFromRight(12345, 2);
testGetDigitFromRight(12345, 3);
testGetDigitFromRight(12345, 4);
testGetDigitFromRight(12345, 5);
testGetDigitFromRight(12345, 100);

function testGetDigitFromRight(value: number, positionFromRight: number) {
  console.log(`getDigitFromRight(${value}) = ${getDigitFromRight(value, positionFromRight)}`)
}
