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
        nonogram.grid.replace(rowIndex * nonogram.width + col, freedom, null);
        col += freedom;

        const diff = ruleItem - freedom;
        nonogram.grid.replace(rowIndex * nonogram.width + col, diff, 1);
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
        nonogram.grid.replaceCol(row * nonogram.width + colIndex, freedom, null, nonogram.width);
        row += freedom;

        const diff = ruleItem - freedom;
        nonogram.grid.replaceCol(row * nonogram.width + colIndex, diff, 1, nonogram.width);
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
