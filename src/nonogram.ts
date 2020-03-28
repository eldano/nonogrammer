export type Rule = number[];
export type Square = null | 0 | 1;

export class Nonogram {
  width: number;
  height: number;
  rowsRules: Rule[];
  colsRules: Rule[];
  grid: Square[][];

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.rowsRules = [];
    this.colsRules = [];
    this.grid = [];

    for (let row = 0; row < height; row++) {
      this.grid[row] = [];
      for (let col = 0; col < width; col++) {
        this.grid[row][col] = null;
      }
    }
  }
}
