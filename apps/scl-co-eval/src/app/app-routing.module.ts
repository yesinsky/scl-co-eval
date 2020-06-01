import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '@scl-co-eval/feature-login';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
    },
    {
        path: 'one',
        pathMatch: 'full',
        loadChildren: () => import('@scl-co-eval/feature-one').then(m => m.FeatureOneModule)
    },
    {
        path: 'two',
        pathMatch: 'full',
        loadChildren: () => import('@scl-co-eval/feature-two').then(m => m.FeatureTwoModule)
    },
    {
        path: 'three',
        pathMatch: 'full',
        loadChildren: () => import('@scl-co-eval/feature-three').then(m => m.FeatureThreeModule)
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
