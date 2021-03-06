import { UserDto } from './user.dto';

export interface UpdateUserRequest {
    user: UserDto;
}

export interface UpdateUserResponse {
    status: UserUpdateStatus;
}

export enum UserUpdateStatus {
    Updated = 'Updated',
    NotExist = 'NotExist',
}
