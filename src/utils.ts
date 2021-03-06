import { Rule, SquareType } from "./nonogram";

/**
 * Returns a SquareType[] with `leftPad` zeroes, followed by `sequence` ones, followed by `rightPad` zeroes.
 * @param  {number} leftPad number of zeros to the left (has to be >= 0)
 * @param  {number} sequence number of ones in the middle (has to be >= 0)
 * @param  {number} rightPad number of zeros to the left (has to be >= 0)
 * @returns SquareType[]
 */
function paddedSequence(leftPad: number, sequence: number, rightPad: number): SquareType[] {
  return Array(leftPad)
    .fill(0)
    .concat(Array(sequence).fill(1))
    .concat(Array(rightPad).fill(0));
}

/**
 * Given a vector of squares, returns an array of consecutive segments.
 * Examples:
 *    vectorToSegments([0, 1, 1, 0, 1]) => [2, 1]
 * @param  {SquareType[]} vector
 * @returns number[]
 */
export function vectorToSegments(vector: SquareType[]): number[] {
  return vector
    .map(val => (val === null ? "0" : val))
    .join("")
    .split("0")
    .filter(el => el !== "")
    .map(el => el.length);
}

/**
 * Returns all the possible vectors of `length` that fulfill the given `rule`
 * Examples:
 *   getPossibilities([1], 3) => [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
 *
 * @param  {Rule} rule a rule that the vector must fulfill
 * @param  {number} length length of the vector
 * @returns SquareType[][] An array with all the possible values for the vector
 */
export function getPossibilities(rule: Rule, length: number): SquareType[][] {
  const totalResults = [];

  if (rule.length === 0 || rule.length > length) {
    return [];
  } else {
    const maxLeftPadZeroes = length - rule.map(r => r.value).sum() - rule.length + 1;

    for (let leftPadZeroes = 0; leftPadZeroes <= maxLeftPadZeroes; leftPadZeroes++) {
      if (rule.length === 1) {
        const remainingZeros = length - leftPadZeroes - rule[0].value;
        const result = paddedSequence(leftPadZeroes, rule[0].value, remainingZeros);

        totalResults.push(result);
      } else {
        const [firstRuleItem, ...restRuleItems] = rule;
        const result = paddedSequence(leftPadZeroes, firstRuleItem.value, 1);

        const restPossibilities = getPossibilities(restRuleItems, length - firstRuleItem.value - 1 - leftPadZeroes);

        restPossibilities.forEach(possibility => {
          totalResults.push(result.concat(possibility));
        });
      }
    }
  }
  return totalResults;
}

export function* cartesian(possibilities: SquareType[][][]): Generator<SquareType[][], void> {
  const [head, ...tail] = possibilities;
  const remainder = tail.length ? cartesian(tail) : [[]];
  for (const r of remainder) for (const h of head) yield [h, ...r];
}
