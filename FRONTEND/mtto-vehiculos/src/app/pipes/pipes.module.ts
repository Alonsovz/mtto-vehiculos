import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchusuarioPipe } from './searchusuario.pipe';
import { SearchvehiculosPipe } from './searchvehiculos.pipe';
import { SearchcontratoPipe } from './searchcontrato.pipe';
import { SearchtalleresPipe } from './searchtalleres.pipe';



@NgModule({
  declarations: [SearchusuarioPipe, SearchvehiculosPipe, SearchcontratoPipe, SearchtalleresPipe],
  imports: [
    CommonModule
  ],
  exports: [
    SearchusuarioPipe,
    SearchvehiculosPipe,
    SearchcontratoPipe,
    SearchtalleresPipe
  ]
})
export class PipesModule { }
