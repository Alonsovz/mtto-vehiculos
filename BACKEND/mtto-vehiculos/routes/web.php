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

//rutas para vehiculos
Route::any('getVehiculos', 'VehiculosController@getVehiculos');


//rutas para solicutdes
Route::post('guardar_solicitud', 'SolicitudController@guardar_solicitud');


