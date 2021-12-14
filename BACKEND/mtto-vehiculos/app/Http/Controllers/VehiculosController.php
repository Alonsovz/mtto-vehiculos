<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use DB;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Response as FacadeResponse;
use Session;


date_default_timezone_set("America/El_Salvador");
class VehiculosController extends Controller
{
    //metodo para obtener listado de vehiculos para mostrar en tabla de vista de vehiculos
    public function getVehiculos(){
        $vehiculos = 
        DB::connection('comanda')->select("select vv.*, u.nombre +' '+u.apellido  as dueno 
        from vh_vehiculos vv 
        inner JOIN users u on u.id = vv.dueño 
        order by 2	desc
        ");

        return response()->json($vehiculos);
    }
}


?>