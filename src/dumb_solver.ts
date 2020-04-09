import { Nonogram, spaceTaken, Square } from "./nonogram";
import "./array_ext";

/**
 * Fills the squares that are definitely 1 only using the rules and the total width and height.
 * It doesn't use the previously filled squares.
 * @param  {Nonogram} nonogram
 * @returns void
 */
function strategyOne(nonogram: Nonogram): void {
  for (let rowIndex = 0; rowIndex < nonogram.height; rowIndex++) {
    const rule = nonogram.rowsRules[rowIndex];
    const freedom = nonogram.width - spaceTaken(rule);

    let col = 0;
    rule.forEach(ruleItem => {
      if (ruleItem > freedom) {
        col += freedom;

        const diff = ruleItem - freedom;
        nonogram.replaceInRow(rowIndex, col, diff, 1);
        col += diff;
      } else {
        col += ruleItem;
      }

      col += 1;
    });
  }

  for (let colIndex = 0; colIndex < nonogram.width; colIndex++) {
    const rule = nonogram.colsRules[colIndex];
    const freedom = nonogram.height - spaceTaken(rule);

    let row = 0;
    rule.forEach(ruleItem => {
      if (ruleItem > freedom) {
        row += freedom;

        const diff = ruleItem - freedom;
        nonogram.replaceInCol(colIndex, row, diff, 1);
        row += diff;
      } else {
        row += ruleItem;
      }

      row += 1;
    });
  }
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
  const vectorIterator = nonogram.vectorIterator("cols");

  for (const vectorData of vectorIterator) {
    const { rule, vector, index, kind } = vectorData;
    const segments = vectorToSegments(vector);

    if (segments.equals(rule)) {
      if (kind === "row") {
        nonogram.replaceOccurrencesInRow(index, null, 0);
      } else {
        nonogram.replaceOccurrencesInCol(index, null, 0);
      }
    }
  }
}

export default function solve(nonogram: Nonogram): void {
  strategyOne(nonogram);
  fillEmptiesOnCompleteVectors(nonogram);
}
