import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Talleres } from 'src/app/models/talleres';
import { TalleresService } from 'src/app/services/talleres.service';

@Component({
  selector: 'app-talleres',
  templateUrl: './talleres.component.html',
  styleUrls: ['./talleres.component.css']
})
export class TalleresComponent implements OnInit {

  showData = false;
  texto: any;
  showCardAdd = false;
  showCardEdit = false;
  showLoader = true;
  tblTaller: Talleres[];
  agregarTallerForm: FormGroup;
  editarTallerForm: FormGroup;

  taller: Talleres = new Talleres();
  constructor(private taller_service: TalleresService, private toastr: ToastrService) { }

  ngOnInit(): void {
   this.showListado();




  }
  _texto:string;
  ConvertToLower(evt) {
      this.texto = evt.toLowerCase();
  }

    //metodo para mostrar listado de usuarios
    showListado(){
      this.taller_service.getTalleres().subscribe(
        data => {

          if(this.texto === '') {
            this.tblTaller = data;
          }
          this.tblTaller = data;
          this.showData = true;
          this.showCardAdd = false;
          this.showCardEdit = false;
          this.showLoader = false;
        });




    }

    //metodo para mostrar card de agregar usuario
    showCardAgregar(){
      this.agregarTallerForm = new FormGroup({
        'nombre' : new FormControl('',[Validators.required]),

      });



      this.showLoader = false;
      this.showData = false;
      this.showCardEdit = false;
      this.showCardAdd = true;
    }

    showCardEditar(edit: Talleres){

      this.editarTallerForm = new FormGroup({
        'nombre' : new FormControl('',[Validators.required]),
        'id' : new FormControl('',[Validators.required]),
      });

      this.showLoader = false;
      this.showData = false;
      this.showCardEdit = true;
      this.showCardAdd = false;

      this.taller = edit;
    }


    guardarTaller(){
      let datos : Talleres = new Talleres();

      datos = this.agregarTallerForm.value;

      this.taller_service.guardarTaller(datos).subscribe(
        response => {

        },
        err => {
          this.toastr.error('Oopss!!','Algo salió mal');
        },
        () => {

          this.toastr.success('Confirmación','Taller Creado');

          this.showListado();
          }


      );
    }

    eliminarTaller(data){

      this.taller_service.eliminarTaller(data).subscribe(
        response => {

        },
        err => {
          this.toastr.error('Oopss!!','Algo salió mal');
        },
        () => {

          this.toastr.success('Confirmación','Taller eliminado');

          this.showListado();
          }


      );

    }

    editarTaller(){
      let datos : Talleres = new Talleres();

      datos = this.editarTallerForm.value;

      this.taller_service.editarTaller(datos).subscribe(
        response => {

        },
        err => {
          this.toastr.error('Oopss!!','Algo salió mal');
        },
        () => {

          this.toastr.success('Confirmación','Taller modificado');

          this.showListado();
          }


      );
    }

}
