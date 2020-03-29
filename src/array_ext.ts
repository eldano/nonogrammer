interface Array<T> {
  equals(arr: Array<T>): boolean;
  sum(): number;
}

Array.prototype.equals = function(arr): boolean {
  return this.length == arr.length && this.every((u, i) => u === arr[i]);
};

Array.prototype.sum = function(): number {
  return this.reduce((acc, val) => acc + val);
};
