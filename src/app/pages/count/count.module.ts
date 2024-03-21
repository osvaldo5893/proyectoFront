import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountRoutingModule } from './count-routing.module';
import { ContarComponent } from './contar/contar.component';
import { PrimeModule } from 'app/modules/prime/prime.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ContarComponent
  ],
  imports: [
    CommonModule,
    CountRoutingModule,
    PrimeModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CountModule { }
