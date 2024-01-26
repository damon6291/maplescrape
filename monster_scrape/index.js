const puppeteer = require("puppeteer");
const writeXlsxFile = require("write-excel-file/node");
const { schema } = require("./schema");
const { listOfMonsters } = require("./monsterList");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIRECTORY = path.resolve("./output");

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

var objects = [];

async function run(name) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`https://osmlib.com/?search=${name}`);

  await timeout(2000);

  const data = await page.$$eval(".ui.label", (elems) =>
    elems.map((e) => {
      var inner = e.innerText.split("\n");
      return {
        name: inner[0],
        value: inner[1],
      };
    })
  );

  const mesos = await page.$$eval(".item-title", (elems) =>
    elems.map((e) => {
      var inner = e.innerText;
      if (inner.includes("Mesos")) return inner;
    })
  );

  const meso = mesos[0].split(" ")[0].replace(",", "") ?? 0;

  const item = {
    name: name,
    level: parseInt(
      data
        .find((x) => x.name.toLowerCase() == "level")
        ?.value.replace(",", "") ?? 0
    ),
    hp: parseInt(
      data.find((x) => x.name.toLowerCase() == "hp")?.value.replace(",", "") ??
        0
    ),
    mp: parseInt(
      data.find((x) => x.name.toLowerCase() == "mp")?.value.replace(",", "") ??
        0
    ),
    accuracy_hit: parseInt(
      data
        .find((x) => x.name.toLowerCase().includes("accuracy to"))
        ?.name.split(" ")[1]
        .replace(",", "") ?? 0
    ),
    meso: parseInt(meso),
    exp: parseInt(
      data.find((x) => x.name.toLowerCase() == "exp")?.value.replace(",", "") ??
        0
    ),
    min_push_damage: parseInt(
      data
        .find((x) => x.name.toLowerCase() == "minimum push damage")
        ?.value.replace(",", "") ?? 0
    ),
    speed: parseInt(
      data
        .find((x) => x.name.toLowerCase() == "speed")
        ?.value.replace(",", "") ?? 0
    ),
    accuracy_monster: parseInt(
      data.find((x) => x.name.toUpperCase() == "ACCURACY".replace(",", "") ?? 0)
        ?.value
    ),
    physical_damage: parseInt(
      data.find(
        (x) => x.name.toLowerCase() == "physical damage".replace(",", "") ?? 0
      )?.value
    ),
    physical_defense: parseInt(
      data.find(
        (x) => x.name.toLowerCase() == "physical defense".replace(",", "") ?? 0
      )?.value
    ),
    magic_damage: parseInt(
      data.find(
        (x) => x.name.toLowerCase() == "magic damage".replace(",", "") ?? 0
      )?.value
    ),
    magic_defense: parseInt(
      data.find(
        (x) => x.name.toLowerCase() == "magic defense".replace(",", "") ?? 0
      )?.value
    ),
  };

  objects.push(item);
  //   console.log(data, item);

  await browser.close();

  return item;
}

async function runAndPrint() {
  if (!fs.existsSync(OUTPUT_DIRECTORY)) {
    fs.mkdirSync(OUTPUT_DIRECTORY);
  }

  for (const item in listOfMonsters) {
    await run(listOfMonsters[item]);
  }

  const stream = await writeXlsxFile(objects, {
    schema,
  });

  const output = fs.createWriteStream(
    path.join(OUTPUT_DIRECTORY, "stream.xlsx")
  );
  stream.pipe(output);
}

runAndPrint();
