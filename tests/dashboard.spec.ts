import { test, expect } from '../src/fixtures/allFixtures.fixture';

test.describe('Dashboard Navigation', () => {
    test('Should navigate to Admin menu', async({ adminPage }) => {
        const currentState = await adminPage.getCurrentNavigationState();
        expect(currentState.currentMenu).toBe('Admin');
    });

    test('Should navigate to PIM menu', async({pimPage}) => {
        const currentState = await pimPage.getCurrentNavigationState();
        expect(currentState.currentMenu).toBe('PIM');
    })
})