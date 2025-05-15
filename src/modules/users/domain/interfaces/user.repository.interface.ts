import type { Credential } from "../../User"
import type { User, UserWithId } from "../user"

export interface UserRepository {
    findByEmail(email: string): User | undefined
    create(id: string, user: Credential): UserWithId
    dropDatabase(): void
}