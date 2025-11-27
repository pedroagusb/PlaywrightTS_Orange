import { test, expect } from '../src/fixtures/allFixtures.fixture';
import { ActiveEmployeeData, NewEmployeeData } from '../src/types/employee.types';

test.describe('Administration Operations', () => {
    test('Should create new user and verify in table', async ({ adminPage }) => {
        const currentState = await adminPage.getCurrentNavigationState();
        expect(currentState.currentMenu).toBe('Admin');

        const newEmployee: NewEmployeeData = {
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

        const userRow = await adminPage.searchUserByUsername(newEmployee.username);

        await expect(userRow).toBeVisible();
        await expect(userRow).toContainText(newEmployee.username);
        await expect(userRow).toContainText(newEmployee.status);
        await expect(userRow).toContainText(newEmployee.role)
    })

    test('Should be able to search an existing user', async({adminPage}) => {
        const currentState = await adminPage.getCurrentNavigationState();
        expect(currentState.currentMenu).toBe('Admin');

        const existingEmployee: ActiveEmployeeData = {
            role: 'Admin',
            employeeName: '',
            status: 'Enabled',
            username: 'Admin'
        }

        const userRow = await adminPage.searchUserByUsername(existingEmployee.username);

        await expect(userRow).toBeVisible();
        await expect(userRow).toContainText(existingEmployee.username);
        await expect(userRow).toContainText(existingEmployee.status);
        await expect(userRow).toContainText(existingEmployee.role)
    })

    test('Should be able to delete an existing user', async({adminPage}) => {
        const currentState = await adminPage.getCurrentNavigationState();
        expect(currentState.currentMenu).toBe('Admin');

        const existingEmployee: ActiveEmployeeData = {
            role: 'ESS',
            employeeName: '',
            status: 'Disabled',
            username: ''
        };

        const userRow = await adminPage.searchUserByOption('Status', existingEmployee.status);
        await expect(userRow).toBeVisible();

        await adminPage.deleteUser(userRow);

        const page = adminPage.getPage();
        await expect(page.locator('.oxd-toast--success'))
        .toContainText('Successfully Deleted');
    })

    test('Should be able to edit an existing user', async({adminPage}) => {
         const currentState = await adminPage.getCurrentNavigationState();
        expect(currentState.currentMenu).toBe('Admin');

        const existingEmployee: ActiveEmployeeData = {
            role: 'Admin',
            employeeName: 'James Butler',
            status: 'Enabled',
            username: 'Admin'
        };

        const userRow = await adminPage.searchUserByUsername(existingEmployee.username);
        await expect(userRow).toBeVisible();

        await adminPage.editUser(userRow, existingEmployee);

        const page = adminPage.getPage();
        await expect(page.locator('.oxd-toast--success'))
        .toContainText('Successfully Updated');
    })
})