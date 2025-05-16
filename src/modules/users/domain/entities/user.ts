export type Credentials = {
    email: string,
    password: string
}

export type UserWithId = Credentials & {
    id: string
}

export type UserWithToken = UserWithId & {
    token: string
}

export type UserWithPassword = UserWithId & {
    password: string
}

export type User =UserWithId & {
    username: string
}
