import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contratos } from '../models/contratos';
import { GlobalService } from './global.service';
import { Router } from '@angular/router';
import {Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Talleres } from '../models/talleres';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })

};
@Injectable({
  providedIn: 'root'
})
export class TalleresService {

  constructor(private http: HttpClient, private router: Router, private globalservice: GlobalService) { }



  public getTalleres(): Observable<Talleres[]> {
   return this.http.get(this.globalservice.getUrlBackEnd() + 'getTalleres').pipe(map(data => data as Talleres[]));
 }


 public getTalleres_list(): Observable<Talleres[]> {
  return this.http.get(this.globalservice.getUrlBackEnd() + 'getTalleres_list').pipe(map(data => data as Talleres[]));
}


 public guardarTaller(datos: Talleres): Observable<Talleres> {
  return this.http.post<Talleres>(this.globalservice.getUrlBackEnd() + 'guardarTaller', datos, httpOptions)
  .pipe(map(data => data as Talleres ));
}

public eliminarTaller(datos: Talleres): Observable<Talleres> {
  return this.http.post<Talleres>(this.globalservice.getUrlBackEnd() + 'eliminarTaller', datos, httpOptions)
  .pipe(map(data => data as Talleres ));
}

public editarTaller(datos: Talleres): Observable<Talleres> {
  return this.http.post<Talleres>(this.globalservice.getUrlBackEnd() + 'editarTaller', datos, httpOptions)
  .pipe(map(data => data as Talleres ));
}
}
