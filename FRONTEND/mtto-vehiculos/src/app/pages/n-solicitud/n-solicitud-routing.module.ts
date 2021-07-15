import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NSolicitudComponent } from './n-solicitud/n-solicitud.component';

const routes: Routes = [
  {
    path: '', component: NSolicitudComponent,
    children: [

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NSolicitudRoutingModule { }
