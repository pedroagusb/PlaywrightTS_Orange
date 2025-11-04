export type DashboardMenu = 'Dashboard' | 'Admin' | 'PIM';

export type AdminTabs = 'Users' | 'Job Titles' | 'Pay Grades' | 'General Information' 

export interface NavigationState {
    currentMenu: DashboardMenu;
    currentTab?: AdminTabs
}