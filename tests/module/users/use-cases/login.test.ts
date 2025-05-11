import { beforeEach, describe, expect, test } from "bun:test";
import { login } from "../../../../src/modules/users/use-cases/login";
import type { Credential } from "../../../../src/modules/users/User";
import { mockedDropDatabase, mockedValidCredentials } from "../mocks/userRepository.mocks";
import { register } from "../../../../src/modules/users/use-cases/register";

describe('Login', () => {

    beforeEach(() => {
        mockedDropDatabase()
    })

    test('should register a new user when the data is valid', () => {
        const user = register(mockedValidCredentials)

        expect(user).toHaveProperty('id')
        expect(user).toHaveProperty('email')
        expect(user).toHaveProperty('password')
    })

    test('shouldn\'t register a new user when the email is missing', () => {
        expect(() => register({
            password: 'password'
        } as Credential)).toThrow('Email is required')
    })

    test('shouldn\'t register a new user when the password is missing', () => {
        expect(() => register({
            email: 'test@example.com'
        } as Credential)).toThrow('Password is required')
    })

    test('shouldn\'t register a new user when the email is invalid', () => {
        expect(() => register({
            email: 'test.example.com',
            password: 'password'
        } as Credential)).toThrow('Email is invalid')
    })

    test('shouldn\'t register a new user when the user already exists', () => {
        register(mockedValidCredentials)

        expect(() => register(mockedValidCredentials)).toThrow('User already exists')
    })

    test('shouldn\'t register a user when the password is too short', () => {
        expect(() => register({
            email: 'test@example.com',
            password: 'pass'
        } as Credential)).toThrow('Password must be at least 6 characters long')
    })

    test('shouldn\'t register a user when the password don\'t contains at least one uppercase and a number', () => {
        expect(() => register({
            email: 'test@example.com',
            password: 'password'
        } as Credential)).toThrow('Password must contain at least one uppercase and a number')
    })
    
    test('should have success to when login with valid credentials and get a token', async () => {
        register(mockedValidCredentials)

        const response = await login(mockedValidCredentials)

        expect(response).toHaveProperty('user')        
        expect(response).toHaveProperty('token')
        expect(response.user).toHaveProperty('id')
        expect(response.user).toHaveProperty('email')
    })

    test('shouldn\'t login with an unregistered email', () => {
        expect(() => login({
            email: 'test@example.com',
            password: 'password'
        } as Credential)).toThrow('User not found')
    })

    test('shouldn\'t login with an invalid password', () => {
        register(mockedValidCredentials)

        expect(() => login({
            email: 'test@example.com',
            password: 'wrongpassword'
        } as Credential)).toThrow('Invalid password')
    })
})