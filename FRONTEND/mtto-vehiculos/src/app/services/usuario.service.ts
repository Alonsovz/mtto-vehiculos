import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { GlobalService } from './global.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Rol } from '../models/rol';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })

};

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public loggedIn : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public usuariologueado : BehaviorSubject<Usuario> = new BehaviorSubject<Usuario>(new Usuario());

  get isLoggedIn(){
    return this.loggedIn.asObservable();
  }

  get isusuarioLogueado(){
    return this.usuariologueado.asObservable();
  }

  constructor(private http: HttpClient, private router: Router, private globalservice: GlobalService) { }

   // metodo para validar credenciales
   public login(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.globalservice.getUrlBackEnd() + 'validarCredenciales', usuario, httpOptions)
    .pipe(map(data => data as Usuario ));
  }

   //metodo para obtener objeto de usuarios para select
   public getUsuariosTbl(): Observable<Usuario[]> {
    return this.http.get(this.globalservice.getUrlBackEnd() + 'getUsuariosTbl').pipe(map(data => data as Usuario[]));
  }


    //metodo para obtener objeto de usuarios para select
    public getUsuarios(): Observable<Usuario[]> {
      return this.http.get(this.globalservice.getUrlBackEnd() + 'getUsuarios').pipe(map(data => data as Usuario[]));
    }
    public getUsuariosVh(): Observable<Usuario[]> {
      return this.http.get(this.globalservice.getUrlBackEnd() + 'getUsuariosVh').pipe(map(data => data as Usuario[]));
    }

    //metodo para obtener objeto de datos para tabla
   public getRoles(): Observable<Rol[]> {
    return this.http.get(this.globalservice.getUrlBackEnd() + 'getRoles').pipe(map(data => data as Rol[]));
  }


   // metodo para guardar nuevo usuario
   public guardarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.globalservice.getUrlBackEnd() + 'guardarUsuario', usuario, httpOptions)
    .pipe(map(data => data as Usuario ));
  }


   // metodo para editar usuario
   public editarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.globalservice.getUrlBackEnd() + 'editarUsuario', usuario, httpOptions)
    .pipe(map(data => data as Usuario ));
  }


   // metodo para eliminar usuario
   public eliminarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.globalservice.getUrlBackEnd() + 'eliminarUsuario', usuario, httpOptions)
    .pipe(map(data => data as Usuario ));
  }

}
