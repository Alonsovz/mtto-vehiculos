import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./../dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'usuarios',
        loadChildren: () => import('./../usuarios/usuarios.module').then(m => m.UsuariosModule)
      },
      {
        path: 'vehiculos',
        loadChildren: () => import('./../vehiculos/vehiculos.module').then(m => m.VehiculosModule)
      },
      {
        path: 'template',
        loadChildren: () => import('./../template/template.module').then(m => m.TemplateModule)
      },
      {
        path: 'n_solicitud',
        loadChildren: () => import('./../n-solicitud/n-solicitud.module').then(m => m.NSolicitudModule)
      },
      {
        path: 'admin_solicitud',
        loadChildren: () => import('./../admin-solicitud/admin-solicitud.module').then(m => m.AdminSolicitudModule)
      },
      {
        path: 'reportes',
        loadChildren: () => import('./../reportes/reportes.module').then(m => m.ReportesModule)
      },
      {
        path: 'contratos',
        loadChildren: () => import('./../contratos-vehiculos/contratos-vehiculos.module').then(m => m.ContratosVehiculosModule)
      },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
