export type Hints = Array<number>;

export class Structure {
  width: number;
  height: number;
  rowHints: Array<Hints>;
  colHints: Array<Hints>;
  grid: Array<Array<boolean>>;

  constructor() {
    this.width = 1;
    this.height = 1;
    this.rowHints = [];
    this.colHints = [];
    this.grid = [[false]];
  }
}
