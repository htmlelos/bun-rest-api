import { randomUUIDv7 } from "bun"
import { mockedJwtSign } from "../../../../tests/module/auth/mocks/jwt.mock"
import { mockedUserRepository } from "../../../../tests/module/users/mocks/userRepository.mocks"
import type { Credential } from "../User"

export const register = (credentials: Credential) => {

    if (!credentials.email) {
        throw new Error('Email is required')
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(credentials.email)) {
        throw new Error('Email is invalid')
    }

    if (!credentials.password) {
        throw new Error('Password is required')
    }

    if (credentials.password.length < 6) {
        throw new Error('Password must be at least 6 characters long')
    }

    const user = mockedUserRepository.findByEmail(credentials.email)

    if (user?.email) {
        throw new Error('User already exists')
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).+$/

    if (!passwordRegex.test(credentials.password)) {
        throw new Error('Password must contain at least one uppercase and a number')
    }

    const id = randomUUIDv7()

    const encryptedPassword = mockedJwtSign({id}, Bun.env.JWT_SECRET as string)

    const createdUser = mockedUserRepository.create({
        ...credentials,
        password: encryptedPassword
    })

    return createdUser
}