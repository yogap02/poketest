import { delay } from "../helper/helper";

const { expect } = require('@playwright/test');

exports.HomePage = class HomePage {

  constructor(page) {
    this.page = page;
    this.title = "Pokémon Awesome";
    this.detailName = page.locator("h1");
    this.searchBar = page.locator('input[placeholder="🔍 Search pokémon"]');
    this.pokemonCards = page.locator('a[class*="pokemon-card"]');
    this.nameOnCards = page.locator('a[class*="pokemon-card"] >> b[class*="text-xl"]');
  }

  async visit() {
    await this.page.goto("/");
    await expect(this.page).toHaveTitle(this.title);
  }

  async search(pokemonName, pokemonElement) {
    console.log(`Execute search with pokemon name ${pokemonName} with element ${pokemonElement}`)
    pokemonElement = pokemonElement.toLowerCase();
    await delay(2000);
    await this.searchBar.click();
    await this.searchBar.fill(pokemonName);
    const locator = this.pokemonCards.first();
    await expect(locator, `${pokemonName} is shown up`).toContainText(pokemonName,{timeout: 5000,});
    await expect(locator,`${pokemonName} included in ${pokemonElement} pokemon`).toContainText(pokemonElement, { timeout: 5000 });
    await locator.click();
    await expect(this.detailName, `Detail card have ${pokemonName}'s name`).toHaveText(pokemonName, { timeout: 5000 });
    const image = this.page.locator(`img[alt=${pokemonName}]`);
    await expect(image, `Image is showing alt text of ${pokemonName}`).toBeVisible();
  }

  async filterType(pokemonType) {
    console.log(`Execute function Filter Type with value ${pokemonType}`)
    await delay(2000);
    await this.page.selectOption('select[class*="mx-px"] >> nth=-1', { label: pokemonType });
    pokemonType = pokemonType.toLowerCase()
    const totalCount = await this.pokemonCards.count()
    await delay(1000);
    for (let index = 0; index < totalCount; index++) {
      let target = await this.pokemonCards.nth(index)
      let textOnCard = await target.innerText()
      let nameOfPokemon = await textOnCard.split('\n')[0]
      await expect(target, `Card #${index}, ${nameOfPokemon} is a ${pokemonType} type Pokemon`).toContainText(pokemonType, { timeout: 5000 });
    }
  }
}
