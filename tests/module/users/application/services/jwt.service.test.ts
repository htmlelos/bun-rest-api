
import { describe, expect, test } from "bun:test";
import { jwtService } from "../../../../../src/modules/users/application/services/jwt.service";
    
describe('JwtService', () => {
    const secret = 'test-secret'
    const payload = { id: '123', email: 'test@example.com'};

    let token: string;

    test('should generate a valid JWT token', () => {
        token = jwtService.sign(payload, secret)

        expect(token).toBeDefined()
        expect(typeof token).toBe('string')
        expect(token.split('.').length).toBe(3)
    })

    test('should verify a valid JWT token', () => {
        const decoded = jwtService.verify(token, secret)

        expect(decoded).toBeDefined()
        expect(decoded).toHaveProperty('id')
        expect(decoded).toHaveProperty('email')
        expect(decoded).toHaveProperty('iat')
    })

    test('should fail when verify with a wrong secret', () => {
        const wrongSecret = 'wrong-secret'

        expect(() => jwtService.verify(token, wrongSecret)).toThrow()
    })

    test('should fail when verify a malformed token', () => {
        const malformedToken = 'malformed-token'

        expect(() => jwtService.verify(malformedToken, secret)).toThrow()
    })

    test('should include additional properties in the payload', () => {
        const customPayload = { ...payload, role: 'admin'}

        const customToken = jwtService.sign(customPayload, secret)

        const decoded = jwtService.verify(customToken, secret)

        expect(decoded).toHaveProperty('role', 'admin')
    })
})
