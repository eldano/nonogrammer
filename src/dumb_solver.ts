import { Nonogram } from "./nonogram";
import "./array_ext";
import { getPossibilities } from "./utils";

function calcApplyingRules(nonogram: Nonogram): void {
  const vectors = nonogram.vectorIterator("both");

  for (const { rule, vector, dimension } of vectors) {
    const possibilities = getPossibilities(rule, nonogram.getSize(dimension));

    const filteredPossibilities = possibilities.filter(possibility => {
      return vector.every((square, index) => {
        if (square.value === 0 || square.value === 1) {
          return possibility[index] === square.value;
        } else {
          return true;
        }
      });
    });

    filteredPossibilities.forEach(combination => {
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

function clearApplyingRules(nonogram: Nonogram): void {
  for (const square of nonogram.squareIterator()) {
    square.applyingRowRules.clear();
    square.applyingColRules.clear();
  }
}

export default function solve(nonogram: Nonogram): void {
  const iterations = 15;

  for (let i = 0; i < iterations; i++) {
    clearApplyingRules(nonogram);
    calcApplyingRules(nonogram);
    strategyTwo(nonogram);
  }
}
