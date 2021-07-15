import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Rol } from 'src/app/models/rol';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  p: number = 1;
  texto: any;
  showLoader = true;
  showData = false;
  showCardAdd = false;
  showCardEdit = false;

  objUsuarios: Usuario[];
  listUsuarios: Usuario[];
  listRoles : Rol[];
  agregarUsuarioForm : FormGroup;
  editarUsuarioForm : FormGroup;
  userEdit: Usuario = new Usuario();


  constructor(private usuario: UsuarioService, private toastr: ToastrService) {
    this.agregarUsuarioForm = new FormGroup({
      'usuario' : new FormControl('',[Validators.required]),
      'rol' : new FormControl('',[Validators.required]),

    });

    this.editarUsuarioForm = new FormGroup({
      'idUsuarioRol': new FormControl('',[Validators.required]),
      'nombre' : new FormControl('',[Validators.required]),
      'idRol' : new FormControl('',[Validators.required]),

    });
  }

  ngOnInit(): void {
    this.usuario.getRoles().subscribe(data => {this.listRoles = data;});


    //suscription to get users array for table shown in html template
    this.usuario.getUsuariosTbl().subscribe(
      data => {
        if(this.texto === '') {
          this.objUsuarios = data;
        }
        this.objUsuarios = data;
        this.showLoader = false;
        this.showData = true;
      });
  }

  _texto:string;
  ConvertToLower(evt) {
      this.texto = evt.toLowerCase();
  }

  //metodo para mostrar listado de usuarios
  showListado(){
    this.showData = true;
    this.showCardAdd = false;
    this.showCardEdit = false;
  }

  //metodo para mostrar card de agregar usuario
  showCardAgregar(){
    this.agregarUsuarioForm = new FormGroup({
      'usuario' : new FormControl('',[Validators.required]),
      'rol' : new FormControl('',[Validators.required]),

    });
    this.usuario.getUsuarios().subscribe(data => {this.listUsuarios = data;});



    this.showLoader = false;
    this.showData = false;
    this.showCardEdit = false;
    this.showCardAdd = true;
  }


  //metodo para guardar usuario

  guardarUsuario(){
    let datosUsuario : Usuario = new Usuario();

    datosUsuario = this.agregarUsuarioForm.value;

    this.usuario.guardarUsuario(datosUsuario).subscribe(
      response => {

      },
      err => {
        this.toastr.error('Oopss!!','Algo salió mal');
      },
      () => {

        this.toastr.success('Confirmación','Usuario guardado');
        this.usuario.getUsuariosTbl().subscribe(
          data => {
            if(this.texto === '') {
              this.objUsuarios = data;
            }
            this.objUsuarios = data;
            this.showLoader = false;
            this.showData = true;
          });
        this.showListado();
        }


    );
  }

//metodo para mostrar card de editar usuario
  showCardEditar(user){
    this.showCardEdit = true;
    this.showData = false;
    this.userEdit = user;
  }

  //metodo para guardar edición de usuario
  editarUsuario(){
    let datosUsuario : Usuario = new Usuario();

    datosUsuario = this.editarUsuarioForm.value;

    this.usuario.editarUsuario(datosUsuario).subscribe(
      response => {

      },
      err => {
        this.toastr.error('Oopss!!','Algo salió mal');
      },
      () => {

        this.toastr.success('Confirmación','Usuario modificado');
        this.usuario.getUsuariosTbl().subscribe(
          data => {
            if(this.texto === '') {
              this.objUsuarios = data;
            }
            this.objUsuarios = data;
            this.showLoader = false;
            this.showData = true;
          });
        this.showListado();
        }



    );
  }

//metodo para eliminar usuarios
  eliminarUsuario(usuario){

    this.usuario.eliminarUsuario(usuario).subscribe(
      response => {

      },
      err => {
        this.toastr.error('Oopss!!','Algo salió mal');
      },
      () => {

        this.toastr.success('Confirmación','Usuario eliminado');
        this.usuario.getUsuariosTbl().subscribe(
          data => {
            if(this.texto === '') {
              this.objUsuarios = data;
            }
            this.objUsuarios = data;
            this.showLoader = false;
            this.showData = true;
          });
        this.showListado();
        }


    );

  }





}
