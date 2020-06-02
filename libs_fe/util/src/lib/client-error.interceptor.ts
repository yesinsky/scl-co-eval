import {
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpEvent,
    HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorService } from './error.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ClientErrorInterceptor implements HttpInterceptor {
    constructor(public _errorService: ErrorService) {}
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((err: any) => {
                if (err instanceof HttpErrorResponse) {
                    this._errorService.processError(err);
                }
                return of(err);
            })
        );
    }
}
