import { Structure } from "./structure";

const PADSTART = 3;
const FILLCHAR = "█";

let largestRowDefinition = 0;
let largestColDefinition = 0;

function printHeading(nonogram: Structure): void {
  console.log(`Nonogram ${nonogram.width} x ${nonogram.height}`);
  console.log(`Max Row Defs: ${largestRowDefinition}`);
  console.log(`Max Col Defs: ${largestColDefinition}`);
  console.log("");
}

function printColHints(nonogram: Structure): void {
  for (let i = largestColDefinition - 1; i >= 0; i--) {
    for (let j = 0; j < largestRowDefinition; j++) {
      process.stdout.write(" ".padStart(PADSTART));
    }

    nonogram.colHints.forEach(definition => {
      if (definition.length - 1 < i) {
        process.stdout.write(" ".padStart(PADSTART));
      } else {
        process.stdout.write(definition[i].toString().padStart(PADSTART));
      }
    });
    process.stdout.write("\n");
  }
}

export default function print(nonogram: Structure): void {
  largestRowDefinition = Math.max(...nonogram.rowHints.map(hint => hint.length));
  largestColDefinition = Math.max(...nonogram.colHints.map(hint => hint.length));

  printHeading(nonogram);
  printColHints(nonogram);

  nonogram.rowHints.forEach((definition, index) => {
    const spacesToTheLeft = largestRowDefinition - definition.length;

    for (let j = 0; j < spacesToTheLeft; j++) {
      process.stdout.write(" ".padStart(PADSTART));
    }

    for (let i = 0; i < definition.length; i++) {
      process.stdout.write(`${definition[i].toString().padStart(PADSTART)}`);
    }

    // print row of grid
    for (let k = 0; k < nonogram.width; k++) {
      const value = nonogram.grid[index][k];
      const valueStr = value ? FILLCHAR : " ";
      const padChar = value ? FILLCHAR : " ";
      process.stdout.write(valueStr.padStart(PADSTART, padChar));
    }

    process.stdout.write("\n");
  });
}
