import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchusuarioPipe } from './searchusuario.pipe';
import { SearchvehiculosPipe } from './searchvehiculos.pipe';
import { SearchcontratoPipe } from './searchcontrato.pipe';
import { SearchtalleresPipe } from './searchtalleres.pipe';
import { SearchdetallePipe } from './searchdetalle.pipe';



@NgModule({
  declarations: [SearchusuarioPipe, SearchvehiculosPipe, SearchcontratoPipe, SearchtalleresPipe, SearchdetallePipe],
  imports: [
    CommonModule
  ],
  exports: [
    SearchusuarioPipe,
    SearchvehiculosPipe,
    SearchcontratoPipe,
    SearchtalleresPipe,
    SearchdetallePipe
  ]
})
export class PipesModule { }
