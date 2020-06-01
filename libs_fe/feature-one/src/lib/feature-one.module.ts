import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureOneComponent } from './feature-one/feature-one.component';
import { FeatureOneRoutingModule } from './feature-one-routing.module';

@NgModule({
    imports: [CommonModule, FeatureOneRoutingModule],
    declarations: [FeatureOneComponent],
})
export class FeatureOneModule {}
