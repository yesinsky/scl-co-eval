import { UserDto } from './user.dto';
import { IsDefined, ValidateNested } from 'class-validator';

export class UpdateUserRequest {
    @ValidateNested()
    @IsDefined()
    user: UserDto;
}

export interface UpdateUserResponse {
    status: UserUpdateStatus;
}

export enum UserUpdateStatus {
    Updated = 'Updated',
    NotExist = 'NotExist',
}
