import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchusuarioPipe } from './searchusuario.pipe';
import { SearchvehiculosPipe } from './searchvehiculos.pipe';



@NgModule({
  declarations: [SearchusuarioPipe, SearchvehiculosPipe],
  imports: [
    CommonModule
  ],
  exports: [
    SearchusuarioPipe,
    SearchvehiculosPipe
  ]
})
export class PipesModule { }
