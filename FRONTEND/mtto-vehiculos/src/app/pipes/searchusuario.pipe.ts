import { Pipe, PipeTransform } from '@angular/core';
import { Usuario } from '../models/usuario';

@Pipe({
  name: 'searchusuario'
})
export class SearchusuarioPipe implements PipeTransform {

  transform(arreglo: Usuario[], texto: any): any {

    if(texto) {
      return arreglo.filter(
        item => JSON.stringify(item).toLocaleLowerCase().includes(texto)
      );
    }
    else{
      return arreglo;
    }

  }
}
