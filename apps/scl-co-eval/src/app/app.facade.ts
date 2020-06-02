import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClientAuthService } from '@scl-co-eval/util';
import { Subject, Subscription, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class AppFacade implements OnDestroy {
    public isApiAvailable: Subject<boolean> = new Subject<boolean>();

    constructor(
        private _httpClient: HttpClient,
        private _authService: ClientAuthService
    ) {
        this._authSub = this._authService.onAuthChanged.subscribe((isLogged) => {
            this.isApiAvailable.next(isLogged);
        });
    }

    private _authSub: Subscription;

    getTestApiMessage() {
        return this._httpClient.get<any>('/api/hello').pipe(
            catchError((err) => {
                console.log(err);
                return throwError(err);
            })
        );
    }

    ngOnDestroy(): void {
        this._authSub.unsubscribe();
        this._authSub = null;
    }
}
