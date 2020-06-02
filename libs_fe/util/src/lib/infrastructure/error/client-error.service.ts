import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ClientErrorService implements OnDestroy{
    onError: Subject<string> = new Subject<string>();

    processError(err){
        this.onError.next(JSON.stringify(err));
    }

    ngOnDestroy(): void {
        this.onError.unsubscribe();
        this.onError = null;
    }
}
