import { permutator } from "./util";

/* Permutator tests */

test("Permutator returns array of expected length", () => {
  expect(permutator(['c','a','t']).length).toBe(6);
})