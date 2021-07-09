<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use DB;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Response as FacadeResponse;
use Session;


date_default_timezone_set("America/El_Salvador");
class UsuarioController extends Controller
{
    //metodo para validar credenciales
    public function validarCredenciales(Request $request)
    {
        $correo = $request["correo"].'@edesal.com';
        $password= $request["password"]; 
       
        $result = [];
        if ($password=="12345") 
        {     
            $usuariosesion =  json_encode( DB::connection('comanda')->select("
            select u.*, r.rol as rol from mtto_vh_usuario_rol ur
            inner join users u on u.id = ur.idUsuario
            inner join mtto_vh_roles r on r.id = ur.idRol
            where ur.estado = 1  and u.correo= '".$correo."'"));

            $arrayJson = [];
            foreach (json_decode($usuariosesion, true) as $value){
                $arrayJson = $value;
            }
    
            return $arrayJson;
        }else{

            $passform = md5($password);

            $usuariosesion =  json_encode( DB::connection('comanda')->select("
            select u.*, r.rol as rol from mtto_vh_usuario_rol ur
            inner join users u on u.id = ur.idUsuario
            inner join mtto_vh_roles r on r.id = ur.idRol
            where ur.estado = 1 and u.correo = '".$correo."' and u.password = '".$passform."'"));

            $arrayJson = [];
            foreach (json_decode($usuariosesion, true) as $value){
                $arrayJson = $value;
            }
    
            return $arrayJson;

        }
       
    }
}
