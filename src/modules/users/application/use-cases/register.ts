import { randomUUIDv7 } from "bun";
import type { Credential } from "../../User";
import { userRepository } from "../../domain/repositories/user.repository";
import { bcryptService } from "../services/bcrypt.service";
import { jwtService } from "../services/jwt.service";


export const register = async (credentials: Credential) => {
  const { email, password } = credentials;

  validateEmail(email);
  checkUserExists(email);
  validatePassword(password);

  const id = randomUUIDv7();
  const hashedPassword = await bcryptService.hash(password, 10);

  if (!hashedPassword) {
    throw new Error("Error hashing password");
  }

  const user = userRepository.create(id, {
    ...credentials,
    password: hashedPassword,
  });

  const token = jwtService.sign({ id: user.id }, Bun.env.JWT_SECRET as string);

  return {
    user,
    token,
  };
};
const validateEmail = (email: string) => {
  if (!email) {
    throw new Error("Email is required");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error("Email is invalid");
  }
};

function validatePassword(password: string) {
  if (!password) {
    throw new Error("Password is required");
  }

  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters long");
  }

  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).+$/;
  if (!passwordRegex.test(password)) {
    throw new Error(
      "Password must contain at least one uppercase and a number"
    );
  }
}

function checkUserExists(email: string) {
  const user = userRepository.findByEmail(email);

  if (user?.email) {
    throw new Error("User already exists");
  }
}
