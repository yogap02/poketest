const { HomePage } = require("../page_objects/homepage");
const { test } = require("@playwright/test");

const pokemonElementList = [
  "Bug",
  "Dark",
  "Dragon",
  "Electric",
  "Fairy",
  "Fighting",
  "Fire",
  "Flying",
  "Ghost",
  "Grass",
  "Ground",
  "Ice",
  "Normal",
  "Poison",
  "Psychic",
  "Rock",
  "Steel",
  "Water",
];

test.beforeEach(async ({ page }) => {
  const home = new HomePage(page);
  await home.visit();
});

test("Check Search", async ({ page }) => {
  const home = new HomePage(page);
  await home.search("Pidgey", "Flying");
});

for (let element in pokemonElementList) {
  test(`Check Filter Pokemon Type with value ${pokemonElementList[element]}`, async ({ page }) => {
    const home = new HomePage(page);
    await home.filterType(pokemonElementList[element]);
  });
}
