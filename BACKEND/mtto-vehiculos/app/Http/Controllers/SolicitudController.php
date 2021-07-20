<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use DB;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Response as FacadeResponse;
use Session;


date_default_timezone_set("America/El_Salvador");
class SolicitudController extends Controller
{

       //metodo para insertar nueva solicitud
       public function guardar_solicitud(Request $request){
        $fecha_solicitud  = $request["fecha_solicitud"];
        $dias_estimados   = $request["dias_estimados"];
        $id_solicitante   = $request["id_solicitante"];
        $id_vehiculo   = $request["id_vehiculo"];
        $km_sticker  = $request["km_sticker"];
        $km_actual   = $request["km_actual"];
        $tipo_mantemiento  = $request["tipo_mantemiento"];
        $observaciones  = $request["observaciones"];

        if(is_null($fecha_solicitud)){
            $fechaSolicitud = null;
        }else{
            $fechaSoli1 = date_create_from_format('Y-m-d',$fecha_solicitud);

            $fechaSolicitud = date_format($fechaSoli1,'Ymd H:i:s');
        }
        


        $insertar =  DB::connection('comanda')->table('mtto_vh_solictud')
        ->insert([
            'fecha_solicitud' => $fechaSolicitud,
            'dias_estimados' => $dias_estimados,
            'id_solicitante' => $id_solicitante,
            'id_vehiculo' => $id_vehiculo,
            'km_sticker' => $km_sticker,
            'km_actual' => $km_actual,
            'tipo_mantemiento' => $tipo_mantemiento,
            'observaciones' => $observaciones,
            'estado' => 1,
            'idEliminado' => 1,
        ]);

        return response()->json($insertar);
    }


}


?>