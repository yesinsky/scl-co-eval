import { Component, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppFacade } from './app.facade';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'scl-co-eval-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy{
  isMessageAvailable: boolean;
  message$: Observable<string>;

  constructor(private _facade: AppFacade) {
    this._apiSub = this._facade.isApiAvailable.subscribe(res => {
      this.isMessageAvailable = res;
      this.message$ = this._facade.getTestApiMessage();
    })
  }

  private _apiSub: Subscription;

  ngOnDestroy(): void {
    this._apiSub.unsubscribe();
    this._apiSub = null;
  }

}
