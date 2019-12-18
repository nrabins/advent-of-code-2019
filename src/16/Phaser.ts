export default class Phaser {
  private startingSignal: number[];

  private patterns: number[][] = [];

  constructor(input: string) {
    this.startingSignal = input.split("").map(numStr => parseInt(numStr, 10));
  }

  public getSignals(phaseCount: number): number[][] {

    for (let repeatCount = 1; repeatCount <= this.startingSignal.length; repeatCount++) {
      this.patterns.push(Phaser.patternForRange(0, this.startingSignal.length-1, repeatCount));
    }

    const signals: number[][] = [];
    signals.push(this.startingSignal);

    for (let phase = 1; phase <= phaseCount; phase++) {
      const lastSignal = signals[phase - 1];
      const nextSignal = this.getNextPhase(lastSignal);
      signals.push(nextSignal);
    }

    return signals;
  }

  private getNextPhase(lastSignal: number[]): number[] {
    const nextSignal: number[] = [];
    for (let digitIndex = 0; digitIndex < lastSignal.length; digitIndex++) {
      const pattern = this.patterns[digitIndex];
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

  public getOffsetSignalsViaHeuristic(offset: number, phaseCount: number): number[][] {
    const signals: number[][] = [];
    signals.push(this.startingSignal.slice(offset));

    for (let phase = 1; phase <= phaseCount; phase++) {
      console.log(`phase ${phase}`)
      const lastSignal = signals[phase - 1];
      const nextSignal = this.getNextPhaseViaHeuristic(lastSignal);
      signals.push(nextSignal);
    }

    return signals;
  }

  // if you know you're in the second half of the signal, you can get digit i by summing up the digits from i to the end of the signal
  // We work from the right side and store the current sum
  public getNextPhaseViaHeuristic(lastSignal: number[]): number[] {
    const digits: number[] = [];
    let sum = 0;
    for (let i = lastSignal.length-1; i >= 0 ; i--) {
      sum += lastSignal[i];
      const digit = parseInt(sum.toString(10).slice(-1), 10);
      digits.push(digit);
    }
    digits.reverse();
    return digits;
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

