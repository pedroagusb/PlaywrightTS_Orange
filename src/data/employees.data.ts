import { EmployeeData } from '../types/employee.types';

export interface EmployeeTestData {
    role: 'Admin' | 'ESS',
    status: 'Enabled' | 'Disabled',
    employeeName: string,
}

export const employeeTestData: EmployeeTestData[] = [
    {
        role: 'Admin',
        employeeName: 'James Butler',
        status: 'Enabled'
    },
    {
        role: 'ESS',
        employeeName: 'James Butler',
        status: 'Enabled'
    },
    {
        role: 'ESS',
        employeeName: 'Auto',
        status: 'Enabled'
    },
    {
        role: 'ESS',
        employeeName: 'James Butler',
        status: 'Disabled'
    },
    {
        role: 'Admin',
        employeeName: 'Auto',
        status: 'Enabled'
    },

]

export function generateEmployee(baseData: EmployeeTestData): EmployeeData {
    return {
        ... baseData,
        username: `James Butler_${Date.now()}`,
        password: 'automation.123'
    }
}