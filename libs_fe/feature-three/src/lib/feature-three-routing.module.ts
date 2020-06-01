import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

//CB:30May2020 Omit circular dep on refactor:
//noinspection ES6PreferShortImport
import { FeatureThreeComponent } from './feature-three/feature-three.component';

const routes: Routes = [
    {
        path: '',
        component: FeatureThreeComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FeatureThreeRoutingModule {}
