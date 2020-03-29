interface Array<T> {
  equals(arr: Array<T>): boolean;
  sum(): number;
  replace(start: number, occurences: number, value: T): void;
  replaceCol(start: number, occurences: number, value: T, width: number): void;
}

Array.prototype.equals = function(arr): boolean {
  return this.length == arr.length && this.every((u, i) => u === arr[i]);
};

Array.prototype.sum = function(): number {
  return this.reduce((acc, val) => acc + val);
};

Array.prototype.replace = function(start, occurences, value): void {
  this.splice(start, occurences, ...Array(occurences).fill(value));
};

Array.prototype.replaceCol = function(start, occurences, value, width): void {
  for (let i = 0; i < occurences; i++) {
    const index = start + i * width;
    if (this[index] === null) {
      this[index] = value;
    }
  }
};
