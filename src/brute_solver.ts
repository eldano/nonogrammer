import { Nonogram } from "./nonogram";
import { cartesian, getPossibilities, vectorToSegments } from "./utils";
import "./array_ext";

/**
 * Checks if a Nonogram is valid, i.e: All row and column rules are fulfilled.
 * @returns boolean
 */
function isValid(nonogram: Nonogram): boolean {
  const cols = [...Array(nonogram.width).keys()];

  return cols.every(col => {
    const colRule = nonogram.getRules("col")[col];
    const testVector = nonogram.getVector("col", col).map(square => square.value);
    const segments = vectorToSegments(testVector);

    return segments.equals(colRule.map(r => r.value));
  });
}

/**
 * Solves the passed nonogram with a brute force strategy.
 * @param  {Nonogram} nonogram
 * @returns void
 */
export default function solve(nonogram: Nonogram): void {
  const rowCombos = nonogram.getRules("row").map(rule => getPossibilities(rule, nonogram.width));
  const gridCombosGenerator = cartesian(rowCombos);

  for (const combination of gridCombosGenerator) {
    for (let row = 0; row < combination.length; row++) {
      for (let col = 0; col < combination[row].length; col++) {
        nonogram.setSquareValue(row, col, combination[row][col]);
      }
    }

    if (isValid(nonogram)) {
      console.log("I found the solution!!!");
      return;
    }
  }
}
