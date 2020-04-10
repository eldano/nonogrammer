import { Dimension, Nonogram, spaceTaken, Square } from "./nonogram";
import "./array_ext";

/**
 * Fills the squares that are definitely 1 only using the rules and the total width and height.
 * It doesn't use the previously filled squares.
 * @param  {Nonogram} nonogram
 * @returns void
 */
function strategyOne(nonogram: Nonogram): void {
  (["row", "col"] as Dimension[]).forEach(dim => {
    const oppositeDim = dim === "row" ? "col" : "row";

    for (let dimIndex = 0; dimIndex < nonogram.getMaxDim(oppositeDim); dimIndex++) {
      const rule = nonogram.getDimRules(dim)[dimIndex];
      const freedom = nonogram.getMaxDim(dim) - spaceTaken(rule);

      let offset = 0;
      rule.forEach(ruleItem => {
        if (ruleItem > freedom) {
          offset += freedom;

          const diff = ruleItem - freedom;
          nonogram.replaceConsecutive(dim, dimIndex, offset, diff, 1);
          offset += diff;
        } else {
          offset += ruleItem;
        }

        offset += 1;
      });
    }
  });
}

// duplicated
function vectorToSegments(vector: Square[]): number[] {
  return vector
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

    if (segments.equals(rule)) {
      nonogram.replaceOccurrences(dimension, index, null, 0);
    }
  }
}

export default function solve(nonogram: Nonogram): void {
  strategyOne(nonogram);
  fillEmptiesOnCompleteVectors(nonogram);
}
