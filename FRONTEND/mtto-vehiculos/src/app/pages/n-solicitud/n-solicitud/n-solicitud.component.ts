import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NSolicitud } from 'src/app/models/n-solicitud';
import { Usuario } from 'src/app/models/usuario';
import { Vehiculos } from 'src/app/models/vehiculos';
import { NSolicitudService } from 'src/app/services/n-solicitud.service';
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

  constructor(private router: Router, private vehiculo: VehiculosService,
    private soli_service: NSolicitudService,  private toastr: ToastrService) {

    this.n_solicitud_form = new FormGroup({
      'nombreSolicitante': new FormControl('',[Validators.required]),
      'departamento': new FormControl('',[Validators.required]),

      'fecha_solicitud': new FormControl('',[Validators.required]),
      'dias_estimados': new FormControl('',[Validators.required]),
      'id_solicitante': new FormControl('',[Validators.required]),
      'id_vehiculo': new FormControl('',[Validators.required]),
      'km_sticker': new FormControl('',[Validators.required]),
      'km_actual': new FormControl('',[Validators.required]),
      'tipo_mantemiento': new FormControl('',[Validators.required]),
      'observaciones': new FormControl('',[Validators.required]),
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


  cancelar_soli(){
    this.router.navigate(['dashboard/template']);
  }

  guardar_soli(){
    let datos : NSolicitud = new NSolicitud();

    datos = this.n_solicitud_form.value;


    this.soli_service.guardar_solicitud(datos).subscribe(
      response => {

      },
      err => {
        this.toastr.error('Error','Algo salió mal :(');
      },
      () => {
        this.toastr.success('Éxito','Solicitud ingresada');
        this.router.navigate(['dashboard/admin_solicitud']);
      }


    );
  }

}
