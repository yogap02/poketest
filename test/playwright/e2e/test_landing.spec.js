import { homepage } from "../page_objects/homepage";

const { test, expect } = require("@playwright/test");

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

test("Check Search Feature", async ({ page }) => {
  const home = new homepage(page);
  await page.goto("/");
  await expect(page).toHaveTitle(home.title);
  await home.searchBar.click();
  await home.searchBar.fill("Pikachu");
  const locator = page.locator('a[class*="pokemon-card"]').first();
  await expect(locator, "Pikachu is shown up").toContainText("Pikachu", {
    timeout: 5000,
  });
  await expect(locator, "Pikachu included in electric pokemon").toContainText(
    "electric",
    { timeout: 5000 }
  );
  await locator.click();
  const detailName = page.locator("h1");
  await expect(detailName, "Detail card have Pikachu's name").toHaveText(
    "Pikachu",
    { timeout: 5000 }
  );
  const image = page.locator('img[alt="Pikachu"]');
  await expect(image, "Image is showing alt text of Pikachu").toBeVisible();
});

test("Check Filter Feature", async ({ page }) => {
  const home = new homepage(page);
  await page.goto("/");
  await expect(page).toHaveTitle(home.title);
  await page.selectOption('select[class*="mx-px"] >> nth=-1', { label: "Bug" });
  const cardList = page.locator('a[class*="pokemon-card"]')
  const totalCount = await cardList.count()
  await delay(2000);
  for (let a = 0; a < totalCount; a++) {
    await expect(page.locator('a[class*="pokemon-card"]').nth(a), `Card #${a} is contain bug type pokemon`).toContainText("bug", { timeout: 5000 });
  }
});
