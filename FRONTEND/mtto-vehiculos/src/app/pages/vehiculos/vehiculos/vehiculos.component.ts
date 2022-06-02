import { Component, OnInit } from '@angular/core';
import { Vehiculos } from 'src/app/models/vehiculos';
import { VehiculosService } from 'src/app/services/vehiculos.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario';
import { DetallesMttoService } from 'src/app/services/detalles-mtto.service';
import { DetallesMtto } from 'src/app/models/detalles-mtto';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.css']
})
export class VehiculosComponent implements OnInit {
  texto: any;
  showLoader = true;
  showData = false;
  showCardAdd = false;
  showCardEdit = false;
  listUsuarios: Usuario[];
  tblVehiculos: Vehiculos[];
  frm_vehiculo: FormGroup;
  datos_vehiculo: Vehiculos = new Vehiculos();
  showListaVh = false;
  showAddSFVh = false;
  agregarServFrecForm : FormGroup;
  obj_servFrec: DetallesMtto[];
  datosVh: Vehiculos = new Vehiculos();
  user: Usuario = new Usuario();
  detalle_servicios_seguro : DetallesMtto[] = [];
  detalle_servicios_gps : DetallesMtto[] = [];
  detalle_servicios_refrenda : DetallesMtto[] = [];

  constructor(private vehiculo: VehiculosService, private toastr: ToastrService,private usuario: UsuarioService,
    private detalle_service: DetallesMttoService) {
  this.frm_vehiculo = new FormGroup({
        'id' : new FormControl('',[Validators.required]),
        'numeracion' : new FormControl('',[Validators.required]),
        'placa' : new FormControl(''),
        'usuario' : new FormControl('',[Validators.required]),
        'marca' : new FormControl('',[Validators.required]),
        'modelo' : new FormControl('',[Validators.required]),
        'anio' : new FormControl('',[Validators.required]),
        'taller' : new FormControl('',[Validators.required]),
      });


  }

  ngOnInit(): void {
    this.showListado();
    this.usuario.getUsuariosVh().subscribe(data => {this.listUsuarios = data;});

    this.detalle_service.getDetallesServFrec().subscribe(
      data => {
        this.obj_servFrec = data;
      });

      this.user = JSON.parse(localStorage.getItem("usuario_mtto"));
  }

  showListado(){
    this.vehiculo.getVehiculos().subscribe(
      data => {

        if(this.texto === '') {
          this.tblVehiculos = data;
        }
        this.tblVehiculos = data;
        this.showLoader = false;
        this.showData = true;
        this.showCardEdit = false;
      });
  }


  _texto:string;
  ConvertToLower(evt) {
      this.texto = evt.toLowerCase();
  }

  editarVehiculo(datos){
    this.showCardEdit = true;
    this.showData = false;
    this.datos_vehiculo = datos;
  }

  guardarEdicion(){
    let datos : Vehiculos = new Vehiculos();

    datos = this.frm_vehiculo.value;

    this.vehiculo.editarVehiculo(datos).subscribe(
      response => {

      },
      err => {
        this.toastr.error('Oopss!!','Algo salió mal');
      },
      () => {

        this.toastr.success('Confirmación','Vehículo modificado');

        this.showListado();
      }

    );
  }


  cerrarmodalServicioFrec(){
    var modalDlg = document.querySelector('#modalServicioFrec');
    modalDlg.classList.remove('is-active');
  }


  openModalServicioFrec(datos: any){
    this.detalle_servicios_seguro = [];
    this.detalle_servicios_gps = [];
    this.detalle_servicios_refrenda = [];


      this.datosVh = datos;

      this.agregarServFrecForm = new FormGroup({
        'id_vehiculo' : new FormControl('',[Validators.required]),
        'servicio' : new FormControl('0',[Validators.required]),
        'precio' : new FormControl('',[Validators.required]),
        'vehiculo': new FormControl(''),
        'placa': new FormControl(''),
        'marca': new FormControl(''),
        'modelo': new FormControl(''),
        'usuario': new FormControl('',[Validators.required]),
        'mes': new FormControl('0',[Validators.required]),
        'anio': new FormControl('0',[Validators.required]),

      });

      document.getElementById("tab1").classList.add('is-active');
      document.getElementById("tab2").classList.remove('is-active');


      let vehiculo: Vehiculos = new Vehiculos();
      vehiculo = datos;

      this.detalle_service.getServicioFrecuentes(vehiculo).subscribe(
        response => {


          response.forEach((element: any) => {
            if(element["servicio"]==='Seguro'){
              this.detalle_servicios_seguro.push(element);

            }
          });


          response.forEach((element: any) => {
            if(element["servicio"]==='GPS'){
              this.detalle_servicios_gps.push(element);

            }
          });


          response.forEach((element: any) => {
            if(element["servicio"]==='Refrenda'){
              this.detalle_servicios_refrenda.push(element);

            }
          });

        },
        err => { this.toastr.error('Oopss!!','Algo salió mal');},
        () => {
        }
      );


      var modalDlg = document.querySelector('#modalServicioFrec');
      modalDlg.classList.add('is-active');
      this.showListaVh = true;
      this.showAddSFVh = false;
  }

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

    if(tabName == 'lista'){
      this.showListaVh = true;
      this.showAddSFVh = false;
    }else{
      this.showAddSFVh = true;
      this.showListaVh = false;
    }

  }


  crearServicioFrecuente(){
      let datos : DetallesMtto = new DetallesMtto();
      datos = this.agregarServFrecForm.value;
      this.detalle_service.guardarServicioFrecuente(datos).subscribe(
        response => {},
        err => { this.toastr.error('Oopss!!','Algo salió mal');},
        () => {
          this.toastr.success('Confirmación','Servicio creado');
          this.cerrarmodalServicioFrec();
          this.showListado();
        }

      );
  }


}
