export const mockedHash = (password: string, salt: number | string) => {
    return 'hashedPassword';
}

export const mockedCompare = (password: string, hashedPassword: string) => {
    return password === 'Password123';
}