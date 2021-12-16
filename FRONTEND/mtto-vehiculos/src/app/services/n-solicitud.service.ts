import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DetalleMtto } from '../models/detalle-mtto';
import { NSolicitud } from '../models/n-solicitud';
import { GlobalService } from './global.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })

};
@Injectable({
  providedIn: 'root'
})
export class NSolicitudService {

  constructor(private http: HttpClient, private router: Router, private globalservice: GlobalService) { }

      // metodo para guardar nueva solicitud de mantenimiento
      public guardar_solicitud(data: NSolicitud): Observable<NSolicitud> {
        return this.http.post<NSolicitud>(this.globalservice.getUrlBackEnd() + 'guardar_solicitud', data, httpOptions)
        .pipe(map(data => data as NSolicitud ));
      }


      public getKmbyVehiculo(vehiculo: NSolicitud): Observable<NSolicitud> {
        return this.http.post<NSolicitud>(this.globalservice.getUrlBackEnd() + 'getKmbyVehiculo', vehiculo, httpOptions)
        .pipe(map(data => data as NSolicitud ));
      }




      public getTipoMtto(data: NSolicitud): Observable<NSolicitud[]> {
        return this.http.post<NSolicitud[]>(this.globalservice.getUrlBackEnd() + 'getTipoMtto', data, httpOptions)
        .pipe(map(data => data as NSolicitud[] ));
      }

      public guardar_detalle_soli(data: DetalleMtto[]): Observable<DetalleMtto[]> {
        return this.http.post<DetalleMtto[]>(this.globalservice.getUrlBackEnd() + 'guardar_detalle_soli', data, httpOptions)
        .pipe(map(data => data as DetalleMtto[]));
      }



}
