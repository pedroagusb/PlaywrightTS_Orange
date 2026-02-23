import { describe } from "node:test";
import { generateUsername, generateEmployeeData } from "../utils/dataGenerators";
import { EmployeeData } from '../types/employee.types'

describe('generateUsername', () => {
    test('should generate username with fixed timestamp', () => {
        const result = generateUsername('James Butler')
        expect(result).toBe('James Butler_1234567890')
    })

    test('Should contain the employee name', () => {
        const result = generateUsername('James Butler')
        expect(result).toContain('James Butler')
    })

    test('should contain a numeric timestamp', () => {
        const result = generateUsername('James Butler')
        const parts = result.split('_')
        const timestamp = parts[parts.length - 1]
        expect(Number(timestamp)).not.toBeNaN()
    })

    test('should follow the format name_timestamp', () => {
        const result = generateUsername('James Butler')
        expect(result).toMatch(/^.+_\d+$/)
    })

    test('should generate unique usernames on consecutive calls', () => {
        const first = generateUsername('James Butler')
        const second = generateUsername('John Doe')

        console.log(`First: ${first},
            Second: ${second}`);
        expect(first).not.toBe(second)
    })

    test('should work with any employee name', () => {
        const result = generateUsername('John Doe')
        expect(result).toContain('John Doe')
    })
})

describe('generateUsername with mocked Date', () => {

    beforeEach(() => {
        jest.spyOn(Date, 'now').mockReturnValue(1234567890)
    })

    afterEach(() => {
        jest.restoreAllMocks()
    })

    test('should generate username with fixed timestamp', () => {
        const result = generateUsername('James Butler')
        expect(result).toBe('James Butler_1234567890')
    })
    
})

describe('generateEmployeeData', () => {
    test('should return an object with all required EmployeeData properties', () => {
        const result = generateEmployeeData()
        expect(result).toHaveProperty('role')
        expect(result).toHaveProperty('employeeName')
        expect(result).toHaveProperty('status')
        expect(result).toHaveProperty('password')
        expect(result).toHaveProperty('username')
    })
    
    test('should return correct default values', () => {
        const result = generateEmployeeData()
        expect(result.role).toBe('Admin')
        expect(result.employeeName).toBe('James Butler')
        expect(result.status).toBe('Enabled')
        expect(result.password).toBe('automation.123')
    })

    test('should generate username using default employee name', () => {
        const result = generateEmployeeData()
        expect(result.username).toContain('James Butler')
    })

    test('should apply overrides correctly', () => {
        const result = generateEmployeeData({role: 'ESS', status: 'Disabled'})
        expect(result.role).toBe('ESS')
        expect(result.status).toBe('Disabled')
    })

    test('should generate username using overridden employee name', () => {
        const result = generateEmployeeData({ employeeName: 'John Doe' })
        expect(result.username).toContain('John Doe')
        expect(result.employeeName).toBe('John Doe')
    })
})