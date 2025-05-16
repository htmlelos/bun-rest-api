import { describe, expect, test } from "bun:test";
import { bcryptService } from "../../../../../src/modules/users/application/services/bcrypt.service";

describe('BcryptService', () => {
    const plainPassword = 'Password123';
    let hashedPassword: string;

    test('should hash a password successfully', async () => {
        hashedPassword = await bcryptService.hash(plainPassword, 10);

        expect(hashedPassword).toBeDefined()
        expect(hashedPassword).not.toBe(plainPassword)
        expect(hashedPassword.length).toBeGreaterThan(0)
    })

    test('should compare a password against its hash successfully', async () => {
        const result = await bcryptService.compare(plainPassword, hashedPassword)

        expect(result).toBe(true)
    })

    test('should fail when compare against a wrong password', async () => {
        const wrongPassword = 'wrongPassword123!'
        const result = await bcryptService.compare(wrongPassword, hashedPassword)

        expect(result).toBe(false)
    })

    test('should generate different hash for the same password', async () => {
        const hashedPassword1 = await bcryptService.hash(plainPassword, 10)
        const hashedPassword2 = await bcryptService.hash(plainPassword, 10)

        expect(hashedPassword1).not.toBe(hashedPassword2)
        expect(hashedPassword1).not.toBe(plainPassword)
    })
})