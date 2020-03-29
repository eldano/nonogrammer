import { Nonogram } from "./nonogram";
import print from "./console_printer";
import bruteSolve from "./brute_solver";
import dumbSolve from "./dumb_solver";

function nonoOne(): Nonogram {
  const nonogram = new Nonogram(10, 5);

  nonogram.rowsRules = [[8], [10], [1, 8], [8], [4]];
  nonogram.colsRules = [[2], [1, 1], [4], [4], [5], [5], [5], [5], [4], [3]];

  return nonogram;
}

function nonoTwo(): Nonogram {
  const nonogram = new Nonogram(2, 2);

  nonogram.rowsRules = [[1], [2]];
  nonogram.colsRules = [[1], [2]];

  return nonogram;
}

function nonoThree(): Nonogram {
  const nonogram = new Nonogram(3, 3);

  nonogram.rowsRules = [[1, 1], [1], [1, 1]];
  nonogram.colsRules = [[1, 1], [], [3]];

  return nonogram;
}

function nonoFour(): Nonogram {
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

function nonoFive(): Nonogram {
  const nonogram = new Nonogram(10, 10);

  //prettier-ignore
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

  //prettier-ignore
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
function nonoSix(): Nonogram {
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

//https://www.nonograms.org/nonograms/i/5754
function nonoSeven(): Nonogram {
  const nonogram = new Nonogram(15, 15);

  //prettier-ignore
  nonogram.rowsRules = [
    [13], [15], [2, 7, 2], [1, 5, 1], [2, 5, 2], [15], [15], [5, 1, 5], [11], [11], [11], [2, 2], [9], [7], [5]
  ]

  //prettier-ignore
  nonogram.colsRules = [
    [6], [3, 4], [2, 6], [2, 8], [3, 9], [11, 3], [7, 3, 3], [11, 3], [7, 3, 3], [11, 3], [3, 9], [2, 8], [2, 6], [3, 4], [6]
  ]

  return nonogram;
}

// prettier-ignore
const nonograms = [
  nonoOne(),
  nonoTwo(),
  nonoThree(),
  nonoFour(),
  nonoFive(),
  nonoSix(),
  nonoSeven(),
];

const index = +process.argv[2];
const nonogram = nonograms[index];

print(nonogram); //empty

dumbSolve(nonogram);

print(nonogram); //solved
