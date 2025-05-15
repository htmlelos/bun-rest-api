import { beforeEach, describe, expect, test } from 'bun:test'
import { register } from '../../../../src/modules/users/use-cases/register'
import type { Credential } from '../../../../src/modules/users/User'
import { mockedDropDatabase, mockedValidCredentials } from '../mocks/userRepository.mocks'

describe('Register', () => {
  beforeEach(() => {
    mockedDropDatabase()
  })

  test('should register a new user when the data is valid', async () => {
        const user = await register(mockedValidCredentials)

        expect(user).toHaveProperty('id')
        expect(user).toHaveProperty('email')
        expect(user).toHaveProperty('password')
    })

    test('shouldn\'t register a new user when the email is missing', () => {
        expect(register({
            password: 'password'
        } as Credential)).rejects.toThrow('Email is required')
    })

    test('shouldn\'t register a new user when the password is missing', () => {
        expect(register({
            email: 'test@example.com'
        } as Credential)).rejects.toThrow('Password is required')
    })

    test('shouldn\'t register a new user when the email is invalid', () => {
        expect(register({
            email: 'test.example.com',
            password: 'password'
        } as Credential)).rejects.toThrow('Email is invalid')
    })

    test('shouldn\'t register a new user when the user already exists', async () => {
        const user = await register(mockedValidCredentials)

        expect(register(mockedValidCredentials)).rejects.toThrow('User already exists')
    })

    test('shouldn\'t register a user when the password is too short', () => {
        expect(register({
            email: 'test@example.com',
            password: 'pass'
        } as Credential)).rejects.toThrow('Password must be at least 6 characters long')
    })

    test('shouldn\'t register a user when the password don\'t contains at least one uppercase and a number', () => {
        expect(register({
            email: 'test@example.com',
            password: 'password'
        } as Credential)).rejects.toThrow('Password must contain at least one uppercase and a number')
    })
})