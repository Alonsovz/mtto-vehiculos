import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminSolicitud } from 'src/app/models/admin-solicitud';
import { NSolicitud } from 'src/app/models/n-solicitud';
import { Usuario } from 'src/app/models/usuario';
import { Vehiculos } from 'src/app/models/vehiculos';
import { AdminSolicitudService } from 'src/app/services/admin-solicitud.service';
import { VehiculosService } from 'src/app/services/vehiculos.service';

@Component({
  selector: 'app-admin-solicitud',
  templateUrl: './admin-solicitud.component.html',
  styleUrls: ['./admin-solicitud.component.css']
})
export class AdminSolicitudComponent implements OnInit {
  user: Usuario = new Usuario();
  texto: any;
  objSoli_ingresadas: AdminSolicitud[];
  objSoli_AproJefe: AdminSolicitud[];
  objSoli_AproMtto: AdminSolicitud[];
  objSoli_Fin: AdminSolicitud[];

  showIng = false;
  showApJ = false;
  showApM = false;
  showFin = false;
  objMisSoli_ingresadas: AdminSolicitud[];
  objMisSoli_AproJefe: AdminSolicitud[];
  objMisSoli_AproMtto: AdminSolicitud[];
  objMisSoli_Fin: AdminSolicitud[];

  n_solicitud_form: FormGroup;
  objVehiculos: Vehiculos[];
  datos_solicitud : NSolicitud = new NSolicitud();
  datos_mod_solicitud: NSolicitud[] = []
  isModalActive = false;
  conteoAdmin : any;
  conteoUser : any;
  constructor(private router: Router,private crf: ChangeDetectorRef,private vehiculo: VehiculosService,
    private soliService: AdminSolicitudService, private toastr: ToastrService) {
      this.n_solicitud_form = new FormGroup({
        'nombreSolicitante': new FormControl('',[Validators.required]),
        'departamento': new FormControl('',[Validators.required]),

        'fecha_solicitud': new FormControl('',[Validators.required]),
        'dias_estimados': new FormControl('',[Validators.required]),
        'id_solicitante': new FormControl('',[Validators.required]),
        'id_vehiculo': new FormControl('',[Validators.required]),
        'km_sticker': new FormControl('',[Validators.required]),
        'km_actual': new FormControl('',[Validators.required]),
        'tipo_mantenimiento': new FormControl('',[Validators.required]),
        'observaciones': new FormControl('',[Validators.required]),
        'observaciones_finales': new FormControl('',[Validators.required]),
        'aprobacion_jefatura': new FormControl('',[Validators.required]),
        'aprobacion_mtto': new FormControl('',[Validators.required]),
        'fecha_aprob_jefe_format': new FormControl('',[Validators.required]),
        'fecha_aprob_mtto_format': new FormControl('',[Validators.required]),
        'fecha_finalizacion_format': new FormControl('',[Validators.required]),
        'usuario_finalizacion': new FormControl('',[Validators.required]),
      });
    }

  ngOnInit(): void {
    if(localStorage.getItem('usuario_mtto') !== null){

      this.user = JSON.parse(localStorage.getItem("usuario_mtto"));

      if(this.user.rol === 'Solicitante'){
        this.getMisSoli_ing();
        this.getConteoUser();
      }else{
        this.getSoli_ing();
        this.getConteoAdmin();
      }

      this.vehiculo.getVehiculos().subscribe(
        data => {
          this.objVehiculos = data;
        });
  }else{
    this.router.navigate(['login']);
  }

  }


  public getConteoAdmin(){
    this.soliService.getConteoAdmin().subscribe(
      data => {
        this.conteoAdmin = data;
      }
    );
  }

  public getConteoUser(){

    let datos : Usuario = new Usuario();
    datos = this.user;

    this.soliService.getConteoUser(datos).subscribe(
      data => {
        this.conteoUser = data;
      }
    );
  }


//función para obtener desde el servicio el listado de solicitudes con estado "Ingresada"
  getSoli_ing(){
    this.showIng = false;
  this.soliService.getSolicitudes_Ing().subscribe(
    data => {
      if(this.texto === '') {
        this.objSoli_ingresadas = data;

        this.showIng = true;
      }
      this.objSoli_ingresadas = data;

      this.showIng = true;
    });
  }
  //función para obtener desde el servicio el listado de solicitudes con estado "getSolicitudes_AproJefe"
  getSoli_Aprojefe(){
    this.showApJ = false;
    this.soliService.getSolicitudes_AproJefe().subscribe(
     data => {
       if(this.texto === '') {
         this.objSoli_AproJefe = data;
       }
       this.objSoli_AproJefe = data;

       this.showApJ = true;
     });
  }
  //función para obtener desde el servicio el listado de solicitudes con estado "aprobadas por encargado de mtto"
  getSoli_AproMtto(){
    this.showApM = false;
    this.soliService.getSolicitudes_AproMtto().subscribe(
     data => {
       if(this.texto === '') {
         this.objSoli_AproMtto = data;

        this.showApM = true;
       }
       this.objSoli_AproMtto = data;

       this.showApM = true;
     });
  }

  //función para obtener desde el servicio el listado de solicitudes con estado "finalizadas"
  getSoli_Fin(){
    this.showFin = false;

    this.soliService.getSolicitudes_Fin().subscribe(
     data => {
       if(this.texto === '') {
         this.objSoli_Fin = data;

         this.showFin = true;
       }
       this.objSoli_Fin = data;

       this.showFin = true;
     });
  }

  //eventos de tabs para administrador
  openTab(evt, tabName) {
    var i, x, tablinks;
    x = document.getElementsByClassName("content-tab");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tab");
    for (i = 0; i < x.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" is-active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " is-active";

    if(tabName === "ingresadas"){
      this.getSoli_ing();
    }else if(tabName === "aprob_jefe"){
      this.getSoli_Aprojefe();
    }else if(tabName === "aprob_mtto"){
      this.getSoli_AproMtto();
    }
    else if(tabName === "finalizadas"){
      this.getSoli_Fin();
    }
  }

  //eventos de tabs para solicitante
  openTab_mis(evt, tabName) {
    var i, x, tablinks;
    x = document.getElementsByClassName("content-tab-mis");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tab-mis");
    for (i = 0; i < x.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" is-active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " is-active";

    if(tabName === "mis_ingresadas"){
      this.getMisSoli_ing();
    }else if(tabName === "mis_aprob_jefe"){
      this.getMisSolicitudes_AproJefe();
    }else if(tabName === "mis_aprob_mtto"){
      this.getMisSolicitudes_AproMtto();
    }
    else if(tabName === "mis_finalizadas"){
      this.getMisSolicitudes_Fin();
    }

  }


  getMisSoli_ing(){
    let datos : Usuario = new Usuario();
    datos = this.user;

    this.showIng = false;

    this.soliService.getMisSolicitudes_Ing(datos).subscribe(
      data => {
        if(this.texto === '') {
          this.objMisSoli_ingresadas = data;

          this.showIng = true;
        }
        this.objMisSoli_ingresadas = data;

        this.showIng = true;
      });
  }

  getMisSolicitudes_AproJefe(){
    let datos : Usuario = new Usuario();
    datos = this.user;

    this.showIng = false;

    this.soliService.getMisSolicitudes_AproJefe(datos).subscribe(
      data => {
        if(this.texto === '') {
          this.objMisSoli_AproJefe = data;

          this.showIng = true;
        }
        this.objMisSoli_AproJefe = data;

        this.showIng = true;
      });
  }


  getMisSolicitudes_AproMtto(){
    let datos : Usuario = new Usuario();
    datos = this.user;

    this.showIng = false;

    this.soliService.getMisSolicitudes_AproMtto(datos).subscribe(
      data => {
        if(this.texto === '') {
          this.objMisSoli_AproMtto = data;

          this.showIng = true;
        }
        this.objMisSoli_AproMtto = data;

        this.showIng = true;
      });
  }

  getMisSolicitudes_Fin(){
    let datos : Usuario = new Usuario();
    datos = this.user;

    this.showIng = false;

    this.soliService.getMisSolicitudes_Fin(datos).subscribe(
      data => {
        if(this.texto === '') {
          this.objMisSoli_Fin = data;

          this.showIng = true;
        }
        this.objMisSoli_Fin = data;

        this.showIng = true;
      });
  }


  verDetalleSoli(solicitud: NSolicitud){

    var modalDlg = document.querySelector('#modalSolicitud');
    modalDlg.classList.add('is-active');

    this.datos_solicitud = solicitud;
  }

  showListadoMis(){
    var modalDlg = document.querySelector('#modalSolicitud');
    modalDlg.classList.remove('is-active');
    this.getMisSoli_ing();
    this.getMisSolicitudes_AproJefe();
    this.getMisSolicitudes_AproMtto();
    this.getMisSolicitudes_Fin();
  }

  showListadoAdmin(){
    var modalDlg = document.querySelector('#modalSolicitud');
    modalDlg.classList.remove('is-active');

    this.getSoli_ing();
    this.getSoli_Aprojefe();
    this.getSoli_AproMtto();
    this.getSoli_Fin();
  }


  aprobarSolicitudJefe(){

    let datos: NSolicitud = new NSolicitud();

    datos.id = this.datos_solicitud.id;
    datos.aprobacion_jefatura = this.user.alias;

    console.log(datos);
    this.soliService.aprobarSolicitudJefe(datos).subscribe(
      response => {
      },
      err => {
        this.toastr.error('Error','Error al guardar datos');
      },
      () => {
          this.toastr.success('Éxito','Solicitud aprobada con éxito');
      },
    );

  }


  aprobarSolicitudMtto(){

    let datos: NSolicitud = new NSolicitud();

    datos.id = this.datos_solicitud.id;
    datos.aprobacion_mtto = this.user.alias;

    console.log(datos);
    this.soliService.aprobarSolicitudMtto(datos).subscribe(
      response => {
      },
      err => {
        this.toastr.error('Error','Error al guardar datos');
      },
      () => {
          this.toastr.success('Éxito','Solicitud aprobada con éxito');
      },
    );

  }



  finalizarSolicitud(){

    let datos: NSolicitud = new NSolicitud();

    datos.id = this.datos_solicitud.id;
    datos.observaciones_finales = this.n_solicitud_form.controls["observaciones_finales"].value;
    datos.usuario_finalizacion = this.user.alias;

    console.log(datos);
    this.soliService.finalizarSolicitud(datos).subscribe(
      response => {
      },
      err => {
        this.toastr.error('Error','Error al guardar datos');
      },
      () => {
          this.toastr.success('Éxito','Solicitud aprobada con éxito');
      },
    );

  }


}