const puppeteer = require("puppeteer");
const { monsterName } = require("./monsterList");

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

var objects = [];

async function run(name) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`https://osmlib.com/?search=${name}`);

  await timeout(2000);

  const first = await page.$$eval(
    ".item-table-container .item-title",
    (elems) => elems.map((e) => e.innerText)
  );

  const second = await page.$$eval(
    ".item-table-container .percent-chance",
    (elems) => elems.map((e) => e.innerText)
  );

  // const data = await first.$$eval(".item-title", (elemes) =>
  //   elemes.map((e) => e.innerText)
  // );

  console.log(first, second);

  // const data = await target.$$eval(".item-title", (elems) => elems.innerText);

  // console.log(data);
  //   elems.map((e) => ({
  //     name: querySelectorAll(".item-title", (i) => ({ name: i.innerText })),
  //   }))
  // );

  //   console.log(data, item);

  await browser.close();
}

async function runAndPrint() {
  await run(monsterName);
}

runAndPrint();
