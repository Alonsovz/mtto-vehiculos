import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetallesMttoComponent } from './detalles-mtto/detalles-mtto.component';

const routes: Routes = [
  {
    path: '', component: DetallesMttoComponent,
    children: [

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetallesMttoRoutingModule { }
