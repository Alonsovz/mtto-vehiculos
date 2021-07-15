import { Component, OnInit } from '@angular/core';
import { Vehiculos } from 'src/app/models/vehiculos';
import { VehiculosService } from 'src/app/services/vehiculos.service';
import { ToastrService } from 'ngx-toastr';

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

  tblVehiculos: Vehiculos[];

  constructor(private vehiculo: VehiculosService, private toastr: ToastrService) { }

  ngOnInit(): void {
    //suscription to get vehicules array for table shown in html template
    this.vehiculo.getVehiculos().subscribe(
      data => {

        if(this.texto === '') {
          this.tblVehiculos = data;
        }
        this.tblVehiculos = data;
        console.log(this.tblVehiculos);
        this.showLoader = false;
        this.showData = true;
      });

      //console.log(this.objVehiculos);
  }


  _texto:string;
  ConvertToLower(evt) {
      this.texto = evt.toLowerCase();
  }

}
