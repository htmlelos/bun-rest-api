import type { Credential, User } from "../../../../src/modules/users/User"
import { mockedHash } from "../../auth/mocks/bcrypt.mock"

let users: User[] = []

export const mockedFindByEmail = (email: string) => {
    return users.find(user => user.email === email)
}

export const mockedCreate = async (id: string,user: Credential) => {
    const encryptedUser = {
        ...user,
        password: await mockedHash(user.password, Bun.env.BCRYPT_SALT as string),
        id: '1'
    }
    
    users.push(encryptedUser)
    return encryptedUser
}

export const mockedUserRepository = {
    findByEmail: mockedFindByEmail,
    create: mockedCreate
}

export const mockedDropDatabase = () => {
    users = []
}

export const mockedValidCredentials = {
    email: 'test@example.com',
    password: 'Password123'
}