'use strict'

var express=require('express')
var PublicacionController=require('../controllers/publicaciones')

var api=express.Router()

api.post('/perfil/:id',PublicacionController.crearPublicacion)
api.get('/mostrar-publicaciones/:id',PublicacionController.mostrarPublicacionUsuario) 
api.post('/eliminar-publicacion/:id',PublicacionController.eliminarPublicacion)
api.get('/publicacion/:id',PublicacionController.getPublicacion)
module.exports=api