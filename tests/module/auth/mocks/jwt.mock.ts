export const mockedJwtSign = (
    payload: Record<string, unknown>,
    secret: string) => {
    return 'token'
}

export const mockedJwtVerify = (
    payload: Record<string, unknown>,
    secret: string) => {
    return 'token'
}
