import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeatureLoginModule } from '@scl-co-eval/feature-login';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouteReuseService } from '@scl-co-eval/util';
import { ClientAuthInterceptor } from '@scl-co-eval/util';

const interceptorProviders: Provider[] = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: ClientAuthInterceptor,
        multi: true
    }
];

@NgModule({
    declarations: [AppComponent, DashboardComponent],
    imports: [
        FeatureLoginModule,
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        RouterModule,
    ],
    providers: [
        ...interceptorProviders,
        {
            provide: RouteReuseStrategy,
            useClass: RouteReuseService,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
