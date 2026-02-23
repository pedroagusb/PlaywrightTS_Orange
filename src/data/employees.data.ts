import { EmployeeData } from '../types/employee.types';
import { generateUsername } from '../utils/dataGenerators';

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
        employeeName: 'James Butler',
        status: 'Disabled'
    },
    {
        role: 'Admin',
        employeeName: 'James Butler',
        status: 'Disabled'
    },

]

export function generateEmployee(baseData: EmployeeTestData): EmployeeData {
    return {
        ... baseData,
        username: generateUsername(baseData.employeeName),
        password: 'automation.123'
    }
}