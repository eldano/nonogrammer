import { Nonogram } from "./nonogram";
import { vectorToSegments } from "./utils";
import "./array_ext";

/**
 * Fills the squares that are definitely 1 only using the rules and the total width and height.
 * It doesn't use the previously filled squares.
 * @param  {Nonogram} nonogram
 * @returns void
 */
function strategyOne(nonogram: Nonogram): void {
  for (const { rule, index, dimension } of nonogram.vectorIterator("both")) {
    const spaceTaken = rule.map(r => r.value).sum() + rule.length - 1;
    const freedom = nonogram.getSize(dimension) - spaceTaken;

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

function fillEmptiesOnCompleteVectors(nonogram: Nonogram): void {
  const vectorIterator = nonogram.vectorIterator("col");

  for (const vectorData of vectorIterator) {
    const { rule, vector, index, dimension } = vectorData;
    const segments = vectorToSegments(vector.map(square => square.value));

    if (segments.equals(rule.map(r => r.value))) {
      nonogram.replaceOccurrences(dimension, index, null, 0);
    }
  }
}

export default function solve(nonogram: Nonogram): void {
  strategyOne(nonogram);
  fillEmptiesOnCompleteVectors(nonogram);
}
