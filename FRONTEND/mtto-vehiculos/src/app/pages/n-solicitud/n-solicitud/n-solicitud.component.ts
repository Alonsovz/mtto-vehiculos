import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Contratos } from 'src/app/models/contratos';
import { DetalleMtto } from 'src/app/models/detalle-mtto';
import { NSolicitud } from 'src/app/models/n-solicitud';
import { Usuario } from 'src/app/models/usuario';
import { Vehiculos } from 'src/app/models/vehiculos';
import { ContratoServiceService } from 'src/app/services/contrato-service.service';
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
  km_actuales: any;
  n_solicitud_form: FormGroup;
  tipo_mtto: any;
  lista_mttos: DetalleMtto[] = [];
  validar_lista = false;
  validar_contrato = false;
  detalle_contrato : Contratos[]  = [];
  id_solicitud: any;

  constructor(private router: Router, private vehiculo: VehiculosService,
    private soli_service: NSolicitudService,  private toastr: ToastrService, private contrato_service: ContratoServiceService) {

    this.n_solicitud_form = new FormGroup({
      'nombreSolicitante': new FormControl('',[Validators.required]),
      'departamento': new FormControl('',[Validators.required]),
      'n_contrato': new FormControl(''),
      'fecha_solicitud': new FormControl('',[Validators.required]),
      'dias_estimados': new FormControl('',[Validators.required]),
      'id_solicitante': new FormControl('',[Validators.required]),
      'id_vehiculo': new FormControl('',[Validators.required]),
      'km_sticker': new FormControl('',[Validators.required]),
      'km_actual': new FormControl('',[Validators.required]),
      'tipo_mantenimiento': new FormControl('0',[Validators.required]),
      'detalles_mtto': new FormControl('0',[Validators.required]),
      'observaciones': new FormControl('',[Validators.required]),
      'agencia': new FormControl(''),
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
       // this.id_solicitud = response;


    this.lista_mttos.forEach(function(e){
      if (typeof e === "object" ){
        e["id_solicitud"] =  response;
      }
    });
      },
      err => {
        this.toastr.error('Error','Algo salió mal :(');
      },
      () => {
        console.log(this.lista_mttos);
        this.soli_service.guardar_detalle_soli(this.lista_mttos).subscribe(
          response => {},
          err => {

          },
          () => {
            this.toastr.success('Éxito','Solicitud ingresada');
            this.router.navigate(['dashboard/admin_solicitud']);
          }
        );

      }


    );
  }


  getKmbyVehiculo(){
    let datos : NSolicitud = new NSolicitud();

    datos = this.n_solicitud_form.value;

    this.soli_service.getKmbyVehiculo(datos).subscribe(
      data => {
        this.km_actuales = data;
      });
  }


  getTipoMtto(){
    this.validar_contrato = false;
    this.lista_mttos.length = 0;

    let datos : NSolicitud = new NSolicitud();

    datos = this.n_solicitud_form.value;

    if(this.n_solicitud_form.controls["tipo_mantenimiento"].value=="Correctivo"){
      this.validar_lista = true;
    }else{
      this.validar_lista = false;
    }

    this.soli_service.getTipoMtto(datos).subscribe(
      data => {
        this.tipo_mtto = data;
      });
  }


  addDetalle(){
      let detalle : DetalleMtto = this.n_solicitud_form.value;
      this.lista_mttos.push(detalle);
  }

  eliminarDetalle(index: any){
    this.lista_mttos.splice(index, 1);
  }

  getTipoContrato(){
    var dato = this.n_solicitud_form.controls["detalles_mtto"].value;

    let datos = this.n_solicitud_form.value;
    this.detalle_contrato.length = 0;

    if(dato == "Agencia"){

     this.contrato_service.getNContratoByVehiculo(datos).subscribe(
      data=>{
        this.detalle_contrato = data;
        this.validar_contrato = true;
      }

     );

    }else{
      this.validar_contrato = false;
    }
  }
}
