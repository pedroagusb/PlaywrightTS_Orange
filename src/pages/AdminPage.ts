import { EmployeeData } from "../types/employee.types";
import { BasePage } from "./base/BasePage";
import { Page } from "@playwright/test";
import { NavigationState } from "../types/dashboard.types"
import { DashboardPage } from "./DashboardPage";

export class AdminPage extends DashboardPage{

    private readonly addButton = 'button.oxd-main-menu-button';
    private readonly employeeRegisterScreen = 'form.oxd-form';
    private readonly userRoleDropdown = '???';    // TODO: Inspeccionar
    private readonly employeeNameInput = '???';   // TODO: Inspeccionar
    private readonly statusDropdown = '???';      // TODO: Inspeccionar
    private readonly usernameInput = '???';       // TODO: Inspeccionar
    private readonly passwordInput = '???';       // TODO: Inspeccionar
    private readonly confirmPasswordInput = '???';// TODO: Inspeccionar
    private readonly saveButton = '???';          // TODO: Inspeccionar

    constructor(page: Page){
        super(page);
        this.navigationState = {
            currentMenu: 'Admin',
            currentTab: 'Users'
        };
    }

    async addEmployee(employeeData: EmployeeData): Promise<void> {

        await this.clickElement(this.addButton);
        await this.waitForElementVisible(this.employeeRegisterScreen, 5000);

        await this.selectDropdownOption(this.userRoleDropdown, employeeData.role);

        await this.fillText(this.employeeNameInput, employeeData.employeeName);

        await this.selectDropdownOption(this.statusDropdown, employeeData.status);
        
        await this.fillText(this.usernameInput, employeeData.username);
        await this.fillText(this.passwordInput, employeeData.password);
        await this.fillText(this.confirmPasswordInput, employeeData.password);

        await this.clickElement(this.saveButton);
    }

}