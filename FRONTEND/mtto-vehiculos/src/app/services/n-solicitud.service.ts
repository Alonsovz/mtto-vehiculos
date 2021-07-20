import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
      public guardar_solicitud(clasificacion: NSolicitud): Observable<NSolicitud> {
        return this.http.post<NSolicitud>(this.globalservice.getUrlBackEnd() + 'guardar_solicitud', clasificacion, httpOptions)
        .pipe(map(data => data as NSolicitud ));
      }


}
