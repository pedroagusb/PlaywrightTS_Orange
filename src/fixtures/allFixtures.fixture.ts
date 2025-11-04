import { test as baseTest } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { credentials } from '../config/credentials';
import { AdminPage } from '../pages/AdminPage';

type AllFixtures = {
    authenticatedDashboard: DashboardPage;
    adminPage: AdminPage;
    pimPage: DashboardPage 
}

export const test = baseTest.extend<AllFixtures>({
    authenticatedDashboard: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(credentials.orangeAdmin);
        await loginPage.isLoginSuccessful();

        await use(new DashboardPage(page));
    },
    adminPage: async ({ authenticatedDashboard }, use) => {
        await authenticatedDashboard.navigateToMainMenu('Admin');
        
        const adminPage = new AdminPage(authenticatedDashboard.getPage());
        await use(adminPage);
    },
    pimPage: async({ authenticatedDashboard}, use) => {
        await authenticatedDashboard.navigateToMainMenu('PIM');

        
        await use(authenticatedDashboard);
    }
});

export { expect } from '@playwright/test';