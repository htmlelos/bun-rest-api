import { sign, verify } from "jsonwebtoken"
import type { TokenGenerator } from "./interfaces/token-generator.interface"

const signToken = (payload: any, secret: string) => {
    return sign(payload, secret)
}

const verifyToken = (token: string, secret: string) => {
    return verify(token, secret)
}

export const jwtService: TokenGenerator = {
    sign: signToken,
    verify: verifyToken
}