import { UserEntity } from '../user/entities/user.entity';
import {
    AccessRequest,
    AccessResponse,
    AccessStatus,
} from './entities/access.dto';
import * as argon2 from 'argon2';
import { SignUpRequest } from './entities/access.dto';

export interface IAuthService {
    login(loginRequest: AccessRequest): Promise<AccessResponse | AccessStatus>;

    signUp(
        signUpRequest: SignUpRequest
    ): Promise<AccessResponse | AccessStatus>;

    encryptPassword(rawPassword: string): Promise<string>;

    checkPassword(password: string, hash: string): Promise<boolean>;

    validatePayload(payload: any): Promise<UserEntity>;
}

export abstract class AuthService implements IAuthService {
    async checkPassword(password: string, hash: string): Promise<boolean> {
        const isValidPwd = await argon2.verify(hash, password);
        return isValidPwd;
    }

    async encryptPassword(rawPassword: string): Promise<string> {
        const encrypted = await argon2.hash(rawPassword);
        return encrypted;
    }

    abstract login(
        loginRequest: AccessRequest
    ): Promise<AccessResponse | AccessStatus>;

    abstract signUp(
        signUpRequest: SignUpRequest
    ): Promise<AccessResponse | AccessStatus>;

    abstract validatePayload(payload: any): Promise<UserEntity>;
}
