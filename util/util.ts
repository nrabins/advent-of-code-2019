
// modified from https://stackoverflow.com/questions/9960908/permutations-in-javascript/20871714#20871714
export function permutator<T>(inputArr: T[]): T[][] {
  let result: T[][] = [];

  function permute(arr: T[], m: T[] = []) {
    if (arr.length === 0) {
      result.push(m)
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next))
     }
   }
 }

 permute(inputArr)

 return result;
}