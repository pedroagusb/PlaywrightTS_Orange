import { BasePage } from "./base/BasePage";
import { Page } from "@playwright/test";
import { Credentials } from "../types/user.types";
import { environments } from "../config/environments";

export class LoginPage extends BasePage {

    private readonly usernameInput = 'input[name="username"]';
    private readonly passwordInput = 'input[name="password"]';
    private readonly loginButton = 'button[type="submit"]';
    private readonly errorMessage = 'div[role="alert"]';
    private readonly successIndicator = 'div.oxd-topbar-header-title';
    
    constructor(page: Page){
        super(page);
    }

    async goto(): Promise<void> {
        await this.navigateTo(environments.Demo.baseUrl);
    }

    async login(credentials: Credentials): Promise<void>{
        await this.fillText(this.usernameInput, credentials.username);
        await this.fillText(this.passwordInput, credentials.password);

        await this.clickElement(this.loginButton);
    }

    async isLoginSuccessful(): Promise<boolean> {
        try {
            await this.page.waitForSelector(this.successIndicator, { timeout: 10000 });
            return true;
        } catch (error) {
            return false;
        }
    }

    async getErrorMessage(): Promise<string> {
        return await this.getElementText(this.errorMessage);
    }
}