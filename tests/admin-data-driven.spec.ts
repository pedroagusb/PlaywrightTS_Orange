import { test, expect } from '../src/fixtures/allFixtures.fixture';
import { employeeTestData, generateEmployee } from '../src/data/employees.data';

test.describe('Data-Driven Employee Operations', () => {
    employeeTestData.forEach((testData, index) => {
        test(`Should create ${testData.role} user ${testData.employeeName} (${testData.status}) - Case ${index + 1}`, async ({adminPage}) => {
            const employee = generateEmployee(testData);
            await adminPage.addEmployee(employee);

            const page = adminPage.getPage();
            await expect(page.locator('.oxd-toast--success'))
                .toContainText('Successfully Saved');

            const userRow = await adminPage.searchUserByUsername(employee.username);

            await expect(userRow).toBeVisible();
            await expect(userRow).toContainText(employee.username);
            await expect(userRow).toContainText(employee.status);
            await expect(userRow).toContainText(employee.role)

        })
    })
})
