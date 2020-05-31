import { UserDto } from './user.dto';

export interface CreateUserRequest {
    name:string;
    email: string;
    rawPassword: string;
}

export interface CreateUserResponse {
    status: UserCreationStatus;
    user?: UserDto;
}

export enum UserCreationStatus {
    Created = 'Created',
    AlreadyExist = 'AlreadyExist',
    SourceValidationError = 'SourceValidationError',
    DatabaseValidationError = 'DatabaseValidationError',
    ServerError = 'ServerError'
}