export const mockedHash = (password: string, salt: number | string) : Promise<string> => {
    return Promise.resolve('hashedPassword');
}

export const mockedCompare = async (password: string, hashedPassword: string) => {
    return Promise.resolve(password === 'Password123');
}