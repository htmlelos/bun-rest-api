import { beforeEach, describe, expect, spyOn, test } from 'bun:test';
import type { NextFunction, Request, Response } from 'express';
import { authController } from '../../../../../src/modules/users/adapters/http/controllers/auth.controllers';
import { userRepository } from '../../../../../src/modules/users/domain/repositories/user.repository';

describe('AuthController', () => {
    let mockRequest: Request;
    let mockResponse: Response;
    let mockNext: NextFunction;
    let statusSpy: any;
    let jsonSpy: any;

    beforeEach(async () => {
        await userRepository.dropDatabase()

        mockRequest = {
            body: {}
        } as Request

        function status (code: number) { return mockResponse }
        function json (data: any) { return mockResponse }

        mockResponse = {
            status,
            json
        } as unknown as Response

        jsonSpy = spyOn(mockResponse, 'json').mockImplementation(function (code: number) {return mockResponse})
        statusSpy = spyOn(mockResponse, 'status').mockImplementation(function (status: any) {return mockResponse})

        mockNext = () => null
    })

    describe('Register', () => {
        test('should register a new user successfully', async () => {
            mockRequest.body = { email: 'test@example.com', password: 'Password123' }

            await authController.register(
                mockRequest, 
                mockResponse, 
                mockNext
            )

            expect(statusSpy).toHaveBeenCalledWith(201);
            expect(jsonSpy).toHaveBeenCalledWith(expect.objectContaining({
                user: expect.objectContaining({
                    email: 'test@example.com'
                }),
                token: expect.any(String)
            }));
        })    
    })
})