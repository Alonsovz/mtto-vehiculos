import { Pipe, PipeTransform } from '@angular/core';
import { Contratos } from '../models/contratos';

@Pipe({
  name: 'searchcontrato'
})
export class SearchcontratoPipe implements PipeTransform {

  transform(arreglo: Contratos[], texto: any): any {

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
