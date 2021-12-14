import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContratosVehiculosRoutingModule } from './contratos-vehiculos-routing.module';
import { ContratosVehiculosComponent } from './contratos-vehiculos/contratos-vehiculos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/pipes/pipes.module';


@NgModule({
  declarations: [ContratosVehiculosComponent],
  imports: [
    CommonModule,
    ContratosVehiculosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule
  ]
})
export class ContratosVehiculosModule { }
