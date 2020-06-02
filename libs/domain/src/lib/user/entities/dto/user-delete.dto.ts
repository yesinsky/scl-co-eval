import { IsEmail } from 'class-validator';

export class DeleteUserRequest {
    @IsEmail()
    email: string;
}
export type DeleteUserResponse = {
    status: DeleteUserStatus;
}
export enum DeleteUserStatus {
    DeletedSuccessfully = 'DeletedSuccessfully',
    NotExist = 'NotExist',
}