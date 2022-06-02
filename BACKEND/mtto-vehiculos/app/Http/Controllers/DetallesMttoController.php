<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use DB;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Response as FacadeResponse;
use Session;


date_default_timezone_set("America/El_Salvador");
class DetallesMttoController extends Controller
{

    public function getDetalles(){
        $getDetalles = 
        DB::connection('comanda')->select("select * from mtto_vh_tipos_mtto where estado = 1 order by 3 desc
        ");

        return response()->json($getDetalles);
    }


    public function editDetalle(Request $request){
        

        $editar = DB::connection('comanda')->table('mtto_vh_tipos_mtto')->where('id', $request["id"])
        ->update([
            'nombre' => $request["detalle"] , 
            'mtto' => $request["tipo"] , 
        ]);

        return response()->json($editar);
    }


    public function eliminarDetalle(Request $request){
        

        $editar = DB::connection('comanda')->table('mtto_vh_tipos_mtto')->where('id', $request["id"])
        ->update([
            'estado' => 2, 
        ]);

        return response()->json($editar);
    }

    public function guardarDetalle(Request $request){
       

        $insertar =  DB::connection('comanda')->table('mtto_vh_tipos_mtto')
        ->insert([
            'nombre' => $request["detalle"],
            'mtto' => $request["tipo"],
            'estado' => 1,
        ]);

        return response()->json($insertar);
    }


    public function getDetallesServFrec(){
        $getDetalles = 
        DB::connection('comanda')->select("select * from mtto_vh_tipos_mtto where estado = 1 and mtto='Serv. Frecuente' order by 3 desc
        ");

        return response()->json($getDetalles);
    }


    public function guardarServicioFrecuente(Request $request){
        
        $mes =  $request["mes"];
        $anio =  $request["anio"];
        $anioLimite =  $request["anio"]+1;
        $id_vehiculo =  $request["id_vehiculo"];
        $precio = $request["precio"];
        $usuario =  $request["usuario"];
        $servicio = $request["servicio"];


        if($servicio == 'Refrenda Anual'){
            $insertar =  DB::connection('comanda')->table('mtto_detalle_mtto')
            ->insert([
                'detalle_realizado' => $servicio,
                'precio' => $precio,
                'id_vehiculo' => $id_vehiculo,
                'periodo' => $mes.$anio,
                'usuario_creacion'=> $usuario
            ]);

            return response()->json($insertar);
        }else{
            $execProcedure =  DB::connection('comanda')->statement(
                "exec  [dbo].[sp_mtto_calculo_servfrecuentes] 
                '".$mes."','".$anio."','".$anioLimite."', ".$id_vehiculo.", ".$precio.", '".$usuario."', '".$servicio."' ");
        
                return response()->json($execProcedure);

        }
      
    }

    public function getServicioFrecuentes(Request $request){
        $getDetalles = 
        DB::connection('comanda')->select("select *, case when detalle_realizado like '%Seguro%'
        then 
        'Seguro'
        when detalle_realizado like '%GPS%'
        then 
        'GPS'
        
        when detalle_realizado like '%Refrenda%'
        then 
        'Refrenda'
        end as servicio,
        '$' + str(precio, 12, 2) as costo,
		CONVERT(varchar, fecha_creacion, 103) as fecha
        from mtto_detalle_mtto where id_vehiculo = ".$request["id"]." order by 1 desc
        ");

        return response()->json($getDetalles);
    }


    public function addDetalleMtto(Request $request){
      


            $insertar =  DB::connection('comanda')->table('mtto_detalle_mtto')
            ->insert([
                'id_solicitud' => $request["solicitud"],
                'detalle_realizado' => $request["detalles_mtto"],
                'precio' => $request["precio_mtto"],
            ]);
        
       

        return response()->json($insertar);
    }
}



?>