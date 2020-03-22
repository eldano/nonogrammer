export type Hints = Array<number>;
type Square = 0 | 1;

export class Nonogram {
  width: number;
  height: number;
  rowHints: Array<Hints>;
  colHints: Array<Hints>;
  grid: Array<Array<Square>>;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.rowHints = [];
    this.colHints = [];
    this.grid = [];

    for (let row = 0; row < height; row++) {
      this.grid[row] = [];
      for (let col = 0; col < width; col++) {
        this.grid[row][col] = 0;
      }
    }
  }
}
