import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'scl-co-eval-feature-two',
  templateUrl: './feature-two.component.html',
  styleUrls: ['./feature-two.component.scss']
})
export class FeatureTwoComponent implements OnInit {

  constructor(private readonly _location: Location) { }

  ngOnInit(): void {
  }

  navigateBack(): void{
    this._location.back();
  }

}
