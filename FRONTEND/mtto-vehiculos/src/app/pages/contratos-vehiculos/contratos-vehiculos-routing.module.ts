import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContratosVehiculosComponent } from './contratos-vehiculos/contratos-vehiculos.component';

const routes: Routes = [
  {
    path: '', component: ContratosVehiculosComponent,
    children: [

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContratosVehiculosRoutingModule { }
