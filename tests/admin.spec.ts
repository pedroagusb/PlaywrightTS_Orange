import { test, expect } from '../src/fixtures/allFixtures.fixture';
import { EmployeeData } from '../src/types/employee.types';

test.describe('Administration Operations', () => {
    test('Should create new user and verify in table', async ({ adminPage }) => {
        const currentState = await adminPage.getCurrentNavigationState();
        expect(currentState.currentMenu).toBe('Admin');

        const newEmployee: EmployeeData = {
            role: 'Admin',
            employeeName: 'Automation Test Pedro',
            status: 'Enabled',
            username: `autoTestPedro_${Date.now()}`,
            password: 'automation.123'
        }
        
        await adminPage.addEmployee(newEmployee);

        const page = adminPage.getPage();
        await expect(page.locator('.oxd-toast--success'))
        .toContainText('Successfully Saved');

        const userRow = await adminPage.searchUser(newEmployee);

        await expect(userRow).toBeVisible();
        await expect(userRow).toContainText(newEmployee.username);
        await expect(userRow).toContainText(newEmployee.status);
        await expect(userRow).toContainText(newEmployee.role)
    })
})