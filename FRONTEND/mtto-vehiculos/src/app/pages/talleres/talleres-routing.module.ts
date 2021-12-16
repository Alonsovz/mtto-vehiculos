import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TalleresComponent } from './talleres/talleres.component';

const routes: Routes = [
  {
    path: '', component: TalleresComponent,
    children: [

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TalleresRoutingModule { }
