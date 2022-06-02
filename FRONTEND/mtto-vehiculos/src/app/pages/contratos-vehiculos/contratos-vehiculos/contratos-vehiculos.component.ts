import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Contratos } from 'src/app/models/contratos';
import { Talleres } from 'src/app/models/talleres';
import { Vehiculos } from 'src/app/models/vehiculos';
import { ContratoServiceService } from 'src/app/services/contrato-service.service';
import { TalleresService } from 'src/app/services/talleres.service';
import { VehiculosService } from 'src/app/services/vehiculos.service';

@Component({
  selector: 'app-contratos-vehiculos',
  templateUrl: './contratos-vehiculos.component.html',
  styleUrls: ['./contratos-vehiculos.component.css']
})
export class ContratosVehiculosComponent implements OnInit {
  showData = false;
  texto: any;
  showCardAdd = false;
  showCardEdit = false;
  showLoader = true;
  tblContratos: Contratos[];
  objVehiculos: Vehiculos[];
  agregarContratoForm: FormGroup;
  editarContratoForm: FormGroup;
  detalle_vh: Vehiculos[] = [];
  detalle_contrato: Contratos = new Contratos();
  tblTaller: Talleres[];

  constructor(private contrato_service: ContratoServiceService, private toastr: ToastrService,
    private vehiculo: VehiculosService, private taller_service: TalleresService) {
      this.editarContratoForm = new FormGroup({
        'id' : new FormControl('',[Validators.required]),
        'id_vehiculo' : new FormControl('',[Validators.required]),
        'n_contrato' : new FormControl('',[Validators.required]),
        'agencia' : new FormControl('',[Validators.required]),
        'cant_servs' : new FormControl('',[Validators.required]),
        'km_inicial' : new FormControl('',[Validators.required]),
        'km_final' : new FormControl('',[Validators.required]),
      });
     }

  ngOnInit(): void {
   this.showListado();


  this.vehiculo.getVehiculos().subscribe(
    data => {
      this.objVehiculos = data;
    });


    this.taller_service.getTalleres().subscribe(
      data => {
        this.tblTaller = data;
      });

  }
  _texto:string;
  ConvertToLower(evt) {
      this.texto = evt.toLowerCase();
  }

    //metodo para mostrar listado de usuarios
    showListado(){
      this.contrato_service.getContratos().subscribe(
        data => {

          if(this.texto === '') {
            this.tblContratos = data;
          }
          this.tblContratos = data;
          this.showData = true;
          this.showCardAdd = false;
          this.showCardEdit = false;
          this.showLoader = false;
        });

    }

    //metodo para mostrar card de agregar usuario
    showCardAgregar(){
      this.agregarContratoForm = new FormGroup({
        'id_vehiculo' : new FormControl('0',[Validators.required]),
        'n_contrato' : new FormControl('',[Validators.required]),
        'agencia' : new FormControl('0',[Validators.required]),
        'cant_servs' : new FormControl('',[Validators.required]),
        'km_inicial' : new FormControl('',[Validators.required]),
        'km_final' : new FormControl('',[Validators.required]),
      });
      this.vehiculo.getVehiculos().subscribe(
        data => {
          this.objVehiculos = data;
        });


      this.showLoader = false;
      this.showData = false;
      this.showCardEdit = false;
      this.showCardAdd = true;
    }


    guardarContrato(){
      let datos : Contratos = new Contratos();

      datos = this.agregarContratoForm.value;

      this.contrato_service.guardarContrato(datos).subscribe(
        response => {

        },
        err => {
          this.toastr.error('Oopss!!','Algo salió mal');
        },
        () => {

          this.toastr.success('Confirmación','Contrato Creado');

          this.showListado();
          }


      );
    }

    eliminarContrato(data){

      this.contrato_service.eliminarContrato(data).subscribe(
        response => {

        },
        err => {
          this.toastr.error('Oopss!!','Algo salió mal');
        },
        () => {

          this.toastr.success('Confirmación','Contrato eliminado');

          this.showListado();
          }


      );

    }


    getDetallesVh(){
      let datos : Vehiculos = new Vehiculos();

      datos = this.agregarContratoForm.value;

      this.contrato_service.getDetallesVh(datos)
        .subscribe(
          response =>{
            this.detalle_vh = response;
          },
          err =>{

          },
          ()=>{

          }
        );


    }



    //metodo para mostrar card de editar
    showCardEditar(obj){


      this.detalle_contrato = obj;

      console.log(this.detalle_contrato);


      this.vehiculo.getVehiculos().subscribe(
        data => {
          this.objVehiculos = data;
        });


      this.showLoader = false;
      this.showData = false;
      this.showCardEdit = true;
      this.showCardAdd = false;
    }


    editarContrato(){
      let datos : Contratos = new Contratos();

      datos = this.editarContratoForm.value;

      this.contrato_service.editarContrato(datos).subscribe(
        response => {

        },
        err => {
          this.toastr.error('Oopss!!','Algo salió mal');
        },
        () => {

          this.toastr.success('Confirmación','Contrato editado');

          this.showListado();
          }


      );
    }
}
