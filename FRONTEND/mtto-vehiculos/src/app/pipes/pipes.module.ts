import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchusuarioPipe } from './searchusuario.pipe';
import { SearchvehiculosPipe } from './searchvehiculos.pipe';
import { SearchcontratoPipe } from './searchcontrato.pipe';



@NgModule({
  declarations: [SearchusuarioPipe, SearchvehiculosPipe, SearchcontratoPipe],
  imports: [
    CommonModule
  ],
  exports: [
    SearchusuarioPipe,
    SearchvehiculosPipe,
    SearchcontratoPipe
  ]
})
export class PipesModule { }
