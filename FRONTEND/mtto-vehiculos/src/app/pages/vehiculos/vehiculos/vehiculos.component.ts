import { Component, OnInit } from '@angular/core';
import { Vehiculos } from 'src/app/models/vehiculos';
import { VehiculosService } from 'src/app/services/vehiculos.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario';

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

  constructor(private vehiculo: VehiculosService, private toastr: ToastrService,private usuario: UsuarioService) {
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

}
