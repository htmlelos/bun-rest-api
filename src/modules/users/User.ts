export type Credential = {
    email: string,
    password: string
}

export type UserWithId = Credential & {
    id?: string
}

export type UserWithToken = UserWithId & {
    token: string
}

export type User = UserWithId & {
    username?: string
}