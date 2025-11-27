export interface NewEmployeeData {
    role: string,
    employeeName: string,
    status: string,
    username: string,
    password: string
}

export interface ActiveEmployeeData {
    username: string,
    role: string,
    status: string,
    employeeName: string,
    password?: string
}