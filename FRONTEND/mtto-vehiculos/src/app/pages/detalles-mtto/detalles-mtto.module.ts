import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetallesMttoRoutingModule } from './detalles-mtto-routing.module';
import { DetallesMttoComponent } from './detalles-mtto/detalles-mtto.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/pipes/pipes.module';


@NgModule({
  declarations: [DetallesMttoComponent],
  imports: [
    CommonModule,
    DetallesMttoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule
  ]
})
export class DetallesMttoModule { }
