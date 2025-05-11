import { mockedCompare } from "../../../../tests/module/auth/mocks/bcrypt.mock";
import { mockedJwtSign } from "../../../../tests/module/auth/mocks/jwt.mock";
import { mockedUserRepository } from "../../../../tests/module/users/mocks/userRepository.mocks";
import type { Credential } from "../User";

export const login = (credentials: Credential) => {
    const user = mockedUserRepository.findByEmail(credentials.email)

    if (!user) {
        throw new Error('User not found')
    }

    const isPasswordValid = mockedCompare(credentials.password, user.password)

    if (!isPasswordValid) {
        throw new Error('Invalid password')
    }

    const token = mockedJwtSign({ id: user.id }, Bun.env.JWT_SECRET as string)

    return {
        user,
        token
    }
}
