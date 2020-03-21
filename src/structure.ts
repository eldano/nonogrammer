export type HintDefinition = Array<number>;

interface Structure {
  width: number;
  height: number;
  rowDefinitions: Array<HintDefinition>;
  colDefinitions: Array<HintDefinition>;
  grid: Array<Array<boolean>>;
}

const structure: Structure = {
  width: 5,
  height: 5,
  rowDefinitions: [],
  colDefinitions: [],
  grid: [],
};

//https://www.nonograms.org/nonograms/i/21
export function init(): Structure {
  structure.width = 10;
  structure.height = 5;

  structure.rowDefinitions = [[8], [10], [1, 8], [8], [4]];
  structure.colDefinitions = [[2], [1, 1], [4], [4], [5], [5], [5], [5], [4], [3]];

  structure.grid = [
    Array(10).fill(false),
    Array(10).fill(false),
    Array(10).fill(false),
    Array(10).fill(false),
    Array(10).fill(false),
  ];

  return structure;
}
