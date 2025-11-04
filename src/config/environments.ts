export interface Environment {
    baseUrl: string;
    defaultTimeout: number
}

export const environments = {
    Demo: {
        baseUrl: "https://opensource-demo.orangehrmlive.com",
        defaltTimeout: 30000,
    }
}