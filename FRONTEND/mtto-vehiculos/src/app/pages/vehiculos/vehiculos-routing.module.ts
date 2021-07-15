import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VehiculosComponent } from './vehiculos/vehiculos.component';

const routes: Routes = [
  {
    path: '', component: VehiculosComponent,
    children: [

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehiculosRoutingModule { }
