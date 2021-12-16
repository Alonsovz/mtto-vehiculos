<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use DB;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Response as FacadeResponse;
use Session;


date_default_timezone_set("America/El_Salvador");
class ContratosController extends Controller
{
    //metodo para obtener listado de vehiculos para mostrar en tabla de vista de vehiculos
    public function getContratos(){
        $getContratos = 
        DB::connection('comanda')->select("SELECT mcv.*, vv.numeracion  as vehiculo from mtto_contratos_vehiculos mcv 
        inner join vh_vehiculos vv on vv.id = mcv.vehiculo_id 
        order by mcv.estado_contrato asc");

        return response()->json($getContratos);
    }

    
    public function guardarContrato(Request $request){
       

        $insertar =  DB::connection('comanda')->table('mtto_contratos_vehiculos')
        ->insert([
            'n_contrato' => $request["n_contrato"],
            'nombre_agencia' => $request["agencia"],
            'vehiculo_id' => $request["id_vehiculo"],
            'rango_km_inicio' => $request["km_inicial"],
            'rango_km_fin' => $request["km_final"],
            'serv_restantes' => $request["cant_servs"],
            'estado_contrato' => "Activo",
        ]);

        return response()->json($insertar);
    }


    public function eliminarContrato(Request $request){
        $id = $request["id"];

        $editar = DB::connection('comanda')->table('mtto_contratos_vehiculos')->where('id', $id)
        ->update(['estado_contrato' => "Eliminado" , 
        ]);

        return response()->json($editar);
    }


    public function getNContratoByVehiculo(Request $request){
        $getContratos = 
        DB::connection('comanda')->select("SELECT * from mtto_contratos_vehiculos  where vehiculo_id = ".$request["id_vehiculo"]."
        and estado_contrato = 'Activo' ");

        return response()->json($getContratos);
    }
}


?>