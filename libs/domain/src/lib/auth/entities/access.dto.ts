import { UserDto } from '../../user/entities/dto/user.dto';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class AccessRequest {
    @IsEmail()
    email: string;
    @IsNotEmpty()
    password: string;
}

export class SignUpRequest extends AccessRequest{
    name?: string;
}

export type AccessResponse = {
    user?: UserDto;
    token?: string;
    status: AccessStatus;
}

export enum AccessStatus {
    UserNotFoundOrWrongPassword = 'UserNotFoundOrWrongPassword',
    Authenticated = 'Authenticated',
    AlreadyExistOnSignup = 'AlreadyExistOnSignup',
    ServerError = 'ServerError',
    Unsupported = 'Unsupported',
    InvalidSourceData = 'InvalidSourceData'
}