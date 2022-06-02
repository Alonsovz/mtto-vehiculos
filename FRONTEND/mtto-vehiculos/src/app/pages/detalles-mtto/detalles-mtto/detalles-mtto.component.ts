import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DetallesMtto } from 'src/app/models/detalles-mtto';
import { DetallesMttoService } from 'src/app/services/detalles-mtto.service';

@Component({
  selector: 'app-detalles-mtto',
  templateUrl: './detalles-mtto.component.html',
  styleUrls: ['./detalles-mtto.component.css']
})
export class DetallesMttoComponent implements OnInit {
  showData = false;
  texto: any;
  showCardAdd = false;
  showCardEdit = false;
  showLoader = true;
  agregarDetalleForm: FormGroup;
  tblDetalles: DetallesMtto[];
  datos_det : DetallesMtto = new DetallesMtto();
  editarDetalleForm : FormGroup;

  constructor(public detalle_service: DetallesMttoService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.showListado();
  }

  showListado(){
    this.detalle_service.getDetalles().subscribe(
      data => {

        if(this.texto === '') {
          this.tblDetalles = data;
        }
        this.tblDetalles = data;
        this.showData = true;
        this.showCardAdd = false;
        this.showCardEdit = false;
        this.showLoader = false;
      });




  }

  showCardAgregar(){
    this.agregarDetalleForm = new FormGroup({
      'detalle' : new FormControl('',[Validators.required]),
      'tipo' : new FormControl('0',[Validators.required]),
    });


    this.showLoader = false;
    this.showData = false;
    this.showCardEdit = false;
    this.showCardAdd = true;
  }


  _texto:string;
  ConvertToLower(evt) {
      this.texto = evt.toLowerCase();
  }


  editarDetalle(det: DetallesMtto){

    this.editarDetalleForm = new FormGroup({
      'detalle' : new FormControl('',[Validators.required]),
      'tipo' : new FormControl('',[Validators.required]),
      'id' : new FormControl('',[Validators.required]),
    });

    this.showCardEdit = true;
    this.showData = false;
    this.datos_det = det;
  }



  eliminarDetalle(det: DetallesMtto){

    let datos : DetallesMtto = new DetallesMtto();

    datos = det;

    this.detalle_service.eliminarDetalle(datos).subscribe(
      response => {

      },
      err => {
        this.toastr.error('Oopss!!','Algo salió mal');
      },
      () => {

        this.toastr.success('Confirmación','Detalle de mtto. eliminado');

        this.showListado();
      }

    );

  }


  editDetalle(){
    let datos : DetallesMtto = new DetallesMtto();

    datos = this.editarDetalleForm.value;

    this.detalle_service.editDetalle(datos).subscribe(
      response => {

      },
      err => {
        this.toastr.error('Oopss!!','Algo salió mal');
      },
      () => {

        this.toastr.success('Confirmación','Detalle de mtto. modificado');

        this.showListado();
      }

    );

  }


  guardarDetalle(){
    let datos : DetallesMtto = new DetallesMtto();

    datos = this.agregarDetalleForm.value;

    this.detalle_service.guardarDetalle(datos).subscribe(
      response => {

      },
      err => {
        this.toastr.error('Oopss!!','Algo salió mal');
      },
      () => {

        this.toastr.success('Confirmación','Detalle de mtto. guardado');

        this.showListado();
      }

    );
  }
}
