import { UserDto } from './user.dto';
import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class CreateUserRequest {
    name?:string;
    @IsEmail()
    email: string;
    @IsNotEmpty()
    rawPassword: string;
}

export type CreateUserResponse = {
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