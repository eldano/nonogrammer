import { Structure } from "./structure";
import print from "./console_printer";

const nonogram = new Structure();

nonogram.width = 10;
nonogram.height = 5;
nonogram.rowHints = [[8], [10], [1, 8], [8], [4]];
nonogram.colHints = [[2], [1, 1], [4], [4], [5], [5], [5], [5], [4], [3]];
nonogram.grid = [
  Array(10).fill(false),
  Array(10).fill(false),
  Array(10).fill(false),
  Array(10).fill(false),
  Array(10).fill(false),
];

const filled = true;

if (filled) {
  nonogram.grid[0] = [false, false, true, true, true, true, true, true, true, true];
  nonogram.grid[1] = [true, true, true, true, true, true, true, true, true, true];
  nonogram.grid[2] = [true, false, true, true, true, true, true, true, true, true];
  nonogram.grid[3] = [false, true, true, true, true, true, true, true, true, false];
  nonogram.grid[4] = [false, false, false, false, true, true, true, true, false, false];
}

print(nonogram);
