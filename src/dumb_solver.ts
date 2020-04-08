import { Nonogram, spaceTaken } from "./nonogram";
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

export default function solve(nonogram: Nonogram): void {
  strategyOne(nonogram);
}
