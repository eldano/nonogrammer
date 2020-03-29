import "./array_ext";

export type Rule = number[];
export type Square = null | 0 | 1;

export function spaceTaken(rule: Rule): number {
  return rule.sum() + rule.length - 1;
}

export class Nonogram {
  width: number;
  height: number;
  rowsRules: Rule[];
  colsRules: Rule[];
  grid: Square[];

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.rowsRules = [];
    this.colsRules = [];
    this.grid = Array(width * height).fill(null);
  }

  replaceInRow(rowIndex: number, start: number, occurences: number, value: Square): void {
    this.grid.splice(rowIndex * this.width + start, occurences, ...Array(occurences).fill(value));
  }

  replaceInCol(colIndex: number, start: number, occurences: number, value: Square): void {
    for (let i = 0; i < occurences; i++) {
      const index = (start + i) * this.width + colIndex;
      if (this.grid[index] === null) {
        this.grid[index] = value;
      }
    }
  }
}
