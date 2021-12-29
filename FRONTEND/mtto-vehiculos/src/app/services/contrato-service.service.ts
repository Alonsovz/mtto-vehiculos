import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contratos } from '../models/contratos';
import { GlobalService } from './global.service';
import { Router } from '@angular/router';
import {Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Vehiculos } from '../models/vehiculos';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })

};
@Injectable({
  providedIn: 'root'
})
export class ContratoServiceService {

  constructor(private http: HttpClient, private router: Router, private globalservice: GlobalService) { }


  //metodo para obtener objeto de usuarios para select
  public getContratos(): Observable<Contratos[]> {
   return this.http.get(this.globalservice.getUrlBackEnd() + 'getContratos').pipe(map(data => data as Contratos[]));
 }


 public guardarContrato(datos: Contratos): Observable<Contratos> {
  return this.http.post<Contratos>(this.globalservice.getUrlBackEnd() + 'guardarContrato', datos, httpOptions)
  .pipe(map(data => data as Contratos ));
}

public eliminarContrato(datos: Contratos): Observable<Contratos> {
  return this.http.post<Contratos>(this.globalservice.getUrlBackEnd() + 'eliminarContrato', datos, httpOptions)
  .pipe(map(data => data as Contratos ));
}

public getNContratoByVehiculo(datos: Vehiculos): Observable<Contratos[]> {
  return this.http.post<Contratos[]>(this.globalservice.getUrlBackEnd() + 'getNContratoByVehiculo', datos, httpOptions)
  .pipe(map(data => data as Contratos[] ));
}

public getDetallesVh(datos: Vehiculos): Observable<Vehiculos[]> {
  return this.http.post<Vehiculos[]>(this.globalservice.getUrlBackEnd() + 'getDetallesVh', datos, httpOptions)
  .pipe(map(data => data as Vehiculos[] ));
}

}
