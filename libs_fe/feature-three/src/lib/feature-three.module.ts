import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureThreeComponent } from './feature-three/feature-three.component';
import { FeatureThreeRoutingModule } from './feature-three-routing.module';

@NgModule({
    imports: [CommonModule, FeatureThreeRoutingModule],
    declarations: [FeatureThreeComponent],
})
export class FeatureThreeModule {}
