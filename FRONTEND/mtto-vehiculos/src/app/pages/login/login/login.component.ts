import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  validateForm : FormGroup;
  passwordVisible = false;
  progressBar = false;
  submitted = false;
  usuariosesion: Usuario = new Usuario();

  constructor(private usuarioservice: UsuarioService, private toastr: ToastrService, private router: Router) {
    this.validateForm = new FormGroup({
      'correo' : new FormControl(''),
      'password' : new FormControl(''),

    });
   }

  ngOnInit(): void {
  }

  validarCredenciales(){
    this.progressBar = true;
    let datosUsuario : Usuario = new Usuario();
    datosUsuario = this.validateForm.value;
    this.usuarioservice.login(datosUsuario).subscribe(
      response => {
        this.usuariosesion = response;
        localStorage.setItem('usuario_mtto', JSON.stringify(this.usuariosesion));
      },
      err => {
      },
      () => {
        let obj = this.usuariosesion;
        if( Object.keys(obj).length === 0){
          this.toastr.error('Error','Credenciales inválidas');
        }else{
          this.toastr.success('Éxito','Inicio de sesión correcto');
          this.router.navigate(['dashboard/template']);
        }
      },
    );

  }


  onSubmit() {
    this.submitted = true;

  }



}
