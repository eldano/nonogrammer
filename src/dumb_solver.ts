import { Nonogram, Rule, Square } from "./nonogram";
import "./array_ext";

function spaceTaken(rule: Rule): number {
  return rule.map(r => r.value).sum() + rule.length - 1;
}

/**
 * Fills the squares that are definitely 1 only using the rules and the total width and height.
 * It doesn't use the previously filled squares.
 * @param  {Nonogram} nonogram
 * @returns void
 */
function strategyOne(nonogram: Nonogram): void {
  for (const { rule, index, dimension } of nonogram.vectorIterator("both")) {
    const freedom = nonogram.getSize(dimension) - spaceTaken(rule);

    let offset = 0;
    rule.forEach(ruleItem => {
      if (ruleItem.value > freedom) {
        offset += freedom;

        const diff = ruleItem.value - freedom;
        nonogram.replaceConsecutive(dimension, index, offset, diff, 1);
        offset += diff;
      } else {
        offset += ruleItem.value;
      }

      offset += 1;
    });
  }
}

// duplicated
function vectorToSegments(vector: Square[]): number[] {
  return vector
    .map(square => square.value)
    .map(val => (val === null ? "0" : val))
    .join("")
    .split("0")
    .filter(el => el !== "")
    .map(el => el.length);
}

function fillEmptiesOnCompleteVectors(nonogram: Nonogram): void {
  const vectorIterator = nonogram.vectorIterator("col");

  for (const vectorData of vectorIterator) {
    const { rule, vector, index, dimension } = vectorData;
    const segments = vectorToSegments(vector);

    if (segments.equals(rule.map(r => r.value))) {
      nonogram.replaceOccurrences(dimension, index, null, 0);
    }
  }
}

export default function solve(nonogram: Nonogram): void {
  strategyOne(nonogram);
  fillEmptiesOnCompleteVectors(nonogram);
}
