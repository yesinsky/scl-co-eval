import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeatureLoginModule } from '@scl-co-eval/feature-login';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
    declarations: [AppComponent, DashboardComponent],
    imports: [
       FeatureLoginModule,
       BrowserModule,
       HttpClientModule, 
       AppRoutingModule,
       RouterModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
