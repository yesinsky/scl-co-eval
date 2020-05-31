import { UserDto } from '../../user/entities/dto/user.dto';

export type SignUpRequest = AccessRequest & {name: string};

export type AccessRequest = {
    email: string;
    password: string;
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