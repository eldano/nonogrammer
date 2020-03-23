import { Nonogram, Rule, Square } from "./nonogram";

/**
 * Returns all the possible combinations for a vector given its length and a rule.
 * Examples:
 *   getPossibilities(3, [1]) => [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
 *
 * @param  {number} length length of the vector
 * @param  {Rule} rule a rule that the vector must fulfill
 * @returns Square[][] An array with all the possible values for the vector
 */
function getPossibilities(length: number, rule: Rule): Square[][] {
  // prettier-ignore
  if (length === 3) {
    if (rule.equals([1])) {
      return [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
    } else if (rule.equals([2])) {
      return [[1, 1, 0], [0, 1, 1]];
    } else if (rule.equals([3])) {
      return [[1, 1, 1]];
    } else if (rule.equals([1, 1])) {
      return [[1, 0, 1]];
    }
  }

  return [[0, 0, 0]];
}

/**
 * Given an array where every value represents the number of possible values on that position
 * returns all the possible combination of values.
 * A value of `1` in the input array means that only the value `0` is allowed on that position.
 * A value of `3` in the input array means that the values `0`, `1` and `2` are allowed on that position.
 * Example:
 *   getIndexCombinations([1, 3, 1]) => [[0, 0 ,0], [0, 1, 0], [0, 2, 0]]
 *   getIndexCombinations([2, 2]) => [[0, 0], [0, 1], [1, 0], [1, 1]]
 *
 * @param  {number[]} maxPossibilities
 * @returns number[][]
 */
function getIndexCombinations(maxPossibilities: number[]): number[][] {
  if (maxPossibilities.length === 1) {
    const result = [];
    for (let i = 0; i < maxPossibilities[0]; i++) {
      result.push([i]);
    }
    return result;
  } else {
    const first = maxPossibilities.shift();
    if (first) {
      const tailCombinations = getIndexCombinations(maxPossibilities);
      const headCombinations = getIndexCombinations([first]);

      const result = [];

      for (let i = 0; i < headCombinations.length; i++) {
        for (let j = 0; j < tailCombinations.length; j++) {
          result.push(headCombinations[i].concat(tailCombinations[j]));
        }
      }

      return result;
    }

    return [];
  }
}

/**
 * Given a vector of squares, returns an array of consecutive segments.
 * Examples:
 *    stateVectorToSegments([0, 1, 1, 0, 1]) => [2, 1]
 * @param  {Square[]} vector
 * @returns number[]
 */
function stateVectorToSegments(vector: Square[]): number[] {
  const segments: number[] = [];
  let pushNextOne = true;

  vector.forEach(value => {
    if (value === 1) {
      if (pushNextOne) {
        segments.push(1);
        pushNextOne = false;
      } else {
        segments[segments.length - 1] += 1;
      }
    } else {
      pushNextOne = true;
    }
  });

  return segments;
}

/**
 * Returns true if the nonogram is breaking a rule in the passed column
 * @param  {Nonogram} nonogram
 * @param  {number} col
 * @returns boolean
 */
function breaksColRule(nonogram: Nonogram, col: number): boolean {
  const colRule = nonogram.colsRules[col];
  const testVector: Square[] = [];

  for (let i = 0; i < nonogram.grid.length; i++) {
    testVector[i] = nonogram.grid[i][col];
  }

  const segments = stateVectorToSegments(testVector);

  if (segments.length > colRule.length) {
    return true;
  }

  for (let i = 0; i < segments.length; i++) {
    if (segments[i] > colRule[i]) {
      return true;
    }
  }

  return false;
}

/**
 * Checks if a Nonogram is valid, i.e: All row and column rules are fulfilled.
 * @returns boolean
 */
function isValid(nonogram: Nonogram): boolean {
  for (let col = 0; col < nonogram.width; col++) {
    const breaksRule = breaksColRule(nonogram, col);

    if (breaksRule) {
      return false;
    }
  }

  return true;
}

/**
 * Solves the passed nonogram with a brute force strategy.
 * @param  {Nonogram} nonogram
 * @returns void
 */
export default function solve(nonogram: Nonogram): void {
  const possibilitiesSet: Square[][][] = [];

  for (let row = 0; row < nonogram.height; row++) {
    possibilitiesSet.push(getPossibilities(nonogram.width, nonogram.rowsRules[row]));
  }

  const maxIndices = possibilitiesSet.map(arr => arr.length); //[1, 3, 1]
  const indexCombinations = getIndexCombinations(maxIndices); //[1, 3, 1] => [[0, 0 ,0], [0, 1, 0], [0, 2, 0]]

  for (let j = 0; j < indexCombinations.length; j++) {
    const combination = indexCombinations[j];

    const testSolution: Square[][] = [];
    for (let i = 0; i < combination.length; i++) {
      testSolution.push(possibilitiesSet[i][combination[i]]);
    }

    nonogram.grid = testSolution;

    if (isValid(nonogram)) {
      console.log("I found the solution!!!");
      return;
    }
  }
}

declare global {
  interface Array<T> {
    equals(arr: Array<T>): boolean;
  }
}

Array.prototype.equals = function(arr): boolean {
  return this.length == arr.length && this.every((u, i) => u === arr[i]);
};
