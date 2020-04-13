import { Nonogram } from "./nonogram";
import "./array_ext";

function strategyTwo(nonogram: Nonogram): void {
  for (const square of nonogram.squareIterator()) {
    const applyingRowRules = Array.from(square.applyingRowRules);
    const applyingColRules = Array.from(square.applyingColRules);

    if (applyingRowRules.every(rule => rule !== null) || applyingColRules.every(rule => rule !== null)) {
      square.value = 1;
    } else {
      if (applyingRowRules.equals([null]) || applyingColRules.equals([null])) {
        square.value = 0;
      }
    }
  }
}

export default function solve(nonogram: Nonogram): void {
  strategyTwo(nonogram);
}
