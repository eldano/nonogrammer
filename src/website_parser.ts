// website_parser

// #nonogram_table (whole nonogram)
const grid = document.querySelector(".nmtc table") as HTMLTableElement;
const rowRules = document.querySelector(".nmtl table") as HTMLTableElement;
const colRules = document.querySelector(".nmtt table") as HTMLTableElement;

const height = grid.rows.length;
const width = grid.rows[0].cells.length;

const rowRulesValues = [];
const colRulesValues = [];

const maxColRules = colRules.rows.length;
const maxRowRules = rowRules.rows[0].cells.length;

for (let idx = 0; idx < width; idx++) {
  const rule = [];
  for (let i = 0; i < maxColRules; i++) {
    const ruleValue = +colRules.rows[i].cells[idx].innerText;
    if (ruleValue > 0) {
      rule.push(ruleValue);
    }
  }
  colRulesValues.push(rule);
}

for (let idx = 0; idx < height; idx++) {
  const rule = [];
  for (let i = 0; i < maxRowRules; i++) {
    const ruleValue = +rowRules.rows[idx].cells[i].innerText;
    if (ruleValue > 0) {
      rule.push(ruleValue);
    }
  }
  rowRulesValues.push(rule);
}
