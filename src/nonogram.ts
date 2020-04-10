import "./array_ext";

export type Rule = number[];
export type Square = null | 0 | 1;
export type Dimension = "row" | "col";

export function spaceTaken(rule: Rule): number {
  return rule.sum() + rule.length - 1;
}

export interface VectorData {
  rule: Rule;
  vector: Square[];
  index: number;
  dimension: Dimension;
}

export class Nonogram {
  private width: number;
  private height: number;
  private rowsRules: Rule[];
  private colsRules: Rule[];
  private grid: Square[];

  constructor(width: number, height: number, rowsRules: Rule[], colsRules: Rule[]) {
    this.width = width;
    this.height = height;
    this.rowsRules = rowsRules;
    this.colsRules = colsRules;
    this.grid = Array(width * height).fill(null);
  }

  getMaxDim(dim: Dimension): number {
    return dim === "row" ? this.width : this.height;
  }

  getDimRules(dim: Dimension): Rule[] {
    return dim === "row" ? this.rowsRules : this.colsRules;
  }

  getSquare(row: number, column: number): Square {
    return this.grid[row * this.width + column];
  }

  setSquare(row: number, column: number, square: Square): void {
    this.grid[row * this.width + column] = square;
  }

  getVector(dimension: Dimension, index: number): Square[] {
    if (dimension === "row") {
      return this.grid.slice(index * this.width, (index + 1) * this.width);
    } else {
      return this.grid.filter((_item, col) => col % this.width === index);
    }
  }

  replaceConsecutive(dimension: Dimension, dimIndex: number, start: number, occurrences: number, val: Square): void {
    if (dimension === "row") {
      this.grid.splice(dimIndex * this.width + start, occurrences, ...Array(occurrences).fill(val));
    } else {
      for (let i = 0; i < occurrences; i++) {
        const index = (start + i) * this.width + dimIndex;
        this.grid[index] = val;
      }
    }
  }

  replaceOccurrences(dimension: Dimension, dimIndex: number, oldValue: Square, newValue: Square): void {
    const maxIteration = dimension === "row" ? this.width : this.height;
    for (let idx = 0; idx < maxIteration; idx++) {
      if (dimension === "row") {
        if (this.getSquare(dimIndex, idx) === oldValue) {
          this.setSquare(dimIndex, idx, newValue);
        }
      } else {
        if (this.getSquare(idx, dimIndex) === oldValue) {
          this.setSquare(idx, dimIndex, newValue);
        }
      }
    }
  }

  // Iterates first through rows and then through cols
  *vectorIterator(type: Dimension | "both"): Generator<VectorData, void> {
    if (type === "row" || type === "both") {
      for (let row = 0; row < this.height; row++) {
        yield { rule: this.rowsRules[row], vector: this.getVector("row", row), index: row, dimension: "row" };
      }
    }

    if (type === "col" || type === "both") {
      for (let col = 0; col < this.width; col++) {
        yield { rule: this.colsRules[col], vector: this.getVector("col", col), index: col, dimension: "col" };
      }
    }
  }

  // It can be used in for..of like:
  // const it = nonogram.rowItemsIterator(2);
  // for (const itItem of it) {
  //   console.log(itItem);
  // }
  *rowItemsIterator(row: number): Generator<Square, void> {
    for (let i = row * this.width; i < (row + 1) * this.width; i++) {
      yield this.grid[i];
    }
  }

  // It can be used in for..of like:
  // const ite = nonogram.colItemsIterator(6);
  // for (const itItem of ite) {
  //   console.log(itItem);
  // }
  *colItemsIterator(col: number): Generator<Square, void> {
    for (let i = col; i < this.height * this.width; i += this.width) {
      yield this.grid[i];
    }
  }
}
