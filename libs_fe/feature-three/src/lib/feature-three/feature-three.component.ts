import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'scl-co-eval-feature-three',
  templateUrl: './feature-three.component.html',
  styleUrls: ['./feature-three.component.scss']
})
export class FeatureThreeComponent implements OnInit {

  constructor(private readonly _location: Location) { }

  ngOnInit(): void {
  }

  navigateBack(): void{
    this._location.back();
  }

}
