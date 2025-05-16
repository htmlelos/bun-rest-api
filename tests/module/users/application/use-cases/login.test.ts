import { beforeEach, describe, expect, test } from "bun:test";
import { userRepository } from "../../../../../src/modules/users/domain/repositories/user.repository";
import { login } from "../../../../../src/modules/users/application/use-cases/login";
import type { Credential } from "../../../../../src/modules/users/User";
import { mockedValidCredentials } from "../../mocks/userRepository.mocks";
import { register } from "../../../../../src/modules/users/application/use-cases/register";

describe('Login', () => {

    beforeEach(() => {
        userRepository.dropDatabase()
    })

    
    test('should have success to when login with valid credentials and get a token', async () => {
        const mockedValidCredentials = {
            email: 'test@example.com',
            password: 'Password123'
        }
        
        await register(mockedValidCredentials)

        const response = await login(mockedValidCredentials)

        expect(response).toHaveProperty('user')        
        expect(response).toHaveProperty('token')
        expect(response.user).toHaveProperty('id')
        expect(response.user).toHaveProperty('email')
    })

    test('shouldn\'t login with an unregistered email', async () => {
        await register(mockedValidCredentials)

        await expect(login({
            email: 'unregistered@example.com',
            password: 'password123'
        } as Credential)).rejects.toThrow('User not found')
    })

    test('shouldn\'t login with an invalid password', async () => {
        await register(mockedValidCredentials)

        await expect(login({
            email: 'test@example.com',
            password: 'wrongPassword'
        } as Credential)).rejects.toThrow('Invalid password')
    })
})