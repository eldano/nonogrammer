import { writeFile } from "fs";
import { Nonogram, Square, RuleItem } from "./nonogram";

let largestRowRule = 0;
let largestColRule = 0;

function html(content: string[]): string {
  return `<html>${content.join(" ")}</html>`;
}

function head(content: string[]): string {
  return `<head>${content.join(" ")}</head>`;
}

function title(content: string): string {
  return `<title>${content}</title>`;
}

function style(): string {
  const output = `<style>
  .grid {
    cursor: default;
  }
  .grid-square {
    border: 1px solid darkgrey;
    display: inline-block;
    text-align: center;
    width: 18px;
    height: 17px;
    margin-left: -1px;
    margin-bottom: -1px;
    line-height: 15px;
  }
  .full {
    background-color: black;
  }
  .rule-square {
    border:1px solid darkgrey;
    display:inline-block;
    width:18px;
    height:17px;
    margin-left:-1px;
    margin-bottom:-1px;
    background-color: #D0D0D0;
    line-height:15px;
    text-align:center;
    font-family:Verdana,Arial,sans-serif;
    font-size:11px
  }
  .highlight {
    outline: solid blue;
    outline-width: 2px;
    outline-offset: -2px;
  }
  .linethrough {
    text-decoration:line-through;
  }
  .pad-square {
    border:1px solid #F0F0F0;
    display:inline-block;
    width:18px;
    height:17px;
    margin-left:-1px;
    margin-bottom:-1px;
    background-color: #F0F0F0;
    line-height:15px;
  }
  </style>`;

  return output;
}

function body(content: string[]): string {
  return `<body>${content.join(" ")}</body>`;
}

function h1(content: string): string {
  return `<h1>${content}</h1>`;
}

function gridSquare(square: Square): string {
  const klass = square.value === 1 ? "full" : "";
  const content = square.value === null ? "-" : "&nbsp;";

  const rowRules = [];
  for (const rowRule of square.applyingRowRules) {
    rowRule ? rowRules.push(rowRule.value) : rowRules.push("null");
  }
  const colRules = [];
  for (const colRule of square.applyingColRules) {
    colRule ? colRules.push(colRule.value) : colRules.push("null");
  }

  const title = `RowRules: [${rowRules}]\nColRules: [${colRules}]`;

  const dataRowRuleIds: string[] = [];
  for (const rowRule of square.applyingRowRules) {
    if (rowRule) dataRowRuleIds.push(rowRule.id);
  }

  const dataColRuleIds: string[] = [];
  for (const colRule of square.applyingColRules) {
    if (colRule) dataColRuleIds.push(colRule.id);
  }

  return `<div
    id='${square.id}'
    class='grid-square ${klass}'
    title='${title}'
    data-row-rules=${JSON.stringify(dataRowRuleIds)}
    data-col-rules=${JSON.stringify(dataColRuleIds)}>
    ${content}
    </div>`;
}

function script(): string {
  const output = `<script>
  function highlightRule(id) {
    document.querySelector("#" + id).classList.add('highlight')
  }

  function clearHighlight() {
    document.querySelectorAll(".rule-square").forEach(el => el.classList.remove('highlight'))
  }

  document.querySelectorAll(".grid-square").forEach(elem => {
    elem.addEventListener('mouseenter', () => {
      const dataset = event.target.dataset;
      const rowRules = JSON.parse(dataset.rowRules);
      const colRules = JSON.parse(dataset.colRules);

      clearHighlight();
      rowRules.forEach(rowRule => highlightRule(rowRule));
      colRules.forEach(colRule => highlightRule(colRule));
    });
  });

  </script>`;
  return output;
}

function ruleSquare(ruleItem: RuleItem | null): string {
  const value = ruleItem === null ? "&nbsp;" : ruleItem.value;
  const title = ruleItem !== null ? `${ruleItem.revealedSquares}/${ruleItem.value}` : "";
  const lineThrough = ruleItem?.fullfilled ? "linethrough" : "";
  const id = ruleItem !== null ? ruleItem.id : "";
  return `<div id='${id}' class='rule-square ${lineThrough}' title=${title}>${value}</div>`;
}

function padSquare(): string {
  return `<div class='pad-square'>&nbsp</div>`;
}

export default function printHtml(nonogram: Nonogram): void {
  largestRowRule = Math.max(...nonogram.getRules("row").map(rule => rule.length));
  largestColRule = Math.max(...nonogram.getRules("col").map(rule => rule.length));

  const iterator = nonogram.vectorIterator("row");
  let grid = "<div class='grid'>";

  for (let i = largestColRule - 1; i >= 0; i--) {
    grid += "<div>";
    for (let j = 0; j < largestRowRule; j++) {
      grid += padSquare();
    }

    nonogram.getRules("col").forEach(rule => {
      if (rule.length - 1 < i) {
        grid += ruleSquare(null);
      } else {
        grid += ruleSquare(rule[rule.length - 1 - i]);
      }
    });
    grid += "</div>";
  }

  for (const { rule, vector } of iterator) {
    grid += "<div>";

    const spacesToTheLeft = largestRowRule - rule.length;

    for (let j = 0; j < spacesToTheLeft; j++) {
      grid += ruleSquare(null);
    }

    for (let i = 0; i < rule.length; i++) {
      grid += ruleSquare(rule[i]);
    }

    grid += vector.map(square => gridSquare(square)).join("");
    grid += "</div>";
  }

  grid += "</div>";

  //prettier-ignore
  const output = html([
    head([
      title("Nonogram"),
      style()
    ]),
    body([
      h1(`Nonogram ${nonogram.width} x ${nonogram.height}`),
      grid,
      script()
    ]),
  ]);

  writeFile("./out/nonogram.html", output, err => err && console.error(err));
  console.log("done");
}
