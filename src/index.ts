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

  // nonogram.rowsRules = [[1, 1], [1], [1, 1]];
  // nonogram.colsRules = [[1, 1], [1], [1, 1]];
  nonogram.rowsRules = [[1, 1], [1], [1, 1]];
  nonogram.colsRules = [[1, 1], [], [3]];

  if (filled) {
    nonogram.grid = [
      [1, 0, 1],
      [0, 1, 0],
      [1, 0, 1],
    ];
  }

  return nonogram;
}

function nonoFour(filled: boolean): Nonogram {
  const nonogram = new Nonogram(20, 13);

  nonogram.rowsRules = [
    [3],
    [2, 1, 1],
    [1, 1],
    [2, 9],
    [1, 2, 2],
    [1, 2, 3],
    [4, 2, 5],
    [1, 2, 2, 3, 2],
    [3, 1, 1, 6, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 3, 1, 1, 3],
    [2, 1, 2, 1],
    [3, 3],
  ];

  nonogram.colsRules = [
    [3],
    [2, 1],
    [1, 1, 3],
    [2, 1, 1, 1],
    [1, 2, 3, 1, 1],
    [1, 3, 2],
    [2, 3],
    [3],
    [1, 2],
    [1, 2],
    [1, 2],
    [1, 2],
    [1, 2],
    [1, 1, 6],
    [1, 6, 1],
    [3, 3, 1, 3],
    [1, 1, 1, 1],
    [3, 1, 1],
    [1, 2],
    [3],
  ];

  return nonogram;
}

function nonoFive(filled: boolean): Nonogram {
  const nonogram = new Nonogram(10, 10);

  // nonogram.rowsRules = [[1, 1], [1], [1, 1]];
  // nonogram.colsRules = [[1, 1], [1], [1, 1]];
  nonogram.rowsRules = [
    [2],
    [1, 1],
    [3, 1],
    [2, 1],
    [3, 1],
    [5, 1],
    [5],
    [5, 1],
    [7, 1],
    [3, 5],
  ];

  nonogram.colsRules = [
    [2, 1],
    [1, 1, 1, 2],
    [10],
    [6],
    [1, 5],
    [1, 5],
    [1, 4],
    [1, 2],
    [1],
    [3],
  ];

  return nonogram;
}

// https://www.nonograms.org/nonograms/i/2944
function nonoSix(filled: boolean): Nonogram {
  const nonogram = new Nonogram(7, 9);

  nonogram.rowsRules = [[2, 2], [2, 2], [1, 1, 1, 1], [5], [2, 1, 2], [1, 2, 1], [2, 2], [5], [1, 1]];
  nonogram.colsRules = [
    [2, 3, 1],
    [2, 2, 2],
    [1, 2, 1, 1],
    [3, 1],
    [1, 2, 1],
    [2, 2, 2],
    [2, 3, 1],
  ];

  return nonogram;
}

// const nonogram = nonoOne(false);
// const nonogram = nonoTwo(false);
// const nonogram = nonoThree(false);
// const nonogram = nonoFour(false);
// const nonogram = nonoFive(false);
const nonogram = nonoSix(false);

print(nonogram); //empty

solve(nonogram);

print(nonogram); //solved
