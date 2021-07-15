import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminSolicitudComponent } from './admin-solicitud/admin-solicitud.component';


const routes: Routes = [
  {
    path: '', component: AdminSolicitudComponent,
    children: [

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminSolicitudRoutingModule { }
