import { BasePage } from "./base/BasePage";
import { Page } from "@playwright/test";
import { DashboardMenu, NavigationState } from "../types/dashboard.types";

export class DashboardPage extends BasePage {

    protected navigationState: NavigationState;

    private readonly mainMenu = 'a.oxd-main-menu-item'; //Menus locator
    private readonly dashboardMenu = 'div.orangehrm-attendance-card'; // Locator of Menu Dashboard
    private readonly breadcrumbMenu = 'span.oxd-topbar-header-breadcrumb';
    constructor (page: Page){
        super(page);
        this.navigationState = {
            currentMenu: 'Dashboard',
        };
    }

    async navigateToMainMenu(menu: DashboardMenu): Promise<void> {
        try{
            // Click in menu option - 'has-text' looks in child nodes w/Regex
            await this.clickElement(`${this.mainMenu}:has-text("${menu}")`); 

            if(menu === 'Dashboard'){
                await this.waitForElementVisible(this.dashboardMenu);
            }
            else {
                await this.waitForElementVisible(`${this.breadcrumbMenu}:has-text("${menu}")`);

                await this.page.waitForLoadState('networkidle');
            }

            this.navigationState.currentMenu = menu;
                
        } catch(error){
            throw new Error(`Error navigating to ${menu}: ${error}`);
        }
    }

    async getCurrentNavigationState():Promise<NavigationState>{
        return this.navigationState;
    }
}



