import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from '../../../../libs_fe/feature-login/src/lib/login/login.module';

@NgModule({
    declarations: [AppComponent],
    imports: [
       LoginModule,
       BrowserModule,
       HttpClientModule, 
       AppRoutingModule,
       RouterModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
