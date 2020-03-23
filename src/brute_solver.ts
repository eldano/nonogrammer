import { Nonogram, Rule, Square } from "./nonogram";

/**
 * Returns all the possible vectors of `length` that fulfill the given `rule`
 * Examples:
 *   getPossibilities([1], 3) => [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
 *
 * @param  {Rule} rule a rule that the vector must fulfill
 * @param  {number} length length of the vector
 * @returns Square[][] An array with all the possible values for the vector
 */
function getPossibilities(rule: Rule, length: number): Square[][] {
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
 * Returns true if the squares in the column don't break the column rule
 * @param  {Nonogram} nonogram
 * @param  {number} col
 * @returns boolean
 */
function isColValid(nonogram: Nonogram, col: number): boolean {
  const colRule = nonogram.colsRules[col];
  const testVector = nonogram.grid.map(row => row[col]);
  const segments = stateVectorToSegments(testVector);

  return segments.equals(colRule);
}

/**
 * Checks if a Nonogram is valid, i.e: All row and column rules are fulfilled.
 * @returns boolean
 */
function isValid(nonogram: Nonogram): boolean {
  const cols = [...Array(nonogram.width).keys()];

  return cols.every(col => isColValid(nonogram, col));
}

function* cartesian(possibilities: Square[][][]): Generator<Square[][], void> {
  const [head, ...tail] = possibilities;
  const remainder = tail.length ? cartesian(tail) : [[]];
  for (const r of remainder) for (const h of head) yield [h, ...r];
}

/**
 * Solves the passed nonogram with a brute force strategy.
 * @param  {Nonogram} nonogram
 * @returns void
 */
export default function solve(nonogram: Nonogram): void {
  const possibilitiesSet: Square[][][] = [];

  for (let row = 0; row < nonogram.height; row++) {
    possibilitiesSet.push(getPossibilities(nonogram.rowsRules[row], nonogram.width));
  }

  const allCombinations = cartesian(possibilitiesSet);
  let combination = allCombinations.next();
  let solved = false;

  while (!solved && !combination.done) {
    const testSolution: Square[][] = [];
    for (let i = 0; i < combination.value.length; i++) {
      testSolution.push(combination.value[i]);
    }

    nonogram.grid = testSolution;

    if (isValid(nonogram)) {
      console.log("I found the solution!!!");
      solved = true;
    } else {
      combination = allCombinations.next();
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
