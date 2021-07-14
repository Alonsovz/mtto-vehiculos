import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchusuarioPipe } from './searchusuario.pipe';



@NgModule({
  declarations: [SearchusuarioPipe],
  imports: [
    CommonModule
  ],
  exports: [
    SearchusuarioPipe,
  ]
})
export class PipesModule { }
