<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use DB;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Response as FacadeResponse;
use Session;


date_default_timezone_set("America/El_Salvador");
class TallerController extends Controller
{
    
    public function getTalleres(){
        $getTalleres = 
        DB::connection('comanda')->select("SELECT *,
        case when estado = 1 
        then 
        'Activo'
        else
        'Eliminado' end as estado_taller from mtto_talleres order by 2 asc");

        return response()->json($getTalleres);
    }

    public function getTalleres_list(){
        $getTalleres = 
        DB::connection('comanda')->select("SELECT * from mtto_talleres 
        where estado =1 order by 2 asc");

        return response()->json($getTalleres);
    }

    
    public function guardarTaller(Request $request){
       

        $insertar =  DB::connection('comanda')->table('mtto_talleres')
        ->insert([
            'nombre' => $request["nombre"],
            'estado' => 1,
        ]);

        return response()->json($insertar);
    }


    public function eliminarTaller(Request $request){
        $id = $request["id"];

        $editar = DB::connection('comanda')->table('mtto_talleres')->where('id', $id)
        ->update(['estado' => 2 , 
        ]);

        return response()->json($editar);
    }

    public function editarTaller(Request $request){
        $id = $request["id"];

        $editar = DB::connection('comanda')->table('mtto_talleres')->where('id', $id)
        ->update(['nombre' => $request["nombre"], 
        ]);

        return response()->json($editar);
    }


}


?>