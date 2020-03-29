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
}
