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

    test('Should perform complete CRUD operations on employee', async ({ adminPage }) => {
        const timestamp = Date.now();
        const employee: EmployeeData = {
            role: 'Admin',
            employeeName: 'James Butler',
            status: 'Enabled',
            username: `autotest_${timestamp}`,
            password: 'Test123!@#'
        };

        // ============ CREATE ============
        await test.step('Create new employee', async () => {
            await adminPage.addEmployee(employee);

            const toast = adminPage.getPage().locator('.oxd-toast--success');
            await expect(toast).toBeVisible();
        })

        // ============ READ ============
        await test.step('Read employee status', async () => {
            const userRow = await adminPage.searchUserByUsername(employee.username);

            await expect(userRow).toBeVisible();
            await expect(userRow).toContainText(employee.username);
            await expect(userRow).toContainText(employee.status);
            await expect(userRow).toContainText(employee.role)
        })

        // ============ UPDATE ============
        await test.step('Edit employee status', async() => {
            const userRow = await adminPage.searchUserByUsername(employee.username);
            await adminPage.editUser(userRow, { status: 'Disabled' });
            
            const toast = adminPage.getPage().locator('.oxd-toast--success');
            await expect(toast).toBeVisible();
            
            // Verify if edit worked
            const updatedRow = await adminPage.searchUserByOption('Status', 'Disabled');
            await expect(updatedRow).toContainText(employee.username);
        })

        // ============ DELETE ============
        await test.step('Delete employee', async () => {
            const userRow = await adminPage.searchUserByUsername(employee.username);
            await adminPage.deleteUser(userRow);
            
            const toast = adminPage.getPage().locator('.oxd-toast--success');
            await expect(toast).toBeVisible();
            
            // Verify deletion
            await adminPage.searchUserByUsername(employee.username);
            const noResults = adminPage.getPage()
            .locator('span')
            .filter({ hasText: 'No Records Found' });
        })
    })
})