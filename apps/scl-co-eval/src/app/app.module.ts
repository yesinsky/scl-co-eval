import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeatureLoginModule } from '@scl-co-eval/feature-login';

@NgModule({
    declarations: [AppComponent],
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
