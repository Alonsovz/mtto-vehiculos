import { Pipe, PipeTransform } from '@angular/core';
import { Vehiculos } from '../models/vehiculos';

@Pipe({
  name: 'searchvehiculos'
})
export class SearchvehiculosPipe implements PipeTransform {

  transform(arreglo: Vehiculos[], texto: any): any {

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
