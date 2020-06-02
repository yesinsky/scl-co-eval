import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '@scl-co-eval/feature-login';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClientAuthGuard } from '@scl-co-eval/util';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
    },
    {
        path: 'one',
        pathMatch: 'full',
        loadChildren: () =>
            import('@scl-co-eval/feature-one').then((m) => m.FeatureOneModule),
        data: {
            reuse: true
        },
        canActivate: [ClientAuthGuard]
    },
    {
        path: 'two',
        pathMatch: 'full',
        loadChildren: () =>
            import('@scl-co-eval/feature-two').then((m) => m.FeatureTwoModule),
        data: {
            reuse: true
        },
        canActivate: [ClientAuthGuard]
    },
    {
        path: 'three',
        pathMatch: 'full',
        loadChildren: () =>
            import('@scl-co-eval/feature-three').then(
                (m) => m.FeatureThreeModule
            ),
        data: {
            reuse: true
        },
        canActivate: [ClientAuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [ClientAuthGuard]
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
