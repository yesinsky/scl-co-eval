import * as moment from 'moment';
import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subject, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ClientAccessData, IClientAuthService } from './interfaces';
import { takeUntil } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class ClientAuthService implements IClientAuthService, OnDestroy {
    public onAuthChanged = new Subject<boolean>();

    //TODO CB30May2020: Yagni: implement or reuse config service.
    //TODO CB30May2020: Extract string values to FE config.
    private readonly _authUrlBase = '/api/auth';
    private readonly _defaultRedirectPath = '/dashboard';
    private _isAuthenticated: boolean = false;
    private _ngUnsubscribe = new Subject();

    constructor(private _http: HttpClient, private _router: Router) {}

    ngOnDestroy(): void {
        this._ngUnsubscribe.next();
        this._ngUnsubscribe.complete();
    }

    signUp(email: string, password: string) {
        this._http
            .post<ClientAccessData>(`${this._authUrlBase}/signup`, {
                email,
                password,
                name: email,})
            .pipe(takeUntil(this._ngUnsubscribe))
            .subscribe(
                async (res) => {
                    await this.processLoginResult(res);
                },
                (err) => {
                    this.processLoginFail(err);
                }
            );
    }

    login(email: string, password: string) {
        this._http
            .post<ClientAccessData>(`${this._authUrlBase}/login`, { email, password })
            .pipe(takeUntil(this._ngUnsubscribe))
            .subscribe(
                async (res) => {
                    await this.processLoginResult(res);
                },
                (err) => {
                    this.processLoginFail(err);
                }
            );
    }

    //TODO CB01Jun2020: Add logger and error service.
    private processLoginFail(err) {
        console.log('HTTP Error', err);
    }

    private async processLoginResult(res: ClientAccessData) {
        this.onAuthChanged.next(true);
        this.setSession(res);
        await this._router.navigate([this._defaultRedirectPath]);
    }

    private setSession(authResult: ClientAccessData) {
        //TODO CB30May2020: Add exp field to resp. Not yet supported api.
        const expiresAt = moment().add(6000/*authResult.exp*/, 'second');

        localStorage.setItem('id_token', authResult.token);
        localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));

        this._isAuthenticated = true;
    }

    logout() {
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        this.onAuthChanged.next(false);
    }

    isLoggedIn() {
        return moment().isBefore(this.getAuthExpirationTime()) && this._isAuthenticated;
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getAuthExpirationTime() {
        const expiration = localStorage.getItem('expires_at');
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }

    //TODO CB01Jun2020: Add logger and error service.
    private handleError(err: HttpErrorResponse | any) {
        console.error('An error occurred', err);
        return throwError(err.message || err);
    }
}
