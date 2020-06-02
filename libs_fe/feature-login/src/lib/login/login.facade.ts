import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClientAuthService } from '@scl-co-eval/util';

@Injectable({
    providedIn: 'root',
})
export class LoginFacade {
    constructor(
        private readonly _httpClient: HttpClient,
        private readonly _authService: ClientAuthService
    ) {}

    public handleSignUp(sourceEmail: string, sourcePassword: string) {
        this._authService.signUp(sourceEmail, sourcePassword);
    }

    public handleLogin(sourceEmail: string, sourcePassword: string) {
        this._authService.login(sourceEmail, sourcePassword);
    }
}
