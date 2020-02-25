import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './layout/footer/footer.component';
import { LoadingSpinnerComponent } from './layout/loading-spinner/loading-spinner.component';



@NgModule({
  declarations: [FooterComponent, LoadingSpinnerComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ], exports: [
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FooterComponent,
    LoadingSpinnerComponent
  ]
})
export class SharedModule { }
