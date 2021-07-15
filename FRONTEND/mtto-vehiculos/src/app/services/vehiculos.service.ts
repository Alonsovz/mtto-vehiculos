import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vehiculos } from '../models/vehiculos';
import { GlobalService } from './global.service';
import { Router } from '@angular/router';
import {Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })

};
@Injectable({
  providedIn: 'root'
})
export class VehiculosService {

  constructor(private http: HttpClient, private router: Router, private globalservice: GlobalService) { }


   //metodo para obtener objeto de usuarios para select
   public getVehiculos(): Observable<Vehiculos[]> {
    return this.http.get(this.globalservice.getUrlBackEnd() + 'getVehiculos').pipe(map(data => data as Vehiculos[]));
  }
}
