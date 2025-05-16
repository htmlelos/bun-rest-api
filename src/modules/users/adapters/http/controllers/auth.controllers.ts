import type { Credential } from "../../../User";
import { register } from "../../../application/use-cases/register";
import { login } from "../../../application/use-cases/login";
import type { Request, Response, NextFunction } from "express";

export const authController = {
    register: async (request: Request, response: Response, next: NextFunction) => {
        try {
            const { email, password} = request.body as Credential
            const result = await register({ email, password })
            return response.status(201).json(result)
        } catch (error: any) {
            return response.status(400).json({
                message: error.message,
            })
        }
    },
    login: async (request: Request, response: Response, next: NextFunction) => {
        try {
            const { email, password} = request.body as Credential
            const result = await login({ email, password })
            return response.status(200).json(result)
        } catch (error: any) {
            return response.status(400).json({
                message: error.message,
            })
        }
    }
}