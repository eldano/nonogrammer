export type Rule = number[];
export type Square = 0 | 1;

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

    this.grid = Array(height).fill(Array(width).fill(0));
  }
}
