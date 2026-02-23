import { EmployeeData } from '../types/employee.types'

export const generateUsername = (employeeName: string): string => {
    return `${employeeName}_${Date.now()}`
}

export const generateEmployeeData = (overrides: Partial<EmployeeData> = {}): EmployeeData => {
    const defaultName = 'James Butler';
    const resolvedName = overrides.employeeName ?? defaultName

    return {
        role: 'Admin',
        employeeName: resolvedName,
        status: 'Enabled',
        password: 'automation.123',
        ... overrides,
        username: generateUsername(resolvedName)
    }
} 