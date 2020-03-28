import { Nonogram, spaceTaken } from "./nonogram";
import "./array_ext";

/**
 * Fills the squares that are definitely 1 only using the rules and the total width and height.
 * It doesn't use the previously filled squares.
 * @param  {Nonogram} nonogram
 * @returns void
 */
function strategyOne(nonogram: Nonogram): void {
  nonogram.grid.forEach((row, index) => {
    const rule = nonogram.rowsRules[index];
    const freedom = nonogram.width - spaceTaken(rule);

    let col = 0;
    rule.forEach(ruleItem => {
      if (ruleItem > freedom) {
        row.replace(col, freedom, null);
        col += freedom;

        const diff = ruleItem - freedom;
        row.replace(col, diff, 1);
        col += diff;
      } else {
        col += ruleItem;
      }

      col += 1;
    });
  });

  for (let index = 0; index < nonogram.width; index++) {
    const col = nonogram.grid.map(row => row[index]);

    const rule = nonogram.colsRules[index];
    const freedom = nonogram.height - spaceTaken(rule);

    let row = 0;
    rule.forEach(ruleItem => {
      if (ruleItem > freedom) {
        col.replace(row, freedom, null);
        row += freedom;

        const diff = ruleItem - freedom;
        col.replace(row, diff, 1);
        row += diff;
      } else {
        row += ruleItem;
      }

      row += 1;
    });

    nonogram.grid.forEach((row, colIndex) => {
      if (row[index] === null) {
        row[index] = col[colIndex];
      }
    });
  }
}

export default function solve(nonogram: Nonogram): void {
  strategyOne(nonogram);
}
