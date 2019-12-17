export default class Phaser {
  private startingSignal: number[];

  constructor(private input: string) {
    this.startingSignal = input.split("").map(numStr => parseInt(numStr, 10));
  }

  public getSignals(phaseCount: number, offset: number = 0): number[][] {
    const signals: number[][] = [];
    signals.push(this.startingSignal);

    for (let phase = 1; phase <= phaseCount; phase++) {
      const lastSignal = signals[phase - 1];
      const nextSignal = Phaser.getNextPhase(lastSignal);
      signals.push(nextSignal);
    }

    return signals;
  }

  private static getNextPhase(lastSignal: number[]): number[] {
    const nextSignal: number[] = [];
    for (let digitIndex = 0; digitIndex < lastSignal.length; digitIndex++) {
      const pattern = Phaser.getPattern(digitIndex, lastSignal.length);

      if (pattern.length != lastSignal.length) {
        throw new Error(`Pattern length ${pattern.length} doesn't match last signal length ${lastSignal.length}`);
      }

      const sum = pattern.reduce((sum, p, i) => {
        return sum + p * lastSignal[i]
      }, 0);
      const digit = parseInt(sum.toString(10).slice(-1), 10);
      nextSignal.push(digit);
    }
    return nextSignal;
  }

  private static getPattern(charIndex: number, length: number): number[] {
    const repeatCount = charIndex + 1;
    const subPattern = [];
    for (let r = 0; r < repeatCount; r++) {
      subPattern.push(0);
    }
    for (let r = 0; r < repeatCount; r++) {
      subPattern.push(1);
    }
    for (let r = 0; r < repeatCount; r++) {
      subPattern.push(0);
    }
    for (let r = 0; r < repeatCount; r++) {
      subPattern.push(-1);
    }

    let pattern = [];
    while (pattern.length < length + 1) {
      pattern.push(...subPattern);
    }
    pattern = pattern.slice(1, length + 1);
    return pattern;
  }

  /**
   *  Gets the multiplication pattern from [start, end] for a given repeat count 
   */
  public static patternForRange(start: number, end: number, repeatCount: number): number[] {
    const patternLength = repeatCount * 4;
    const digits = [];
    for (let i = start; i <= end; i++) {
      // shift the number into our pattern (take into account the chopped-off start)
      const patternRelativeIndex = (i + 1) % patternLength;

      // find out the digit of the pattern at our new i
      if (patternRelativeIndex < repeatCount) {
        digits.push(0);
      } else if (patternRelativeIndex < repeatCount * 2) {
        digits.push(1);
      } else if (patternRelativeIndex < repeatCount * 3) {
        digits.push(0);
      } else if (patternRelativeIndex < repeatCount * 4) {
        digits.push(-1);
      } else {
        throw new Error(`patternRelativeIndex out of range ${patternRelativeIndex}`)
      }
    }
    return digits;
  }
}

