import { mockedCompare } from "../../../../tests/module/auth/mocks/bcrypt.mock";
import { mockedJwtSign } from "../../../../tests/module/auth/mocks/jwt.mock";
import { mockedUserRepository } from "../../../../tests/module/users/mocks/userRepository.mocks";
import type { Credential, User } from "../User";

export const login = async (credentials: Credential) => {
    const user = checkUserExists(credentials);

    await verifyCredentials(credentials, user);

    const token = mockedJwtSign({ id: user.id }, Bun.env.JWT_SECRET as string)

    return {
        user,
        token
    }
}

const verifyCredentials = async (credentials: Credential, user: User) => {
    const isPasswordValid = await mockedCompare(credentials.password, user.password);

    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }
}

function checkUserExists(credentials: Credential) {
    const user = mockedUserRepository.findByEmail(credentials.email);

    if (!user) {
        throw new Error('User not found');
    }
    return user;
}
