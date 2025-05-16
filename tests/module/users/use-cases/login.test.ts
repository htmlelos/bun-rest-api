import { beforeEach, describe, expect, test } from "bun:test";
import type { Credential } from "../../../../src/modules/users/User";
import {
  mockedValidCredentials,
} from "../mocks/userRepository.mocks";
import { register } from "../../../../src/modules/users/application/use-cases/register";
import { login } from "../../../../src/modules/users/application/use-cases/login";
import { userRepository } from '../../../../src/modules/users/domain/repositories/user.repository';

describe("Login", () => {
  beforeEach(async () => {
    await userRepository.dropDatabase()
  });

  test("should have success to when login with valid credentials and get a token", async () => {
    await register(mockedValidCredentials);

    const response = await login(mockedValidCredentials);

    expect(response).toHaveProperty("user");
    expect(response).toHaveProperty("token");
    expect(response.user).toHaveProperty("id");
    expect(response.user).toHaveProperty("email");
  });

  test("shouldn't login with an invalid password", async () => {
    await register(mockedValidCredentials);

    await expect(
      login({
        email: "test@example.com",
        password: "wrongPassword",
      } as Credential)
    ).rejects.toThrow("Invalid password");
  });

  test("shouldn't login with an unregistered email", async () => {
    await expect(
      login({
        email: "test@example.com",
        password: "password",
      } as Credential)
    ).rejects.toThrow("User not found");
  });
});
