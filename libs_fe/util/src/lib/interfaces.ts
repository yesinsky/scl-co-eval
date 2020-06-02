export interface IClientAuthService {
    signUp(email: string, password: string);
    login(email: string, password: string);
    logout();
    isLoggedIn();
    isLoggedOut();
    getAuthExpirationTime();
}

export type ClientLoginData = {
    email: string;
    password: string;
};

export type ClientAccessData = {
    user?: ClientUserData;
    token?: string;
    status: string;
};

export type ClientUserData = {
    id: string;
    email: string;
    name: string;
}

export type FormModel<T> = { [P in keyof T]: [T[P], any?] };


