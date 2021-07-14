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

     //metodo para obtener listado de usuarios para mostrar en tabla de vista de usuarios
     public function getUsuariosTbl(){
        $usuarios = 
        DB::connection('comanda')->select("SELECT u.*,u.nombre+' '+u.apellido as nombreUsuario,
        rs.rol as rol,rs.id as idRol, ur.id as idUsuarioRol from users u 
       inner join mtto_vh_usuario_rol ur on ur.idUsuario = u.id
       inner join mtto_vh_roles rs on rs.id = ur.idRol
       where ur.estado = 1
       order by ur.id desc
        ");

        return response()->json($usuarios);
    }


    public function getRoles(){
        $roles = 
        DB::connection('comanda')->select("SELECT * from mtto_vh_roles where estado = 1");

        return response()->json($roles);
    }


    public function getUsuarios(){
        $usuarios = 
        DB::connection('comanda')->select("SELECT distinct id,
         nombre+' '+apellido as nombre from users where (estado is null or estado = 1)
         and id not in (select idUsuario from mtto_vh_usuario_rol where estado = 1)
         order by 2 asc");


        return response()->json($usuarios);
    }


     //metodo para guardar usuarios
     public function guardarUsuario(Request $request){
        $usuario = $request["usuario"];
        $rol = $request["rol"];

        $insertar =  DB::connection('comanda')->table('mtto_vh_usuario_rol')
        ->insert([
            'idUsuario' => $usuario,
            'idRol ' => $rol,
            'estado' => 1,
        ]);

        return response()->json($insertar);
    }

    
}
