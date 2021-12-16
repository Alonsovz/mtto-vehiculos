<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as BaseVerifier;

class VerifyCsrfToken extends BaseVerifier
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array
     */
    protected $except = [
        'validarCredenciales',
        'getUsuariosTbl',
        'getUsuarios',
        'getRoles',
        'guardarUsuario',
        'eliminarUsuario',
        'editarUsuario',
        'getVehiculos',
        'guardar_solicitud',
        'getSolicitudes_Ing',
        'getSolicitudes_AproJefe',
        'getSolicitudes_AproMtto',
        'getSolicitudes_Fin',
        'getMisSolicitudes_Ing',
        'getMisSolicitudes_AproJefe',
        'getMisSolicitudes_AproMtto',
        'getMisSolicitudes_Fin',
        'aprobarSolicitudJefe',
        'aprobarSolicitudMtto',
        'finalizarSolicitud',
        'getKmbyVehiculo',
        'getConteoAdmin',
        'getConteoUser',
        'getTipoMtto',
        'getContratos',
        'guardarContrato',
        'eliminarContrato',
        'getNContratoByVehiculo',
        'getUsuariosVh',
        'editarVehiculo',
        'guardar_detalle_soli',
        'get_detalle_soli',
        'getTalleres',
        'guardarTaller',
        'eliminarTaller',
        'editarTaller',
        'getTalleres_list',
        'guardarPrecioMtto',
        'mover_archivo'
    ];
}
