import { Nonogram, Rule, Square } from "./nonogram";

declare global {
  interface Array<T> {
    equals(arr: Array<T>): boolean;
    sum(): number;
  }
}

Array.prototype.equals = function(arr): boolean {
  return this.length == arr.length && this.every((u, i) => u === arr[i]);
};

Array.prototype.sum = function(): number {
  return this.reduce((acc, val) => acc + val);
};

/**
 * Returns a Square[] with `leftPad` zeroes, followed by `sequence` ones, followed by `rightPad` zeroes.
 * @param  {number} leftPad number of zeros to the left (has to be >= 0)
 * @param  {number} sequence number of ones in the middle (has to be >= 0)
 * @param  {number} rightPad number of zeros to the left (has to be >= 0)
 * @returns Square
 */
function paddedSequence(leftPad: number, sequence: number, rightPad: number): Square[] {
  return Array(leftPad)
    .fill(0)
    .concat(Array(sequence).fill(1))
    .concat(Array(rightPad).fill(0));
}

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
  const totalResults = [];

  if (rule.length === 0 || rule.length > length) {
    return [];
  } else {
    const maxLeftPadZeroes = length - rule.sum() - rule.length + 1;

    for (let leftPadZeroes = 0; leftPadZeroes <= maxLeftPadZeroes; leftPadZeroes++) {
      if (rule.length === 1) {
        const remainingZeros = length - leftPadZeroes - rule[0];
        const result = paddedSequence(leftPadZeroes, rule[0], remainingZeros);

        totalResults.push(result);
      } else {
        const [firstRuleItem, ...restRuleItems] = rule;
        const result = paddedSequence(leftPadZeroes, firstRuleItem, 1);

        const restPossibilities = getPossibilities(restRuleItems, length - firstRuleItem - 1 - leftPadZeroes);

        restPossibilities.forEach(possibility => {
          totalResults.push(result.concat(possibility));
        });
      }
    }
  }
  return totalResults;
}

/**
 * Given a vector of squares, returns an array of consecutive segments.
 * Examples:
 *    vectorToSegments([0, 1, 1, 0, 1]) => [2, 1]
 * @param  {Square[]} vector
 * @returns number[]
 */
function vectorToSegments(vector: Square[]): number[] {
  return vector
    .join("")
    .split("0")
    .filter(el => el !== "")
    .map(el => el.length);
}

/**
 * Checks if a Nonogram is valid, i.e: All row and column rules are fulfilled.
 * @returns boolean
 */
function isValid(nonogram: Nonogram): boolean {
  const cols = [...Array(nonogram.width).keys()];

  return cols.every(col => {
    const colRule = nonogram.colsRules[col];
    const testVector = nonogram.grid.map(row => row[col]);
    const segments = vectorToSegments(testVector);

    return segments.equals(colRule);
  });
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
  const rowCombos = nonogram.rowsRules.map(rule => getPossibilities(rule, nonogram.width));

  const gridCombosGenerator = cartesian(rowCombos);
  let combination = gridCombosGenerator.next();
  let solved = false;

  while (!solved && !combination.done) {
    nonogram.grid = combination.value;

    if (isValid(nonogram)) {
      console.log("I found the solution!!!");
      solved = true;
    } else {
      combination = gridCombosGenerator.next();
    }
  }
}
