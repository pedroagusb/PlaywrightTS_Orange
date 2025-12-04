import { randomUUID } from 'crypto';
import { test, expect } from '../src/fixtures/allFixtures.fixture';
import { EmployeeData } from '../src/types/employee.types';

test.describe('Administration Operations', () => {
    test('Should create new user and verify in table', async ({ adminPage }) => {
        const currentState = await adminPage.getCurrentNavigationState();
        expect(currentState.currentMenu).toBe('Admin');

        const newEmployee: EmployeeData = {
            role: 'Admin',
            employeeName: 'James',
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

        const existingEmployee: EmployeeData = {
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

        const existingEmployee: EmployeeData = {
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

    test('Should be able to edit the Username from an existing user', async({adminPage}) => {
        const currentState = await adminPage.getCurrentNavigationState();
        expect(currentState.currentMenu).toBe('Admin');

        const editEmployee: EmployeeData = {
            role: 'Admin',
            employeeName: 'James Butler',
            status: 'Enabled',
            username: `AutoTest_${Date.now()}`
        };

        const userRow = await adminPage.searchUserByOption('Status',editEmployee.status);

        await expect(userRow).toBeVisible();

        await adminPage.editUser(userRow, {username: editEmployee.username});

        const page = adminPage.getPage();
        await expect(page.locator('.oxd-toast--success'))
            .toContainText('Successfully Updated');

        const searchUserRow = await adminPage.searchUserByUsername(editEmployee.username);
        await expect(searchUserRow).toBeVisible();
        await expect(searchUserRow).toContainText(editEmployee.username);
        await expect(searchUserRow).toContainText(editEmployee.status);    
    })
})