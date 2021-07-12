import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { PageSettingsModel } from '@syncfusion/ej2-grids';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  p: number = 1;
  texto: any;
  objUsuarios: Usuario[];
  public pageSettings: PageSettingsModel = {pageSize: 5};
  public customAttributes: object;
  constructor(private usuario: UsuarioService) { }

  ngOnInit(): void {
    this.customAttributes = {class: 'customcss'};
    //suscription to get users array for table shown in html template
    this.usuario.getUsuariosTbl().subscribe(
      data => {
        this.objUsuarios = data;
      });
  }


}
