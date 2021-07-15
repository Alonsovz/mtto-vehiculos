import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { Vehiculos } from 'src/app/models/vehiculos';
import { VehiculosService } from 'src/app/services/vehiculos.service';

@Component({
  selector: 'app-n-solicitud',
  templateUrl: './n-solicitud.component.html',
  styleUrls: ['./n-solicitud.component.css']
})
export class NSolicitudComponent implements OnInit {
  user : Usuario = new Usuario();
  objVehiculos: Vehiculos[];

  n_solicitud_form: FormGroup;

  constructor(private router: Router, private vehiculo: VehiculosService) {

    this.n_solicitud_form = new FormGroup({
      'nombreSolicitante': new FormControl('',[Validators.required]),
      'departamento': new FormControl('',[Validators.required]),
      'idUsuario': new FormControl('',[Validators.required]),
      'vehiculo_id': new FormControl('',[Validators.required]),
    });
   }

  ngOnInit(): void {
    if(localStorage.getItem('usuario_mtto') !== null){

      this.user = JSON.parse(localStorage.getItem("usuario_mtto"));

  }else{
    this.router.navigate(['login']);
  }

  this.vehiculo.getVehiculos().subscribe(
    data => {
      this.objVehiculos = data;
    });
  }

}
