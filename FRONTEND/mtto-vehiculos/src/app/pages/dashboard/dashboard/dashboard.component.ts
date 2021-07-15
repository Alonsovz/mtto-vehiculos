import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: Usuario = new Usuario();

  constructor( private router: Router, private usuarioservice : UsuarioService,
    private crf: ChangeDetectorRef) { }

  ngOnInit(): void {
    if(localStorage.getItem('usuario_mtto') !== null){

      this.user = JSON.parse(localStorage.getItem("usuario_mtto"));

  }else{
    this.router.navigate(['login']);
  }
  }


  public cerrarSesion() {

    this.usuarioservice.loggedIn.next(false);
     localStorage.clear();
     this.router.navigate(['login']);
   }

}
