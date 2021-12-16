import { Pipe, PipeTransform } from '@angular/core';
import { Talleres } from '../models/talleres';

@Pipe({
  name: 'searchtalleres'
})
export class SearchtalleresPipe implements PipeTransform {

  transform(arreglo: Talleres[], texto: any): any {

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
