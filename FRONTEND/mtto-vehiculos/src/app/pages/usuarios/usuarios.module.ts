import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterService, GridModule, PagerModule, PageService, SortService,
GroupService } from '@syncfusion/ej2-angular-grids';

@NgModule({
  declarations: [UsuariosComponent],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    GridModule,
    PagerModule,
  ],
  providers: [PageService, SortService, FilterService, GroupService]
})
export class UsuariosModule { }
