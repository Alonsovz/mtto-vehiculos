import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminSolicitudRoutingModule } from './admin-solicitud-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminSolicitudRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule
  ]
})
export class AdminSolicitudModule { }
