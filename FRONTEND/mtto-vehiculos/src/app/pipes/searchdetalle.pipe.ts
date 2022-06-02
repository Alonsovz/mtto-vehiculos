import { Pipe, PipeTransform } from '@angular/core';
import { DetallesMtto } from '../models/detalles-mtto';

@Pipe({
  name: 'searchdetalle'
})
export class SearchdetallePipe implements PipeTransform {

  transform(arreglo: DetallesMtto[], texto: any): any {

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
