import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './layout/footer/footer.component';



@NgModule({
  declarations: [FooterComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ], exports: [
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FooterComponent
  ]
})
export class SharedModule { }
