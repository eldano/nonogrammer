import "./array_ext";
import { getPossibilities } from "./utils";

export type Rule = RuleItem[];
export type SquareType = null | 0 | 1;
export type Dimension = "row" | "col";

export interface VectorData {
  rule: Rule;
  vector: Square[];
  index: number;
  dimension: Dimension;
}

export class RuleItem {
  private _value: number;

  constructor(value: number) {
    this._value = value;
  }

  get value(): number {
    return this._value;
  }
}

export class Square {
  value: SquareType;
  applyingRowRules: Set<RuleItem | null> = new Set();
  applyingColRules: Set<RuleItem | null> = new Set();

  constructor(value: SquareType) {
    this.value = value;
  }
}

export class Nonogram {
  private _width: number;
  private _height: number;
  private rowsRules: Rule[];
  private colsRules: Rule[];
  private grid: Square[];

  constructor(width: number, height: number, rowsRules: number[][], colsRules: number[][]) {
    this._width = width;
    this._height = height;

    this.rowsRules = rowsRules.map(rowRule => {
      return rowRule.map(val => new RuleItem(val));
    });

    this.colsRules = colsRules.map(colRule => {
      return colRule.map(val => new RuleItem(val));
    });

    this.grid = [];
    for (let square = 0; square < width * height; square++) {
      this.grid[square] = new Square(null);
    }

    this.calcApplyingRules();
  }

  get width(): number {
    return this._width;
  }

  get height(): number {
    return this._height;
  }

  getSize(dim: Dimension): number {
    return dim === "row" ? this._width : this._height;
  }

  getRules(dim: Dimension): Rule[] {
    return dim === "row" ? this.rowsRules : this.colsRules;
  }

  getSquareValue(row: number, column: number): SquareType {
    return this.grid[row * this._width + column].value;
  }

  getSquare(row: number, column: number): Square {
    return this.grid[row * this._width + column];
  }

  setSquareValue(row: number, column: number, square: SquareType): void {
    this.grid[row * this._width + column].value = square;
  }

  getVector(dimension: Dimension, index: number): Square[] {
    if (dimension === "row") {
      return this.grid.slice(index * this._width, (index + 1) * this._width);
    } else {
      return this.grid.filter((_item, col) => col % this._width === index);
    }
  }

  replaceConsecutive(dim: Dimension, dimIndex: number, start: number, occurrences: number, val: SquareType): void {
    for (let i = 0; i < occurrences; i++) {
      const row = dim === "row" ? dimIndex : start + i;
      const col = dim === "row" ? start + i : dimIndex;
      this.setSquareValue(row, col, val);
    }
  }

  replaceOccurrences(dim: Dimension, dimIndex: number, oldValue: SquareType, newValue: SquareType): void {
    const maxIteration = dim === "row" ? this._width : this._height;
    for (let idx = 0; idx < maxIteration; idx++) {
      const row = dim === "row" ? dimIndex : idx;
      const col = dim === "row" ? idx : dimIndex;
      if (this.getSquareValue(row, col) === oldValue) {
        this.setSquareValue(row, col, newValue);
      }
    }
  }

  private calcApplyingRules(): void {
    const vectors = this.vectorIterator("both");

    for (const { rule, vector, dimension } of vectors) {
      const possibilities = getPossibilities(rule, this.getSize(dimension));

      possibilities.forEach(combination => {
        let ruleIdx = 0;
        let ruleItem = rule[ruleIdx];
        let rulePartsFound = 0;

        combination.forEach((val, idx) => {
          const square = vector[idx];
          if (val === 0) {
            if (dimension === "row") {
              square.applyingRowRules.add(null);
            } else {
              square.applyingColRules.add(null);
            }
          }

          if (val === 1) {
            if (dimension === "row") {
              square.applyingRowRules.add(ruleItem);
            } else {
              square.applyingColRules.add(ruleItem);
            }

            rulePartsFound++;
            if (rulePartsFound === ruleItem.value) {
              rulePartsFound = 0;
              ruleIdx++;
              ruleItem = rule[ruleIdx];
            }
          }
        });
      });
    }
  }

  // Iterates first through rows and then through cols
  *vectorIterator(type: Dimension | "both"): Generator<VectorData, void> {
    if (type === "row" || type === "both") {
      for (let row = 0; row < this._height; row++) {
        yield { rule: this.rowsRules[row], vector: this.getVector("row", row), index: row, dimension: "row" };
      }
    }

    if (type === "col" || type === "both") {
      for (let col = 0; col < this._width; col++) {
        yield { rule: this.colsRules[col], vector: this.getVector("col", col), index: col, dimension: "col" };
      }
    }
  }

  // Iterates through all the squares, left to right, top to bottom
  *squareIterator(): Generator<Square, void> {
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        yield this.getSquare(row, col);
      }
    }
  }

  // It can be used in for..of like:
  // const it = nonogram.rowItemsIterator(2);
  // for (const itItem of it) {
  //   console.log(itItem);
  // }
  *rowItemsIterator(row: number): Generator<Square, void> {
    for (let i = row * this._width; i < (row + 1) * this._width; i++) {
      yield this.grid[i];
    }
  }

  // It can be used in for..of like:
  // const ite = nonogram.colItemsIterator(6);
  // for (const itItem of ite) {
  //   console.log(itItem);
  // }
  *colItemsIterator(col: number): Generator<Square, void> {
    for (let i = col; i < this._height * this._width; i += this._width) {
      yield this.grid[i];
    }
  }
}
