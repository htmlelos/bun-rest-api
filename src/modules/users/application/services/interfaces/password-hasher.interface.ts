export interface PasswordHasher {
    hash(password: string, salt?: number | string): Promise<string>
    compare(password: string, hash: string): Promise<boolean>
}