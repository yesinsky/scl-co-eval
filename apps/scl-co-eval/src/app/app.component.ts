import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AppFacade } from './app.facade';

@Component({
  selector: 'scl-co-eval-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy{
  isMessageAvailable: boolean;
  message$: Observable<string>;
  error$: Observable<string>;

  constructor(private _facade: AppFacade) {
    this._apiSub = this._facade.isApiAvailable.subscribe(res => {
      this.isMessageAvailable = res;
      this.message$ = this._facade.getTestApiMessages();
    });

    this.error$ = this._facade.getApplicationErrors();
  }

  private _apiSub: Subscription;

  ngOnDestroy(): void {
    this._apiSub.unsubscribe();
    this._apiSub = null;

    this.error$ = null;
    this.message$ = null;
  }
}
