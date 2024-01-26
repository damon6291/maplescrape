const puppeteer = require("puppeteer");
const { monsterList } = require("./monsterList");
const writeXlsxFile = require("write-excel-file/node");
const path = require("path");
const fs = require("fs");
require("streammagic")();

const OUTPUT_DIRECTORY = path.resolve("./name_output");
const PERCENT_DIRECTORY = path.resolve("./percent_output");

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

var excel_object = [];
var names_object = [];
var percentages_object = [];

async function run(name) {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto(`https://osmlib.com/?search=${name}`);

  await timeout(2000);

  const firstDiv = await page.$$("div.item-table-container");

  const names = await firstDiv[0].$$eval(".item-title", (elems) =>
    elems.map((e) => e.innerText)
  );
  names.shift();

  const percentages = await firstDiv[0].$$eval(".percent-chance", (elems) =>
    elems.map((e) => e.innerText)
  );
  percentages.shift();

  names_object = names;
  percentages_object = percentages;

  await browser.close();
}

const schema = [
  {
    column: "monsterName",
    type: String,
    value: (x) => x.monsterName,
  },
  {
    column: "itemName",
    type: String,
    value: (x) => x.itemName,
  },
  {
    column: "percent",
    type: Number,
    value: (x) => x.percentage,
  },
];

async function printPercentage(monsterName) {
  if (!fs.existsSync(PERCENT_DIRECTORY)) {
    fs.mkdirSync(PERCENT_DIRECTORY);
  }

  for (var i in names_object) {
    var name = names_object[i];
    var percent = percentages_object[i];
    percent = percent.substring(0, percent.length - 1);

    excel_object.push({
      itemName: name,
      monsterName: monsterName,
      percentage: parseFloat(percent ?? 0),
    });
  }

  const stream = await writeXlsxFile(excel_object, {
    schema,
  });

  const output = fs.createWriteStream(
    path.join(PERCENT_DIRECTORY, `${monsterName}_percent.xlsx`)
  );
  stream.pipe(output);
}

async function runAndPrint() {
  if (!fs.existsSync(OUTPUT_DIRECTORY)) {
    fs.mkdirSync(OUTPUT_DIRECTORY);
  }
  for (var i in monsterList) {
    var monsterName = monsterList[i];
    console.log("Starting monster percentage", monsterName);
    await run(monsterName);

    var jsonStr = JSON.stringify(names_object);

    const output = fs.createWriteStream(
      path.join(OUTPUT_DIRECTORY, `${monsterName}.json`)
    );
    jsonStr.toStream().pipe(output);

    printPercentage(monsterName);
    console.log("End monster percentage", monsterName);
  }
}

runAndPrint();
