import { describe, expect, test } from 'bun:test'
import type { Credential, User, UserWithId, UserWithToken } from '../../../../src/modules/users/User'
import type { UserWithPassword } from '../../../../src/modules/users/domain/entities/user'

describe('User', () => {
    describe('Credentials type', () => {
        test('should have email and password properties', () => {
            const credentials: Credential = {
                email: 'test@example.com',
                password: 'password'
            }

            expect(credentials).toHaveProperty('email')
            expect(credentials).toHaveProperty('password')
            expect(credentials.email).toBe('test@example.com')
            expect(credentials.password).toBe('password')
        })

        test('should request email and password', () => {
            // @ts-expect-error - Testing missing properties
            const credentials: Credential = {};

            expect(credentials).toBeDefined();
        })
    })
})

describe('UserWithId Type', () => {
    test('should extended Credentials and add id', () => {
        const user: UserWithId = {
            id: '1',
            email: 'test@example.com',
            password: 'password123'
        }

        expect(user).toHaveProperty('id', '1')
        expect(user).toHaveProperty('email', 'test@example.com')
        expect(user).toHaveProperty('password', 'password123')
    })
})

describe('UserWithToken Type', () => {
    test('should extended UserWithId and add token', () => {
        const userWithToken: UserWithToken = {
            id: '1',
            email: 'test@example.com',
            password: 'password123',
            token: 'token'
        }

        expect(userWithToken).toHaveProperty('id', '1')
        expect(userWithToken).toHaveProperty('email', 'test@example.com')
        expect(userWithToken).toHaveProperty('password', 'password123')
        expect(userWithToken).toHaveProperty('token', 'token')
    })
})

describe('UserWithPassword Type', () => {
    test('should extended UserWithId and add password', () => {
        const userWithPassword: UserWithPassword = {
            id: '1',
            email: 'test@example.com',
            password: 'password123'
        }

        expect(userWithPassword).toHaveProperty('id', '1')
        expect(userWithPassword).toHaveProperty('email', 'test@example.com')
        expect(userWithPassword).toHaveProperty('password', 'password123')
    })
})

describe('User Type', () => {
    test('should extended UserWithPassword and add username', () => {
        const user: User = {
            id: '1',
            email: 'test@example.com',
            password: 'password123',
            username: 'testUser'
        }

        expect(user).toHaveProperty('id', '1')
        expect(user).toHaveProperty('email', 'test@example.com')
        expect(user).toHaveProperty('password', 'password123')
        expect(user).toHaveProperty('username', 'testUser')
    })

    test('should validate a object as Credential', () => {
        const validCredential: Credential = {
            email: 'test@example.com',
            password: 'password123'
        }

        // @ts-expect-error - Testing missing properties
        const invalidCredential: Credential = {
            email: 'test@example.com',
        }

        expect(validCredential).toHaveProperty('email', 'test@example.com')
        expect(validCredential).toHaveProperty('password', 'password123')

        expect(invalidCredential).toHaveProperty('email', 'test@example.com')
        expect(invalidCredential.password).toBeUndefined()
    })
})