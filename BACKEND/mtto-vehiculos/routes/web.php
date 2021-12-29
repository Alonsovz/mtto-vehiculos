<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

//rutas para usuarios
Route::post('validarCredenciales', 'UsuarioController@validarCredenciales');
Route::any('getUsuariosTbl', 'UsuarioController@getUsuariosTbl');
Route::any('getUsuarios', 'UsuarioController@getUsuarios');
Route::any('getRoles', 'UsuarioController@getRoles');
Route::post('guardarUsuario', 'UsuarioController@guardarUsuario');
Route::post('eliminarUsuario', 'UsuarioController@eliminarUsuario');
Route::post('editarUsuario', 'UsuarioController@editarUsuario');
Route::any('getUsuariosVh', 'UsuarioController@getUsuariosVh');

//rutas para vehiculos
Route::any('getVehiculos', 'VehiculosController@getVehiculos');
Route::post('editarVehiculo', 'VehiculosController@editarVehiculo');
Route::post('getDetallesVh', 'VehiculosController@getDetallesVh');

//rutas para solicutdes
Route::post('guardar_solicitud', 'SolicitudController@guardar_solicitud');
Route::any('getSolicitudes_Ing', 'SolicitudController@getSolicitudes_Ing');
Route::any('getSolicitudes_AproJefe', 'SolicitudController@getSolicitudes_AproJefe');
Route::any('getSolicitudes_AproMtto', 'SolicitudController@getSolicitudes_AproMtto');
Route::any('getSolicitudes_Fin', 'SolicitudController@getSolicitudes_Fin');
Route::post('getTipoMtto', 'SolicitudController@getTipoMtto');
Route::post('getMisSolicitudes_Ing', 'SolicitudController@getMisSolicitudes_Ing');
Route::post('getMisSolicitudes_AproJefe', 'SolicitudController@getMisSolicitudes_AproJefe');
Route::post('getMisSolicitudes_AproMtto', 'SolicitudController@getMisSolicitudes_AproMtto');
Route::post('getMisSolicitudes_Fin', 'SolicitudController@getMisSolicitudes_Fin');
Route::post('aprobarSolicitudJefe', 'SolicitudController@aprobarSolicitudJefe');
Route::post('aprobarSolicitudMtto', 'SolicitudController@aprobarSolicitudMtto');
Route::post('finalizarSolicitud', 'SolicitudController@finalizarSolicitud');
Route::post('getKmbyVehiculo', 'SolicitudController@getKmbyVehiculo');
Route::get('getConteoAdmin', 'SolicitudController@getConteoAdmin');
Route::post('getConteoUser', 'SolicitudController@getConteoUser');
Route::post('guardar_detalle_soli', 'SolicitudController@guardar_detalle_soli');
Route::post('get_detalle_soli', 'SolicitudController@get_detalle_soli');
Route::post('guardarPrecioMtto', 'SolicitudController@guardarPrecioMtto');
Route::post('mover_archivo', 'SolicitudController@mover_archivo');

//rutas para contratos
Route::any('getContratos', 'ContratosController@getContratos');
Route::post('guardarContrato', 'ContratosController@guardarContrato');
Route::post('eliminarContrato', 'ContratosController@eliminarContrato');
Route::post('getNContratoByVehiculo', 'ContratosController@getNContratoByVehiculo');


//rutas para taller
Route::any('getTalleres', 'TallerController@getTalleres');
Route::post('guardarTaller', 'TallerController@guardarTaller');
Route::post('eliminarTaller', 'TallerController@eliminarTaller');
Route::post('editarTaller', 'TallerController@editarTaller');
Route::any('getTalleres_list', 'TallerController@getTalleres_list');