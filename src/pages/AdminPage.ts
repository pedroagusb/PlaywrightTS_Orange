import { EmployeeData } from "../types/employee.types";
import { BasePage } from "./base/BasePage";
import { Locator, Page } from "@playwright/test";
import { NavigationState } from "../types/dashboard.types"
import { DashboardPage } from "./DashboardPage";

export class AdminPage extends DashboardPage{

    private readonly addButton = 'button.oxd-button:has-text("Add")';
    private readonly saveButton = 'button[type="submit"]';

    constructor(page: Page){
        super(page);
        this.navigationState = {
            currentMenu: 'Admin',
            currentTab: 'Users'
        };
    }

    async addEmployee(employeeData: EmployeeData): Promise<void> {

        // clickElement uses locator(), so it's not needed to validate if the registration screen appears
        await this.clickElement(this.addButton);

        await this.selectDropdownOption('User Role', employeeData.role);
        await this.selectDropdownOption('Status', employeeData.status);

        await this.fillAutocomplete('Employee Name','James', 'James Butler');

        await this.fillFormText('Username', employeeData.username);
        await this.fillFormText('Password', employeeData.password);
        await this.fillFormText('Confirm Password', employeeData.password);

        await this.clickElement(this.saveButton);
    }

    async searchUser(employeeData: EmployeeData): Promise<Locator> {
        await this.waitForLoadingSpinner();
        
        await this.fillFormText('Username', employeeData.username);
        await this.clickElement('button[type="submit"]');

        await this.waitForLoadingSpinner();

        const table = this.page.getByRole('table');
        const rows = this.page.getByRole('row');
        const targetRow = rows.filter({ hasText: `${employeeData.username}`})

        return targetRow
    }
}