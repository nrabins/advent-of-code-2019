
export default class MathLib {

  /* Modified from https://www.geeksforgeeks.org/lcm-of-given-array-elements/ */
  public static lcm(...element_array: number[]): number {

    let lcm_of_array_elements = 1;
    let divisor = 2;

    while (true) {
      let counter = 0;
      let divisible = false;
      for (let i = 0; i < element_array.length; i++) {

        // lcm_of_array_elements (n1, n2, ... 0) = 0. 
        // For negative number we convert into 
        // positive and calculate lcm_of_array_elements. 
        if (element_array[i] == 0) {
          return 0;
        }
        else if (element_array[i] < 0) {
          element_array[i] = element_array[i] * (-1);
        }
        if (element_array[i] == 1) {
          counter++;
        }

        // Divide element_array by devisor if complete 
        // division i.e. without remainder then replace 
        // number with quotient; used for find next factor 
        if (element_array[i] % divisor == 0) {
          divisible = true;
          element_array[i] = element_array[i] / divisor;
        }
      }

      // If divisor able to completely divide any number 
      // from array multiply with lcm_of_array_elements 
      // and store into lcm_of_array_elements and continue 
      // to same divisor for next factor finding. 
      // else increment divisor 
      if (divisible) {
        lcm_of_array_elements = lcm_of_array_elements * divisor;
      }
      else {
        divisor++;
      }

      // Check if all element_array is 1 indicate  
      // we found all factors and terminate while loop. 
      if (counter == element_array.length) {
        return lcm_of_array_elements;
      }
    }


    // const product = numbers.reduce((product, number) => product * number, 1);
    // const gcd = this.gcd(...numbers);
    // return product / gcd;
  }





  public static gcd(...numbers: number[]): number {
    let result = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
      result = this.gcd_2(result, numbers[i]);

      if (result == 1) {
        return 1;
      }
    }
    return result;
  }

  public static gcd_2(a: number, b: number): number {
    if (a == b) {
      return a;
    } else if (a > b) {
      return this.gcd_2(a - b, b);
    } else {
      return this.gcd_2(a, b - a);
    }
  }
}
