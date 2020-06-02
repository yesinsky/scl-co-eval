import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ClientAuthService } from './client-auth.service';

@Injectable({
    providedIn: 'root',
})
export class ClientAuthGuard implements CanActivate{
    constructor(private readonly _authService: ClientAuthService, private readonly _router: Router) {
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const isLoggedIn = this._authService.isLoggedIn();
        if(isLoggedIn){
            return true;
        }else{
            this._router.navigate(['/']);
        }
    }

}
