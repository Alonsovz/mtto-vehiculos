import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportesComponent } from './reportes/reportes.component';

const routes: Routes = [
  {
    path: '', component: ReportesComponent,
    children: [

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportesRoutingModule { }
