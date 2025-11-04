import { test, expect } from '../src/fixtures/allFixtures.fixture';
import { EmployeeData } from '../src/types/employee.types';

test.describe('Administration Operations', () => {
    test('Should add a new user in system', async ({ adminPage }) => {
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
    })
})