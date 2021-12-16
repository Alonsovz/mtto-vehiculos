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
        $tipo_mantenimiento  = $request["tipo_mantenimiento"];
        $observaciones  = $request["observaciones"];
        $n_contrato  = $request["n_contrato"];
        if(is_null($fecha_solicitud)){
            $fechaSolicitud = null;
        }else{
            $fechaSoli1 = date_create_from_format('Y-m-d',$fecha_solicitud);

            $fechaSolicitud = date_format($fechaSoli1,'Ymd H:i:s');
        }
        


        $insertar =  DB::connection('comanda')->table('mtto_vh_solicitud')
        ->insertGetId([
            'fecha_solicitud' => $fechaSolicitud,
            'dias_estimados' => $dias_estimados,
            'id_solicitante' => $id_solicitante,
            'id_vehiculo' => $id_vehiculo,
            'km_sticker' => $km_sticker,
            'km_actual' => $km_actual,
            'tipo_mantenimiento' => $tipo_mantenimiento,
            'observaciones' => $observaciones,
            'estado' => 1,
            'idEliminado' => 1,
            'n_contrato' => $n_contrato,
        ]);

        return response()->json($insertar);
    }


    public function guardar_detalle_soli(Request $request){
        $json = json_encode($request->all());

        $det = json_decode($json);
        
        $insertar = '';

        foreach($det as $dt){
            $insertar =  DB::connection('comanda')->table('mtto_detalle_mtto')
            ->insertGetId([
                'id_solicitud' => $dt->id_solicitud,
                'detalle_realizado' => $dt->detalles_mtto,
            ]);
        }
       

        return response()->json($insertar);
    }


    public function get_detalle_soli(Request $request){
        $solicitudes = DB::connection('comanda')->select("SELECT *,
        str(precio,12,2) as precio_format from mtto_detalle_mtto where id_solicitud = ".$request["id"]."");

        return response()->json($solicitudes);
    }

    //metodo para obtener arreglo  de solicitudes ingresadas
    public function getSolicitudes_Ing(Request $request){
        $solicitudes = DB::connection('comanda')->select("SELECT mvs.*, u.alias as solicitante, u.jefe_inmediato as jefe,
         de.nombre as area,
        mves.estado as soli_estado,vv.numeracion as vehiculo, 
        CONCAT(convert(varchar, mvs.fecha_solicitud , 103), ' ',
        substring(convert(varchar,mvs.fecha_solicitud , 114),1,5))
         as fechaSolicitud, convert(varchar, mvs.fecha_solicitud , 23) as fechaSoli,
         CONCAT(convert(varchar, mvs.fecha_aprob_jefe, 103), ' ',
        substring(convert(varchar,mvs.fecha_aprob_jefe, 114),1,5))
         as fecha_aprob_jefe_format,

         CONCAT(convert(varchar, mvs.fecha_aprob_mtto, 103), ' ',
        substring(convert(varchar,mvs.fecha_aprob_mtto, 114),1,5))
         as fecha_aprob_mtto_format,

         CONCAT(convert(varchar, mvs.fecha_finalizacion, 103), ' ',
        substring(convert(varchar,mvs.fecha_finalizacion, 114),1,5))
         as fecha_finalizacion_format

        from mtto_vh_solicitud mvs 
        inner join mtto_vh_estado_soli mves on mves.id = mvs.estado 
        inner join users u on u.id = mvs.id_solicitante 
        inner join vh_vehiculos vv on vv.id = mvs.id_vehiculo 
        inner join departamentos_edesal de on de.id = u.departamento_id 
        where mvs.idEliminado = 1 and mvs.estado = 1");

        return response()->json($solicitudes);
    }

    //metodo para obtener arreglo  de solicitudes ingresadas
    public function getSolicitudes_AproJefe(Request $request){
        $solicitudes = DB::connection('comanda')->select("SELECT mvs.*, u.alias as solicitante, u.jefe_inmediato as jefe,
        de.nombre as area,
        mves.estado as soli_estado,vv.numeracion as vehiculo, 
        CONCAT(convert(varchar, mvs.fecha_solicitud , 103), ' ',
        substring(convert(varchar,mvs.fecha_solicitud , 114),1,5))
         as fechaSolicitud, convert(varchar, mvs.fecha_solicitud , 23) as fechaSoli,
         CONCAT(convert(varchar, mvs.fecha_aprob_jefe, 103), ' ',
        substring(convert(varchar,mvs.fecha_aprob_jefe, 114),1,5))
         as fecha_aprob_jefe_format,

         CONCAT(convert(varchar, mvs.fecha_aprob_mtto, 103), ' ',
        substring(convert(varchar,mvs.fecha_aprob_mtto, 114),1,5))
         as fecha_aprob_mtto_format,

         CONCAT(convert(varchar, mvs.fecha_finalizacion, 103), ' ',
        substring(convert(varchar,mvs.fecha_finalizacion, 114),1,5))
         as fecha_finalizacion_format
        from mtto_vh_solicitud mvs 
        inner join mtto_vh_estado_soli mves on mves.id = mvs.estado 
        inner join users u on u.id = mvs.id_solicitante 
        inner join vh_vehiculos vv on vv.id = mvs.id_vehiculo 
        inner join departamentos_edesal de on de.id = u.departamento_id 
        where mvs.idEliminado = 1 and mvs.estado = 2");

        return response()->json($solicitudes);
    }

    //metodo para obtener arreglo  de solicitudes ingresadas
    public function getSolicitudes_AproMtto(Request $request){
        $solicitudes = DB::connection('comanda')->select("SELECT mvs.*, u.alias as solicitante, u.jefe_inmediato as jefe,
        de.nombre as area,
        mves.estado as soli_estado,vv.numeracion as vehiculo, 
        CONCAT(convert(varchar, mvs.fecha_solicitud , 103), ' ',
        substring(convert(varchar,mvs.fecha_solicitud , 114),1,5))
         as fechaSolicitud, convert(varchar, mvs.fecha_solicitud , 23) as fechaSoli,
         CONCAT(convert(varchar, mvs.fecha_aprob_jefe, 103), ' ',
        substring(convert(varchar,mvs.fecha_aprob_jefe, 114),1,5))
         as fecha_aprob_jefe_format,

         CONCAT(convert(varchar, mvs.fecha_aprob_mtto, 103), ' ',
        substring(convert(varchar,mvs.fecha_aprob_mtto, 114),1,5))
         as fecha_aprob_mtto_format,

         CONCAT(convert(varchar, mvs.fecha_finalizacion, 103), ' ',
        substring(convert(varchar,mvs.fecha_finalizacion, 114),1,5))
        as fecha_finalizacion_format,
         mt.nombre as taller
        from mtto_vh_solicitud mvs 
        inner join mtto_vh_estado_soli mves on mves.id = mvs.estado 
        inner join users u on u.id = mvs.id_solicitante 
        inner join vh_vehiculos vv on vv.id = mvs.id_vehiculo 
        inner join departamentos_edesal de on de.id = u.departamento_id 
        left join mtto_talleres mt on mt.id = mvs.id_taller
        where mvs.idEliminado = 1 and mvs.estado = 3");

        return response()->json($solicitudes);
    }

    //metodo para obtener arreglo  de solicitudes ingresadas
    public function getSolicitudes_Fin(Request $request){
        $solicitudes = DB::connection('comanda')->select("SELECT mvs.*, u.alias as solicitante, u.jefe_inmediato as jefe,
        de.nombre as area,
        mves.estado as soli_estado,vv.numeracion as vehiculo, 
        CONCAT(convert(varchar, mvs.fecha_solicitud , 103), ' ',
        substring(convert(varchar,mvs.fecha_solicitud , 114),1,5))
         as fechaSolicitud, convert(varchar, mvs.fecha_solicitud , 23) as fechaSoli,
         CONCAT(convert(varchar, mvs.fecha_aprob_jefe, 103), ' ',
        substring(convert(varchar,mvs.fecha_aprob_jefe, 114),1,5))
         as fecha_aprob_jefe_format,

         CONCAT(convert(varchar, mvs.fecha_aprob_mtto, 103), ' ',
        substring(convert(varchar,mvs.fecha_aprob_mtto, 114),1,5))
         as fecha_aprob_mtto_format,

         CONCAT(convert(varchar, mvs.fecha_finalizacion, 103), ' ',
        substring(convert(varchar,mvs.fecha_finalizacion, 114),1,5))
        as fecha_finalizacion_format,
         mt.nombre as taller
        from mtto_vh_solicitud mvs 
        inner join mtto_vh_estado_soli mves on mves.id = mvs.estado 
        inner join users u on u.id = mvs.id_solicitante 
        inner join vh_vehiculos vv on vv.id = mvs.id_vehiculo 
        inner join departamentos_edesal de on de.id = u.departamento_id 
        left join mtto_talleres mt on mt.id = mvs.id_taller
        where mvs.idEliminado = 1 and mvs.estado = 4");

        return response()->json($solicitudes);
    }


    public function getMisSolicitudes_Ing(Request $request){
        $usuario = $request["id"];

        $solicitudes = DB::connection('comanda')->select("SELECT mvs.*, u.alias as solicitante, u.jefe_inmediato as jefe,
        de.nombre as area,
        mves.estado as soli_estado,vv.numeracion as vehiculo, 
        CONCAT(convert(varchar, mvs.fecha_solicitud , 103), ' ',
        substring(convert(varchar,mvs.fecha_solicitud , 114),1,5))
         as fechaSolicitud, convert(varchar, mvs.fecha_solicitud , 23) as fechaSoli,
         CONCAT(convert(varchar, mvs.fecha_aprob_jefe, 103), ' ',
        substring(convert(varchar,mvs.fecha_aprob_jefe, 114),1,5))
         as fecha_aprob_jefe_format,

         CONCAT(convert(varchar, mvs.fecha_aprob_mtto, 103), ' ',
        substring(convert(varchar,mvs.fecha_aprob_mtto, 114),1,5))
         as fecha_aprob_mtto_format,

         CONCAT(convert(varchar, mvs.fecha_finalizacion, 103), ' ',
        substring(convert(varchar,mvs.fecha_finalizacion, 114),1,5))
         as fecha_finalizacion_format
        from mtto_vh_solicitud mvs 
        inner join mtto_vh_estado_soli mves on mves.id = mvs.estado 
        inner join users u on u.id = mvs.id_solicitante 
        inner join vh_vehiculos vv on vv.id = mvs.id_vehiculo 
        inner join departamentos_edesal de on de.id = u.departamento_id 
        where mvs.idEliminado = 1 and mvs.estado = 1 and mvs.id_solicitante = ". $usuario." ");

        return response()->json($solicitudes);
    }


    public function getMisSolicitudes_AproJefe(Request $request){
        $usuario = $request["id"];

        $solicitudes = DB::connection('comanda')->select("SELECT mvs.*, u.alias as solicitante, u.jefe_inmediato as jefe,
        de.nombre as area,
        mves.estado as soli_estado,vv.numeracion as vehiculo, 
        CONCAT(convert(varchar, mvs.fecha_solicitud , 103), ' ',
        substring(convert(varchar,mvs.fecha_solicitud , 114),1,5))
         as fechaSolicitud, convert(varchar, mvs.fecha_solicitud , 23) as fechaSoli,
         CONCAT(convert(varchar, mvs.fecha_aprob_jefe, 103), ' ',
        substring(convert(varchar,mvs.fecha_aprob_jefe, 114),1,5))
         as fecha_aprob_jefe_format,

         CONCAT(convert(varchar, mvs.fecha_aprob_mtto, 103), ' ',
        substring(convert(varchar,mvs.fecha_aprob_mtto, 114),1,5))
         as fecha_aprob_mtto_format,

         CONCAT(convert(varchar, mvs.fecha_finalizacion, 103), ' ',
        substring(convert(varchar,mvs.fecha_finalizacion, 114),1,5))
         as fecha_finalizacion_format
        from mtto_vh_solicitud mvs 
        inner join mtto_vh_estado_soli mves on mves.id = mvs.estado 
        inner join users u on u.id = mvs.id_solicitante 
        inner join vh_vehiculos vv on vv.id = mvs.id_vehiculo 
        inner join departamentos_edesal de on de.id = u.departamento_id 
        where mvs.idEliminado = 1 and mvs.estado = 2 and mvs.id_solicitante = ". $usuario." ");

        return response()->json($solicitudes);
    }


    public function getMisSolicitudes_AproMtto(Request $request){
        $usuario = $request["id"];

        $solicitudes = DB::connection('comanda')->select("SELECT mvs.*, u.alias as solicitante, u.jefe_inmediato as jefe,
        de.nombre as area,
        mves.estado as soli_estado,vv.numeracion as vehiculo, 
        CONCAT(convert(varchar, mvs.fecha_solicitud , 103), ' ',
        substring(convert(varchar,mvs.fecha_solicitud , 114),1,5))
         as fechaSolicitud, convert(varchar, mvs.fecha_solicitud , 23) as fechaSoli,
         CONCAT(convert(varchar, mvs.fecha_aprob_jefe, 103), ' ',
        substring(convert(varchar,mvs.fecha_aprob_jefe, 114),1,5))
         as fecha_aprob_jefe_format,

         CONCAT(convert(varchar, mvs.fecha_aprob_mtto, 103), ' ',
        substring(convert(varchar,mvs.fecha_aprob_mtto, 114),1,5))
         as fecha_aprob_mtto_format,

         CONCAT(convert(varchar, mvs.fecha_finalizacion, 103), ' ',
        substring(convert(varchar,mvs.fecha_finalizacion, 114),1,5))
         as fecha_finalizacion_format,
         mt.nombre as taller
        from mtto_vh_solicitud mvs 
        inner join mtto_vh_estado_soli mves on mves.id = mvs.estado 
        inner join users u on u.id = mvs.id_solicitante 
        inner join vh_vehiculos vv on vv.id = mvs.id_vehiculo 
        inner join departamentos_edesal de on de.id = u.departamento_id 
        left join mtto_talleres mt on mt.id = mvs.id_taller
        where mvs.idEliminado = 1 and mvs.estado = 3 and mvs.id_solicitante = ". $usuario." ");

        return response()->json($solicitudes);
    }

    public function getMisSolicitudes_Fin(Request $request){
        $usuario = $request["id"];

        $solicitudes = DB::connection('comanda')->select("SELECT mvs.*, u.alias as solicitante, u.jefe_inmediato as jefe,
        de.nombre as area,
        mves.estado as soli_estado,vv.numeracion as vehiculo, 
        CONCAT(convert(varchar, mvs.fecha_solicitud , 103), ' ',
        substring(convert(varchar,mvs.fecha_solicitud , 114),1,5))
         as fechaSolicitud, convert(varchar, mvs.fecha_solicitud , 23) as fechaSoli,

         CONCAT(convert(varchar, mvs.fecha_aprob_jefe, 103), ' ',
        substring(convert(varchar,mvs.fecha_aprob_jefe, 114),1,5))
         as fecha_aprob_jefe_format,

         CONCAT(convert(varchar, mvs.fecha_aprob_mtto, 103), ' ',
        substring(convert(varchar,mvs.fecha_aprob_mtto, 114),1,5))
         as fecha_aprob_mtto_format,

         CONCAT(convert(varchar, mvs.fecha_finalizacion, 103), ' ',
        substring(convert(varchar,mvs.fecha_finalizacion, 114),1,5))
        as fecha_finalizacion_format,
         mt.nombre as taller
        from mtto_vh_solicitud mvs 
        inner join mtto_vh_estado_soli mves on mves.id = mvs.estado 
        inner join users u on u.id = mvs.id_solicitante 
        inner join vh_vehiculos vv on vv.id = mvs.id_vehiculo 
        inner join departamentos_edesal de on de.id = u.departamento_id 
        left join mtto_talleres mt on mt.id = mvs.id_taller
        where mvs.idEliminado = 1 and mvs.estado = 4 and mvs.id_solicitante = ". $usuario." ");

        return response()->json($solicitudes);
    }

    public function aprobarSolicitudJefe(Request $request){
        
        $editar =  DB::connection('comanda')->table('mtto_vh_solicitud')
        ->where('id', $request['id'])
             ->update([
                'estado' => 2,
                'aprobacion_jefatura' => $request['aprobacion_jefatura'],
                'fecha_aprob_jefe' => date('Ymd H:i'),
                
                ]);

        return response()->json($editar);
    }

    public function aprobarSolicitudMtto(Request $request){
        
        $editar =  DB::connection('comanda')->table('mtto_vh_solicitud')
        ->where('id', $request['id'])
             ->update([
                'estado' => 3,
                'aprobacion_mtto' => $request['aprobacion_mtto'],
                'fecha_aprob_mtto' => date('Ymd H:i'),
                'id_taller' => $request['id_taller'],
                ]);

        return response()->json($editar);
    }


    public function finalizarSolicitud(Request $request){
        
        $editar =  DB::connection('comanda')->table('mtto_vh_solicitud')
        ->where('id', $request['id'])
             ->update([
                'estado' => 4,
                'observaciones_finales' => $request['observaciones_finales'],
                'fecha_finalizacion ' => date('Ymd H:i'),
                'usuario_finalizacion' => $request["usuario_finalizacion"],
                'ruta_factura' =>  date('Ymd').' '.strtolower(substr($request["file"],12)),
                'n_factura' =>  $request['n_factura'],
                ]);

        return response()->json($editar);
    }
    
    public function getKmbyVehiculo(Request $request){
        
      
        $getKmbyVehiculo = DB::connection('comanda')->select("SELECT top 1 vck.km_final as km_final from vh_ctr_kilometraje vck where vck.vh_vehiculo_id = 
        ".$request["id_vehiculo"]."
        order by fecha_creacion desc
        ");

        return response()->json($getKmbyVehiculo);
    }


    public function getConteoAdmin(){
       
        $conteo = DB::connection('comanda')->select("SELECT
        (select count(id) from mtto_vh_solicitud mvs where mvs.idEliminado = 1 and mvs.estado = 1) as conteoIng ,
        (select count(id) from mtto_vh_solicitud mvs where mvs.idEliminado = 1 and mvs.estado = 2) as conteoApJ ,
        (select count(id) from mtto_vh_solicitud mvs where mvs.idEliminado = 1 and mvs.estado = 3) as conteoApM ,
        (select count(id) from mtto_vh_solicitud mvs where mvs.idEliminado = 1 and mvs.estado = 4) as conteoF ");

        return response()->json($conteo);
    }

    public function getConteoUser(Request $request){
        $conteo = DB::connection('comanda')->select("SELECT
        (select count(id) from mtto_vh_solicitud mvs where mvs.idEliminado = 1 and mvs.estado = 1 and mvs.id_solicitante = ".$request["id"].") as conteoIng ,
        (select count(id) from mtto_vh_solicitud mvs where mvs.idEliminado = 1 and mvs.estado = 2 and mvs.id_solicitante = ".$request["id"].") as conteoApJ ,
        (select count(id) from mtto_vh_solicitud mvs where mvs.idEliminado = 1 and mvs.estado = 3 and mvs.id_solicitante = ".$request["id"].") as conteoApM ,
        (select count(id) from mtto_vh_solicitud mvs where mvs.idEliminado = 1 and mvs.estado = 4 and mvs.id_solicitante = ".$request["id"].") as conteoF ");

        return response()->json($conteo);
    }


    public function getTipoMtto(Request $request){
        $getTipoMtto = 
        DB::connection('comanda')->select("SELECT * from mtto_vh_tipos_mtto  
        where estado = 1 and mtto = '".$request["tipo_mantenimiento"]."' order by 2	asc
        ");

        return response()->json($getTipoMtto);
    }
    

    public function guardarPrecioMtto(Request $request){
        
     
        $editar = DB::connection('comanda')->table('mtto_detalle_mtto')->where('id', $request["id"])
        ->update([
            'precio' => $request["precio"] ,
        ]);

        return response()->json($editar);
    }


    public function mover_archivo(Request $request){
        $file = $request->file('file');
        $nombreoriginal = strtolower($file->getClientOriginalName());
        $file->move('documentos/',date('Ymd').' '.(string)$nombreoriginal);

        $extension = strtolower(pathinfo($file, PATHINFO_EXTENSION));

        $final_name = date('Ymd').' '.(string)$nombreoriginal.''.substr($extension,0,-3);
    
        return response()->json($final_name);
    }

}


?>