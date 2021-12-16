import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AdminSolicitud } from '../models/admin-solicitud';
import { DetalleMtto } from '../models/detalle-mtto';
import { NSolicitud } from '../models/n-solicitud';
import { Usuario } from '../models/usuario';
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
export class AdminSolicitudService {

  constructor(private http: HttpClient, private router: Router, private globalservice: GlobalService) { }



    //metodo para obtener objeto de solicitudes en estado "ingresadas"
    public getSolicitudes_Ing(): Observable<AdminSolicitud[]> {
      return this.http.get(this.globalservice.getUrlBackEnd() + 'getSolicitudes_Ing').pipe(map(data => data as AdminSolicitud[]));
    }

    //metodo para obtener objeto de solicitudes en estado "aprobadas por jefatura"
    public getSolicitudes_AproJefe(): Observable<AdminSolicitud[]> {
      return this.http.get(this.globalservice.getUrlBackEnd() + 'getSolicitudes_AproJefe').pipe(map(data => data as AdminSolicitud[]));
    }

    //metodo para obtener objeto de solicitudes en estado "aprobadas por encargado de mtto"
    public getSolicitudes_AproMtto(): Observable<AdminSolicitud[]> {
      return this.http.get(this.globalservice.getUrlBackEnd() + 'getSolicitudes_AproMtto').pipe(map(data => data as AdminSolicitud[]));
    }

    //metodo para obtener objeto de solicitudes en estado "finalizadas"
    public getSolicitudes_Fin(): Observable<AdminSolicitud[]> {
      return this.http.get(this.globalservice.getUrlBackEnd() + 'getSolicitudes_Fin').pipe(map(data => data as AdminSolicitud[]));
    }


    public getMisSolicitudes_Ing(usuario: Usuario): Observable<AdminSolicitud[]> {
      return this.http.post<AdminSolicitud[]>(this.globalservice.getUrlBackEnd() + 'getMisSolicitudes_Ing', usuario, httpOptions)
      .pipe(map(data => data as AdminSolicitud[] ));
    }


    public getMisSolicitudes_AproJefe(usuario: Usuario): Observable<AdminSolicitud[]> {
      return this.http.post<AdminSolicitud[]>(this.globalservice.getUrlBackEnd() + 'getMisSolicitudes_AproJefe', usuario, httpOptions)
      .pipe(map(data => data as AdminSolicitud[] ));
    }


    public getMisSolicitudes_AproMtto(usuario: Usuario): Observable<AdminSolicitud[]> {
      return this.http.post<AdminSolicitud[]>(this.globalservice.getUrlBackEnd() + 'getMisSolicitudes_AproMtto', usuario, httpOptions)
      .pipe(map(data => data as AdminSolicitud[] ));
    }

    public getMisSolicitudes_Fin(usuario: Usuario): Observable<AdminSolicitud[]> {
      return this.http.post<AdminSolicitud[]>(this.globalservice.getUrlBackEnd() + 'getMisSolicitudes_Fin', usuario, httpOptions)
      .pipe(map(data => data as AdminSolicitud[] ));
    }


    public aprobarSolicitudJefe(soli: NSolicitud): Observable<NSolicitud> {
      return this.http.post<NSolicitud>(this.globalservice.getUrlBackEnd() + 'aprobarSolicitudJefe', soli, httpOptions)
      .pipe(map(data => data as NSolicitud ));
    }


    public aprobarSolicitudMtto(soli: NSolicitud): Observable<NSolicitud> {
      return this.http.post<NSolicitud>(this.globalservice.getUrlBackEnd() + 'aprobarSolicitudMtto', soli, httpOptions)
      .pipe(map(data => data as NSolicitud ));
    }

    public finalizarSolicitud(soli: NSolicitud): Observable<NSolicitud> {
      return this.http.post<NSolicitud>(this.globalservice.getUrlBackEnd() + 'finalizarSolicitud', soli, httpOptions)
      .pipe(map(data => data as NSolicitud ));
    }


     public getConteoAdmin(): Observable<AdminSolicitud[]> {
      return this.http.get(this.globalservice.getUrlBackEnd() + 'getConteoAdmin').pipe(map(data => data as AdminSolicitud[]));
    }

    public getConteoUser(usuario: Usuario): Observable<AdminSolicitud[]> {
      return this.http.post<AdminSolicitud[]>(this.globalservice.getUrlBackEnd() + 'getConteoUser', usuario, httpOptions)
      .pipe(map(data => data as AdminSolicitud[] ));
    }

    public get_detalle_soli(data: NSolicitud): Observable<DetalleMtto[]> {
      return this.http.post<DetalleMtto[]>(this.globalservice.getUrlBackEnd() + 'get_detalle_soli', data, httpOptions)
      .pipe(map(data => data as DetalleMtto[] ));
    }

    public guardarPrecioMtto(data: DetalleMtto): Observable<DetalleMtto> {
      return this.http.post<DetalleMtto>(this.globalservice.getUrlBackEnd() + 'guardarPrecioMtto', data, httpOptions)
      .pipe(map(data => data as DetalleMtto));
    }


}
