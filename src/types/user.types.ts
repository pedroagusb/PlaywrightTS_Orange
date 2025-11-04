export type UserRole =  'Manager' | 'Merchant' | 'Admin' 

export interface DashboardUser {
    name: string;
    password: string;
    role: UserRole;
    email: string
}

export interface Credentials {
    username: string;
    password: string;
}