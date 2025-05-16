import { beforeEach, describe, expect, test } from "bun:test";
import { register } from '../../../../src/modules/users/application/use-cases/register';
import { userRepository } from '../../../../src/modules/users/domain/repositories/user.repository';
import { mockedValidCredentials } from '../mocks/userRepository.mocks';

describe("Register", () => {
  beforeEach(async () => {
    await userRepository.dropDatabase();
  });

  test("should register a user with valid credentials", async () => {
    const response = await register(mockedValidCredentials);

    expect(response).toHaveProperty("user");
    expect(response).toHaveProperty("token");
    expect(response.user).toHaveProperty("id");
    expect(response.user).toHaveProperty("email");
    expect(response.user).toHaveProperty("password");
  });

  test("should not register duplicate email", async () => {
    await register(mockedValidCredentials);

    await expect(register(mockedValidCredentials)).rejects.toThrow(
      "User already exists"
    );
  });
});