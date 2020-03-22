import { Nonogram } from "./nonogram";
import print from "./console_printer";

const nonogram = new Nonogram(10, 5);

nonogram.rowHints = [[8], [10], [1, 8], [8], [4]];
nonogram.colHints = [[2], [1, 1], [4], [4], [5], [5], [5], [5], [4], [3]];

const filled = true;

if (filled) {
  nonogram.grid[0] = [0, 0, 1, 1, 1, 1, 1, 1, 1, 1];
  nonogram.grid[1] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  nonogram.grid[2] = [1, 0, 1, 1, 1, 1, 1, 1, 1, 1];
  nonogram.grid[3] = [0, 1, 1, 1, 1, 1, 1, 1, 1, 0];
  nonogram.grid[4] = [0, 0, 0, 0, 1, 1, 1, 1, 0, 0];
}

print(nonogram);
