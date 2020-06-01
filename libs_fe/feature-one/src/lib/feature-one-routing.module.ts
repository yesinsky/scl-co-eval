import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

//CB:30May2020 Omit circular dep on refactor:
//noinspection ES6PreferShortImport
import { FeatureOneComponent } from './feature-one/feature-one.component';

const routes: Routes = [
    {
        path: '',
        component: FeatureOneComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FeatureOneRoutingModule{

}
