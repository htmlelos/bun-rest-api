export const mockedHash = (password: string, salt: number | string) : Promise<string> => {
    return Promise.resolve('hashedPassword');
}

export const mockedCompare = async (password: string, hashedPassword: string) => {
    if (hashedPassword === 'hashedPassword' && password === 'Password123') {
        return true;
    }
    return false;
}