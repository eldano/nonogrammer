export type Hints = Array<number>;
type Square = 0 | 1;

export class Nonogram {
  width: number;
  height: number;
  rowHints: Array<Hints>;
  colHints: Array<Hints>;
  grid: Array<Array<Square>>;

  constructor() {
    this.width = 1;
    this.height = 1;
    this.rowHints = [];
    this.colHints = [];
    this.grid = [[0]];
  }
}
