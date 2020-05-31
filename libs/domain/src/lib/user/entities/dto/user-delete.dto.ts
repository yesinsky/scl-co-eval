export interface DeleteUserRequest {
    email: string;
}
export interface DeleteUserResponse {
    status: DeleteUserStatus;
}
export enum DeleteUserStatus {
    DeletedSuccessfully = 'DeletedSuccessfully',
    NotExist = 'NotExist',
}