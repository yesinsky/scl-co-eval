import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class LoginFacade {

    constructor(private readonly _httpClient: HttpClient) {
    }

    public handleSignUp(sourceEmail: string, sourcePassword: string){
        console.log(sourceEmail);
    }

    public handleLogin(sourceEmail: string, sourcePassword: string){
        console.log(sourceEmail);
    }
}
