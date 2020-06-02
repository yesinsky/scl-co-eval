import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClientAuthService } from '@scl-co-eval/util';
import { Subject, Subscription, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorService } from '../../../../libs_fe/util/src/lib/error.service';

@Injectable({
    providedIn: 'root',
})
export class AppFacade implements OnDestroy {
    public isApiAvailable: Subject<boolean> = new Subject<boolean>();

    constructor(
        private _httpClient: HttpClient,
        private _authService: ClientAuthService,
        private _errorService: ErrorService
    ) {
        const apiSub = this._authService.onAuthChanged.subscribe((isLogged) => {
            this.isApiAvailable.next(isLogged);
        });

        this.subs = [apiSub];
    }

    private readonly subs: Subscription[];

    getTestApiMessages() {
        return this._httpClient.get<any>('/api/hello').pipe(
            catchError((err) => {
                console.log(err);
                return throwError(err);
            })
        );
    }

    getApplicationErrors() {
        //TODO CB01Jun2020: Yagni - passed by as is for simplicity.
        return this._errorService.onError;
    }

    ngOnDestroy(): void {
        for (let i = 0; i < this.subs.length; i++) {
            let sub = this.subs[i];
            if (!!sub) {
                sub.unsubscribe();
                sub[i] = null;
            }
        }
    }
}
