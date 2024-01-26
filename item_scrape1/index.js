const puppeteer = require("puppeteer");
const writeXlsxFile = require("write-excel-file/node");
const { schema } = require("./schema");
const { listOfItems } = require("./itemList");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIRECTORY = path.resolve("./output");

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

var objects = [];

async function run(itemName) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`https://osmlib.com/?search=${itemName}`);

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

  // const effects = await page.$eval(".ui.label.stats.long", (e) => e.innerText);

  // const effectArray = [];
  // const effectSplit = effects.split("\n");
  // for (var index in effectSplit) {
  //   if (index == 0) continue;
  //   var effect = effectSplit[index];
  //   var name = effect.replace(/[^a-zA-Z]+/g, "");
  //   var statsArray = effectSplit[index].split(" ");
  //   var stat = statsArray.pop();
  //   stat = stat.replace(/[()]+/g, "");
  //   console.log(name, stat);
  //   var temp = {};
  //   if (name == "") continue;
  //   temp[`effect_${name.toLowerCase()}`] = stat;
  //   effectArray.push(temp);
  // }

  const long = await page.$$eval(".ui.label.stats.long", (elems) =>
    elems.map((e) => {
      return e.innerText;
    })
  );

  const arr = [];
  for (var i in long) {
    var split = long[i].split("\n");
    var type = split[0];
    for (var j in split) {
      if (j == 0) continue;
      var effect = split[j];
      var name = effect.replace(/[^a-zA-Z]+/g, "");
      if (name == "") continue;
      var stat = split[j].split(" ").pop().replace(/[()]+/g, "");
      arr.push({ name: `${type}_${name}`, value: stat });
    }
  }

  const item = {
    name: itemName,
    category: data.find((x) => x.name.toLowerCase() == "category")?.value,
    sub_category: data.find((x) => x.name.toLowerCase() == "sub category")
      ?.value,

    overall_category: data.find(
      (x) => x.name.toLowerCase() == "overall category"
    )?.value,
    job: data.find((x) => x.name.toLowerCase() == "job")?.value ?? "",
    required_level: parseInt(
      data
        .find((x) => x.name.toLowerCase() == "required level")
        ?.value.replace(",", "") ?? 0
    ),
    required_str: parseInt(
      arr
        .find((x) => x.name.toUpperCase() == "REQUIRED STATS_STR")
        ?.value.replace(",", "") ?? 0
    ),
    required_dex: parseInt(
      arr
        .find((x) => x.name.toUpperCase() == "REQUIRED STATS_DEX")
        ?.value.replace(",", "") ?? 0
    ),
    required_int: parseInt(
      arr
        .find((x) => x.name.toUpperCase() == "REQUIRED STATS_INT")
        ?.value.replace(",", "") ?? 0
    ),
    required_luk: parseInt(
      arr
        .find((x) => x.name.toUpperCase() == "REQUIRED STATS_LUK")
        ?.value.replace(",", "") ?? 0
    ),
    required_pop: parseInt(
      arr
        .find((x) => x.name.toUpperCase() == "REQUIRED STATS_POP")
        ?.value.replace(",", "") ?? 0
    ),
    upgrade_slots: parseInt(
      data
        .find((x) => x.name.toLowerCase() == "upgrade slots")
        ?.value.replace(",", "") ?? 0
    ),
    sells_for: parseInt(
      data
        .find((x) => x.name.toLowerCase() == "sells for")
        ?.value.replace(",", "") ?? 0
    ),
    // weapon_damage:
    //   data.find((x) => x.name.toLowerCase() == "weapon attack")?.value ?? "",
    slot_max: parseInt(
      data
        .find((x) => x.name.toLowerCase() == "slot max")
        ?.value.replace(",", "") ?? 0
    ),
    effect_str:
      arr.find((x) => x.name.toLowerCase() == "effects_str")?.value ?? "",
    effect_dex:
      arr.find((x) => x.name.toLowerCase() == "effects_dex")?.value ?? "",
    effect_int:
      arr.find((x) => x.name.toLowerCase() == "effects_int")?.value ?? "",
    effect_luk:
      arr.find((x) => x.name.toLowerCase() == "effects_luk")?.value ?? "",
    effect_physical_damage:
      data.find((x) => x.name.toLowerCase() == "weapon attack")?.value ?? "",
    effect_physical_defense:
      arr.find((x) => x.name.toLowerCase() == "effects_weapondef")?.value ?? "",
    effect_magic_damage:
      data.find((x) => x.name.toLowerCase() == "magic attack")?.value ?? "",
    effect_magic_defense:
      arr.find((x) => x.name.toLowerCase() == "effects_magicdef")?.value ?? "",
    effect_hp:
      arr.find((x) => x.name.toLowerCase() == "effects_hp")?.value ?? "",
    effect_mp:
      arr.find((x) => x.name.toLowerCase() == "effects_mp")?.value ?? "",
    effect_attack_speed:
      data.find((x) => x.name.toLowerCase() == "attack speed")?.value ?? "",
    effect_movement_speed:
      arr.find((x) => x.name.toLowerCase() == "effects_speed")?.value ?? "",
    effect_avoidability:
      arr.find((x) => x.name.toLowerCase() == "effects_avoidability")?.value ??
      "",
    effect_accuracy:
      arr.find((x) => x.name.toLowerCase() == "effects_accuracy")?.value ?? "",
    effects_jump:
      arr.find((x) => x.name.toLowerCase() == "effects_jump")?.value ?? "",
  };

  objects.push(item);
  // console.log(data, item, arr);

  await browser.close();

  return item;
}

async function runAndPrint() {
  if (!fs.existsSync(OUTPUT_DIRECTORY)) {
    fs.mkdirSync(OUTPUT_DIRECTORY);
  }

  for (const item in listOfItems) {
    await run(listOfItems[item]);
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
