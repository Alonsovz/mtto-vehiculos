import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  user: Usuario = new Usuario();


  constructor(private router: Router) { }

  ngOnInit(): void {

    if(localStorage.getItem('usuario_mtto') !== null){

      this.user = JSON.parse(localStorage.getItem("usuario_mtto"));

  }else{
    this.router.navigate(['login']);
  }
  }


  goUsuarios(){
    this.router.navigate(['dashboard/usuarios']);
  }

  goVehiculos(){
    this.router.navigate(['dashboard/vehiculos']);
  }

  adminSolicitudes(){
    this.router.navigate(['dashboard/admin_solicitud']);
  }

  nueva_solicitud(){
    this.router.navigate(['dashboard/n_solicitud']);
  }
}
