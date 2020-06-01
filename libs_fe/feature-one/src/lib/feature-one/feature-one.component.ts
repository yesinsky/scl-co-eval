import { Component, OnInit,  } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'scl-co-eval-feature-one',
  templateUrl: './feature-one.component.html',
  styleUrls: ['./feature-one.component.scss']
})
export class FeatureOneComponent implements OnInit {

  constructor(private readonly _location: Location) { }

  ngOnInit(): void {
  }

  navigateBack(): void{
    this._location.back();
  }

}
