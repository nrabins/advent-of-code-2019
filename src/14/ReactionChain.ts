export const ORE = "ORE";
export const FUEL = "FUEL";

export class ChemicalAmount {
  public constructor(public chemical: string, public amount: number) {

  }

  public static parse(str: string): ChemicalAmount {
    const chunks = str.split(" ");
    const amount = parseInt(chunks[0], 10);
    const chemical = chunks[1];
    return new ChemicalAmount(chemical, amount);
  }
}

class ChemicalReaction {
  constructor(public output: ChemicalAmount, public inputs: ChemicalAmount[]) {
  }
}

export default class ReactionChain {
  private chemicalReactions: { [resultElement: string]: ChemicalReaction } = {};

  public constructor(file: string) {
    this.parse(file);
  }

  private parse(file: string): void {
    file.split("\r\n").map(line => this.parseLine(line));
  }

  private parseLine(line: string): void {
    const sides = line.split(" => ");
    const inputs = sides[0].split(", ").map(ChemicalAmount.parse);
    const output = ChemicalAmount.parse(sides[1]);
    if (inputs.length > 1 && inputs[0].chemical == ORE) {
      throw new Error("ORE as reagent with other chemical, invalid.")
    }

    if (this.chemicalReactions[output.chemical]) {
      throw new Error("Multiple ways to make a chemical, invalid.")
    }

    this.chemicalReactions[output.chemical] = new ChemicalReaction(output, inputs);
  }

  public getOreFor(chemicalAmount: ChemicalAmount): number {
    
    const requiredChemicals: ChemicalAmount[] = [chemicalAmount];
    const waste: { [chemical: string]: number } = {};
    let oreCount = 0;

    while (requiredChemicals.length > 0) {
      const requiredChemical = requiredChemicals.shift() as ChemicalAmount;
      let neededAmount = requiredChemical.amount;
      
      if (requiredChemical.chemical == ORE) {
        oreCount += requiredChemical.amount;
        continue;
      }
      
      const availableWaste = waste[requiredChemical.chemical];
      if (availableWaste) {
        if (availableWaste >= neededAmount) {
          waste[requiredChemical.chemical] -= neededAmount;
          neededAmount = 0;
        } else {
          neededAmount -= availableWaste;
          waste[requiredChemical.chemical] = 0;
        }
      }

      const reaction = this.chemicalReactions[requiredChemical.chemical];
      const numberOfTimesToReact = Math.ceil(neededAmount / reaction.output.amount);
      reaction.inputs.forEach(input => {
        requiredChemicals.push(new ChemicalAmount(input.chemical, input.amount * numberOfTimesToReact));
      });
      const outputActual = reaction.output.amount * numberOfTimesToReact;
      const outputWaste = outputActual - neededAmount;
      if (!waste[reaction.output.chemical]) {
        waste[reaction.output.chemical] = 0;
      }
      waste[reaction.output.chemical] += outputWaste;
    }

    return oreCount;
  }

  public getMaxForOreAmount(chemical: string, availableOreAmount: number): number {
    // approach
    // guess an amount of fuel necessary to generate the availableOreAmount
    // find out how much ore that would require
    // if the answer is more than available, move the possible range's max halfway to the min
    // if the answer is less than available, move the possible range's min halfway to the max
    
    let min = 0;
    let max = Number.MAX_SAFE_INTEGER;

    while (Math.abs(max - min) >= 1) {
      const guess = Math.floor((max + min) / 2);
      const oreRequired = this.getOreFor(new ChemicalAmount(chemical, guess))
      if (oreRequired == availableOreAmount) {
        // hit it bang on
        return guess;
      }

      if (oreRequired > availableOreAmount) {
        max = guess
      } else {
        if (max - min == 1) {
          return guess;
        }
        min = guess;
      }
    }

    return min;

  }
}