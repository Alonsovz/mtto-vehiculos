import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TalleresRoutingModule } from './talleres-routing.module';
import { TalleresComponent } from './talleres/talleres.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/pipes/pipes.module';


@NgModule({
  declarations: [TalleresComponent],
  imports: [
    CommonModule,
    TalleresRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule
  ]
})
export class TalleresModule { }
