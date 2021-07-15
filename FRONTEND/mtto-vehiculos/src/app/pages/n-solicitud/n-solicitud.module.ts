import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NSolicitudRoutingModule } from './n-solicitud-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { NSolicitudComponent } from './n-solicitud/n-solicitud.component';

@NgModule({
  declarations: [NSolicitudComponent],
  imports: [
    CommonModule,
    NSolicitudRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule
  ]
})
export class NSolicitudModule { }
