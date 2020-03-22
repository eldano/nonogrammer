import { Nonogram, Hints, Square } from "./nonogram";

class BruteSolver {
  nonogram: Nonogram;

  constructor(nonogram: Nonogram) {
    this.nonogram = nonogram;
  }

  stateVectorToSegments(vector: Square[]): number[] {
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

  breaksColRule(col: number): boolean {
    const colHint = this.nonogram.colHints[col];
    const testVector: Square[] = [];

    for (let i = 0; i < this.nonogram.grid.length; i++) {
      testVector[i] = this.nonogram.grid[i][col];
    }

    const segments = this.stateVectorToSegments(testVector);

    if (segments.length > colHint.length) {
      return true;
    }

    for (let i = 0; i < segments.length; i++) {
      if (segments[i] > colHint[i]) {
        return true;
      }
    }

    return false;
  }
  /**
   * Checks if a Nonogram is valid, i.e: All row and column rules are fulfilled.
   * @returns boolean
   */
  isValid(): boolean {
    for (let col = 0; col < this.nonogram.width; col++) {
      const breaksRule = this.breaksColRule(col);

      if (breaksRule) {
        return false;
      }
    }

    return true;
  }
}

/**
 * Returns all the possible combinations for a vector given its length and a rule.
 * Examples:
 *   getPossibilities(3, [1]) => [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
 *
 * @param  {number} length length of the vector
 * @param  {Hints} rule a rule that the vector must fulfill
 * @returns Square[][] An array with all the possible values for the vector
 */
function getPossibilities(length: number, rule: Hints): Square[][] {
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

export default function solve(nonogram: Nonogram): void {
  const solver = new BruteSolver(nonogram);
  const height = nonogram.height;
  const width = nonogram.width;

  const possibilitiesSet: Square[][][] = [];

  for (let row = 0; row < height; row++) {
    possibilitiesSet.push(getPossibilities(width, nonogram.rowHints[row]));
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

    if (solver.isValid()) {
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
