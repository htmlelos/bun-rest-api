import { randomUUIDv7 } from "bun";
import type { Credential, User, UserWithId } from "../../User";

let users: User[] = []

export const userRepository = {
    findByEmail: (email: string): User | undefined => {
        return users.find(user => user.email === email)
    },
    create: (id: string, user: Credential) => {
        const userWithId: UserWithId = {
            ...user,
            id
        }
        users.push(userWithId)
        return userWithId
    },
    dropDatabase: () => {
        users = []
    }
}