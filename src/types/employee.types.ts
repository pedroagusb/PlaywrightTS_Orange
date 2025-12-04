export interface EmployeeData {
    role: 'Admin' | 'ESS',
    employeeName: string,
    status: 'Enabled' | 'Disabled',
    username: string,
    password?: string
}