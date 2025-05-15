import { compare, hash } from "bcryptjs"
import type { PasswordHasher } from "./interfaces/password-hasher.interface"

const hashPassword = (password: string, salt: number | string = 10): Promise<string> => {
    return hash(password, salt)
}

const comparePasswords = (password: string, hash: string): Promise<boolean> => {
    return compare(password, hash)
}

export const bcryptService: PasswordHasher = {
    hash: hashPassword,
    compare: comparePasswords
}