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
  let output = "<style>";

  output += ".grid-square {border:1px solid darkgrey;display:inline-block;text-align:center;";
  output += "width:18px;height:17px;margin-left:-1px;margin-bottom:-1px;line-height:15px;}";

  output += ".full {background-color:black;}";

  output += ".rule-square {border:1px solid darkgrey;display:inline-block;";
  output += "width:18px;height:17px;margin-left:-1px;margin-bottom:-1px;";
  output += "background-color: #D0D0D0;line-height:15px;";
  output += "text-align:center;font-family:Verdana,Arial,sans-serif;font-size:11px}";

  output += ".pad-square {border:1px solid #F0F0F0;display:inline-block;";
  output += "width:18px;height:17px;margin-left:-1px;margin-bottom:-1px;";
  output += "background-color: #F0F0F0;line-height:15px;}";

  output += "</style>";

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

  return `<div class='grid-square ${klass}' title='${title}'>${content}</div>`;
}

function ruleSquare(ruleItem: RuleItem | null): string {
  const value = ruleItem === null ? "&nbsp;" : ruleItem.value;
  return `<div class='rule-square'>${value}</div>`;
}

function padSquare(): string {
  return `<div class='pad-square'>&nbsp</div>`;
}

export default function printHtml(nonogram: Nonogram): void {
  largestRowRule = Math.max(...nonogram.getRules("row").map(rule => rule.length));
  largestColRule = Math.max(...nonogram.getRules("col").map(rule => rule.length));

  const iterator = nonogram.vectorIterator("row");
  let grid = "";

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

  //prettier-ignore
  const output = html([
    head([
      title("Nonogram"),
      style()
    ]),
    body([
      h1(`Nonogram ${nonogram.width} x ${nonogram.height}`),
      grid
    ]),
  ]);

  writeFile("./out/nonogram.html", output, err => err && console.error(err));
  console.log("done");
}
