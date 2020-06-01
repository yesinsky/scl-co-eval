import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, ReactiveFormsModule],
    declarations: [LoginComponent],
    exports: [LoginComponent],
})
export class FeatureLoginModule {}
