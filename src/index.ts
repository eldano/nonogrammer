import { Nonogram } from "./nonogram";
import print from "./console_printer";
import solve from "./brute_solver";

function nonoOne(filled: boolean): Nonogram {
  const nonogram = new Nonogram(10, 5);

  nonogram.rowsRules = [[8], [10], [1, 8], [8], [4]];
  nonogram.colsRules = [[2], [1, 1], [4], [4], [5], [5], [5], [5], [4], [3]];

  if (filled) {
    nonogram.grid[0] = [0, 0, 1, 1, 1, 1, 1, 1, 1, 1];
    nonogram.grid[1] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    nonogram.grid[2] = [1, 0, 1, 1, 1, 1, 1, 1, 1, 1];
    nonogram.grid[3] = [0, 1, 1, 1, 1, 1, 1, 1, 1, 0];
    nonogram.grid[4] = [0, 0, 0, 0, 1, 1, 1, 1, 0, 0];
  }

  return nonogram;
}

function nonoTwo(filled: boolean): Nonogram {
  const nonogram = new Nonogram(2, 2);

  nonogram.rowsRules = [[1], [2]];
  nonogram.colsRules = [[1], [2]];

  if (filled) {
    nonogram.grid = [
      [0, 1],
      [1, 1],
    ];
  }

  return nonogram;
}

function nonoThree(filled: boolean): Nonogram {
  const nonogram = new Nonogram(3, 3);

  nonogram.rowsRules = [[1, 1], [1], [1, 1]];
  nonogram.colsRules = [[1, 1], [1], [1, 1]];

  if (filled) {
    nonogram.grid = [
      [1, 0, 1],
      [0, 1, 0],
      [1, 0, 1],
    ];
  }

  return nonogram;
}

const nonogram = nonoThree(false);
// nonoTwo(false);
// nonoThree(false);

print(nonogram); //empty

solve(nonogram);

print(nonogram); //solved
