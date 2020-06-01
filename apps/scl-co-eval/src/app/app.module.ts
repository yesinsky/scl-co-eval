import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeatureLoginModule } from '@scl-co-eval/feature-login';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouteReuseService } from '@scl-co-eval/util';

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
        {
            provide: RouteReuseStrategy,
            useClass: RouteReuseService,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
