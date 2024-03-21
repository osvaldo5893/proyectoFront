import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashComponent } from './dash/dash.component';
import { PrimeModule } from 'app/modules/prime/prime.module';



@NgModule({
  declarations: [
    DashComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    PrimeModule
  ]
})
export class DashboardModule { }
