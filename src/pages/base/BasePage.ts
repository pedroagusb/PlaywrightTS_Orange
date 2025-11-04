import { Locator, Page } from '@playwright/test';

export class BasePage {
    protected page: Page;

    constructor(page: Page){
        this.page = page;
    }

    // Getter for Encapsulation of page
    getPage(): Page {
        return this.page;
    }

    async navigateTo(url: string): Promise<void> {
        try{
            await this.page.goto(url);
            await this.page.waitForLoadState('domcontentloaded');
        } catch(error){
            throw new Error(`Error trying to navigate to ${url} url`);
        }
    }

    async waitForPageLoad(): Promise<void> {
        this.page.waitForLoadState('domcontentloaded')
    }

    async isElementVisible(selector: string): Promise<boolean> {
       return await this.getElement(selector).isVisible();
    }

    async clickElement(selector: string): Promise<void> {
        await this.page.click(selector, { timeout: 5000 });
    }

    async fillText(selector:string, text: string): Promise<void> {
        const element = await this.waitForElement(selector);
        await element.fill(text);
    }

    async getElementText(selector: string): Promise<string> {
        const element = await this.waitForElement(selector);
        return element.innerText();
    }

    async waitForElementVisible(selector: string, timeout = 5000): Promise<void> {
        await this.waitForElement(selector, timeout);
    }

    private getElement(selector: string){
        return this.page.locator(selector);
    }

    private async waitForElement(selector: string, timeout = 5000): Promise<Locator>{
        const element = this.getElement(selector);

        await element.waitFor({state: 'visible', timeout});
        return element;
    }

    protected async selectDropdownOption(
        labelText: string,
        optionText: string
    ): Promise<void>{
        try{
            const dropdown = this.getDropDownByLabel(labelText);
            await dropdown.click();

            await this.page.waitForSelector('.oxd-select-dropdown', { 
                state: 'visible',
                timeout: 5000 
            });

            await this.page.locator('.oxd-select-dropdown')
                .locator(`text=${optionText}`)
                .click();

            await this.page.locator(`[role='option']:has-text("${optionText}")`)
                .click();

        }catch(error){
            throw new Error(`Failed to select "${optionText}" from "${labelText}" dropdown. ${error}`);      
        }     
    }

    private getDropDownByLabel(labelText: string) {
        return this.page.locator('.oxd-input-group', {
            has: this.page.locator(`label:has-text("${labelText}")`)
        }).locator('.oxd-select-text');
    }
}