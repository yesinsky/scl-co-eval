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
    'UserNotFoundOrWrongPassword' = 0,
    'Authenticated' = 1,
    'AlreadyExistOnSignup' = 2,
    'ServerError' = 3,
    'Unsupported' = 4,
    'InvalidSourceData' = 5
}