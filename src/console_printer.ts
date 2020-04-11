import { Nonogram } from "./nonogram";

const PADSTART = 3;
const FILLCHAR = "█";

let largestRowRule = 0;
let largestColRule = 0;

function printHeading(nonogram: Nonogram): void {
  console.log(`Nonogram ${nonogram.width} x ${nonogram.height}`);
  console.log("");
}

function printColsRules(nonogram: Nonogram): void {
  for (let i = largestColRule - 1; i >= 0; i--) {
    for (let j = 0; j < largestRowRule; j++) {
      process.stdout.write(" ".padStart(PADSTART));
    }

    nonogram.getRules("col").forEach(rule => {
      if (rule.length - 1 < i) {
        process.stdout.write(" ".padStart(PADSTART));
      } else {
        process.stdout.write(rule[rule.length - 1 - i].value.toString().padStart(PADSTART));
      }
    });
    process.stdout.write("\n");
  }
}

export default function print(nonogram: Nonogram): void {
  largestRowRule = Math.max(...nonogram.getRules("row").map(rule => rule.length));
  largestColRule = Math.max(...nonogram.getRules("col").map(rule => rule.length));

  printHeading(nonogram);
  printColsRules(nonogram);

  nonogram.getRules("row").forEach((rule, row) => {
    const spacesToTheLeft = largestRowRule - rule.length;

    for (let j = 0; j < spacesToTheLeft; j++) {
      process.stdout.write(" ".padStart(PADSTART));
    }

    for (let i = 0; i < rule.length; i++) {
      process.stdout.write(rule[i].value.toString().padStart(PADSTART));
    }

    // print row of grid
    for (let column = 0; column < nonogram.width; column++) {
      const value = nonogram.getSquareValue(row, column);
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
