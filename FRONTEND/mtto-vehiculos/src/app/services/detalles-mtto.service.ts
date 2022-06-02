import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DetallesMtto } from '../models/detalles-mtto';
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
export class DetallesMttoService {

  constructor(private http: HttpClient, private router: Router, private globalservice: GlobalService) { }


  //metodo para obtener objeto de usuarios para select
  public getDetalles(): Observable<DetallesMtto[]> {
   return this.http.get(this.globalservice.getUrlBackEnd() + 'getDetalles').pipe(map(data => data as DetallesMtto[]));
 }

 public editDetalle(dt: DetallesMtto): Observable<DetallesMtto> {
  return this.http.post<DetallesMtto>(this.globalservice.getUrlBackEnd() + 'editDetalle', dt, httpOptions)
  .pipe(map(data => data as DetallesMtto ));
}

public eliminarDetalle(dt: DetallesMtto): Observable<DetallesMtto> {
  return this.http.post<DetallesMtto>(this.globalservice.getUrlBackEnd() + 'eliminarDetalle', dt, httpOptions)
  .pipe(map(data => data as DetallesMtto ));
}

public guardarDetalle(dt: DetallesMtto): Observable<DetallesMtto> {
  return this.http.post<DetallesMtto>(this.globalservice.getUrlBackEnd() + 'guardarDetalle', dt, httpOptions)
  .pipe(map(data => data as DetallesMtto ));
}

public getDetallesServFrec(): Observable<DetallesMtto[]> {
  return this.http.get(this.globalservice.getUrlBackEnd() + 'getDetallesServFrec').pipe(map(data => data as DetallesMtto[]));
}


public guardarServicioFrecuente(dt: DetallesMtto): Observable<DetallesMtto> {
  return this.http.post<DetallesMtto>(this.globalservice.getUrlBackEnd() + 'guardarServicioFrecuente', dt, httpOptions)
  .pipe(map(data => data as DetallesMtto ));
}

public getServicioFrecuentes(vehiculo: Vehiculos): Observable<DetallesMtto[]> {
  return this.http.post<DetallesMtto[]>(this.globalservice.getUrlBackEnd() + 'getServicioFrecuentes', vehiculo, httpOptions)
  .pipe(map(data => data as DetallesMtto[] ));
}



}
