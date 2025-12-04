import { EmployeeData } from "../types/employee.types";
import { BasePage } from "./base/BasePage";
import { Locator, Page } from "@playwright/test";
import { NavigationState } from "../types/dashboard.types"
import { DashboardPage } from "./DashboardPage";

export class AdminPage extends DashboardPage{

    private readonly addButton = 'button.oxd-button:has-text("Add")';
    private readonly saveButton = 'button[type="submit"]';

    private readonly deleteButton = 'button.oxd-icon-button:has(i.bi-trash)';
    private readonly editButton =  'button.oxd-icon-button:has(i.bi-pencil-fill)';

    private readonly confirmDeleteButton = 'button.oxd-button:has(i.bi-trash)';
    private readonly saveEditButton = 'button[type="submit"]';

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

        await this.fillAutocomplete('Employee Name',employeeData.employeeName, employeeData.employeeName);

        await this.fillFormText('Username', employeeData.username);

        if(employeeData.password){
            await this.fillFormText('Password', employeeData.password);
            await this.fillFormText('Confirm Password', employeeData.password);
        }
        
        await this.clickElement(this.saveButton);
    }

    async searchUserByUsername(username: string): Promise<Locator> {
        await this.waitForLoadingSpinner();
        
        await this.fillFormText('Username', username);
        await this.clickElement('button[type="submit"]');

        await this.waitForLoadingSpinner();

        const table = this.page.getByRole('table');
        const rows = table.getByRole('row');
        const targetRow = rows.filter({ hasText: `${username}`})

        return targetRow
    }

    async searchUserByOption(value: 'Status' | 'User Role', option: string): Promise<Locator> {
        await this.waitForLoadingSpinner();

        await this.selectDropdownOption(`${value}`, option);
        await this.clickElement('button[type="submit"]');

        await this.waitForLoadingSpinner();

        const table = this.page.getByRole('table');
        const rows = table.getByRole('row');
        const targetRow = rows.filter({ hasText: `${option}`}).last();

        return targetRow;
    }

    async deleteUser(userRow: Locator): Promise<void> {
        const deleteButton = userRow.locator(this.deleteButton);
        await deleteButton.click();

        await this.clickElement(this.confirmDeleteButton);
    }

    async editUser(userRow: Locator, existingEmployee: Partial<EmployeeData>): Promise<void> {
        const editButton = userRow.locator(this.editButton);
        await editButton.click();

        await this.waitForLoadingSpinner();

        if(existingEmployee.username){
            await this.fillFormText('Username', existingEmployee.username);
        }

        if(existingEmployee.status){
            await this.selectDropdownOption('Status', existingEmployee.status);
        }

        if(existingEmployee.role){
            await this.selectDropdownOption('User Role', existingEmployee.role);
        }     

        await this.clickElement(this.saveEditButton);
        
        await this.waitForLoadingSpinner();
    }
}