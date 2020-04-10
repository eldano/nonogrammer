import { Nonogram } from "./nonogram";

const PADSTART = 3;
const FILLCHAR = "█";

let largestRowRule = 0;
let largestColRule = 0;

function printHeading(nonogram: Nonogram): void {
  console.log(`Nonogram ${nonogram.getMaxDim("row")} x ${nonogram.getMaxDim("col")}`);
  console.log("");
}

function printColsRules(nonogram: Nonogram): void {
  for (let i = largestColRule - 1; i >= 0; i--) {
    for (let j = 0; j < largestRowRule; j++) {
      process.stdout.write(" ".padStart(PADSTART));
    }

    nonogram.getDimRules("col").forEach(definition => {
      if (definition.length - 1 < i) {
        process.stdout.write(" ".padStart(PADSTART));
      } else {
        process.stdout.write(definition[definition.length - 1 - i].toString().padStart(PADSTART));
      }
    });
    process.stdout.write("\n");
  }
}

export default function print(nonogram: Nonogram): void {
  largestRowRule = Math.max(...nonogram.getDimRules("row").map(rule => rule.length));
  largestColRule = Math.max(...nonogram.getDimRules("col").map(rule => rule.length));

  printHeading(nonogram);
  printColsRules(nonogram);

  nonogram.getDimRules("row").forEach((rule, row) => {
    const spacesToTheLeft = largestRowRule - rule.length;

    for (let j = 0; j < spacesToTheLeft; j++) {
      process.stdout.write(" ".padStart(PADSTART));
    }

    for (let i = 0; i < rule.length; i++) {
      process.stdout.write(rule[i].toString().padStart(PADSTART));
    }

    // print row of grid
    for (let column = 0; column < nonogram.getMaxDim("row"); column++) {
      const value = nonogram.getSquare(row, column);
      let valueStr, padChar;

      if (value === 1) {
        valueStr = FILLCHAR;
        padChar = FILLCHAR;
      } else if (value === 0) {
        valueStr = " ";
        padChar = " ";
      } else {
        valueStr = "-";
        padChar = " ";
      }

      process.stdout.write(valueStr.padStart(PADSTART, padChar));
    }

    process.stdout.write("\n");
  });
}
