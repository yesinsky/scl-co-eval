export interface DeleteUserRequest {
    email: string;
}
export interface DeleteUserResponse {
    status: DeleteUserStatus;
}
export enum DeleteUserStatus {
    DeletedSuccessfully = 0,
    NotExist = 1,
}