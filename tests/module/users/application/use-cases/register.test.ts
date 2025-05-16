import { beforeEach, describe, expect, test } from 'bun:test'
import type { Credential } from '../../../../../src/modules/users/User'
import { register } from '../../../../../src/modules/users/application/use-cases/register'
import { userRepository } from '../../../../../src/modules/users/infrastructure/persistence/repositories/user.repository'

describe('Register', () => {
  beforeEach(() => {
    userRepository.dropDatabase()
  })

  test('should register a new user when the data is valid', async () => {
    const mockedValidCredentials = {
        email: 'test@example.com',
        password: 'Password123'
    }
    
    const response = await register(mockedValidCredentials)

    expect(response).toHaveProperty('user')
    expect(response).toHaveProperty('token')
    expect(response.user).toHaveProperty('id')
    expect(response.user).toHaveProperty('email')
    expect(response.user).toHaveProperty('password')
  })

    test('shouldn\'t register a new user when the email is missing', async () => {
        await expect(register({
            password: 'password'
        } as Credential)).rejects.toThrow('Email is required')
    })

    test('shouldn\'t register a new user when the password is missing', async () => {
        await expect(register({
            email: 'test@example.com'
        } as Credential)).rejects.toThrow('Password is required')
    })

    test('shouldn\'t register a new user when the email is invalid', async () => {
        await expect(register({
            email: 'test.example.com',
            password: 'password'
        } as Credential)).rejects.toThrow('Email is invalid')
    })

    test('shouldn\'t register a new user when the user already exists', async () => {
        const mockedValidCredentials = {
            email: 'test@example.com',
            password: 'Password123'
        }
        
        await register(mockedValidCredentials)

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