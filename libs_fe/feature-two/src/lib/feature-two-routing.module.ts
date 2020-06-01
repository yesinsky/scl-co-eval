import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

//CB:30May2020 Omit circular dep on refactor:
//noinspection ES6PreferShortImport
import { FeatureTwoComponent } from './feature-two/feature-two.component';

const routes: Routes = [
    {
        path: '',
        component: FeatureTwoComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FeatureTwoRoutingModule {}
