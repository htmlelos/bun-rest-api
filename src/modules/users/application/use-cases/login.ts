import { userRepository } from "../../domain/repositories/user.repository";
import type { Credential, User } from "../../User";
import { bcryptService } from "../services/bcrypt.service";
import { jwtService } from "../services/jwt.service";

export const login = async (credentials: Credential) => {
    const user = checkUserExists(credentials);

    await verifyCredentials(credentials, user);

    const token = jwtService.sign({ id: user.id }, Bun.env.JWT_SECRET as string)

    return {
        user,
        token
    }
}

const verifyCredentials = async (credentials: Credential, user: User) => {
    const isPasswordValid = await bcryptService.compare(credentials.password, user.password);

    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }
}

function checkUserExists(credentials: Credential) {
    const user = userRepository.findByEmail(credentials.email);

    if (!user) {
        throw new Error('User not found');
    }
    return user;
}
