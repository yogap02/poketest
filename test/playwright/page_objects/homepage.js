export class homepage {

    constructor(page) {
        this.page = page;
        this.title = 'Pokémon Awesome';
        this.searchBar = page.locator('input[placeholder="🔍 Search pokémon"]');
    }

}