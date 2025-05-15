export interface TokenGenerator {
    sign(payload: object, secret: string): string
    verify(token: string, secret: string): object | string
}