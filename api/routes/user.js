'use strict'

var express=require('express')
var UserController=require('../controllers/user')

var api=express.Router()

var multipart=require('connect-multiparty')
var md_upload=multipart({uploadDir:'./uploads/users'})


api.get('/pruebas',UserController.pruebas)
api.post('/registro',UserController.registrarUsuario)
api.post('/login',UserController.loguearUsuario)
api.get('/perfil/:id',UserController.getUser)
api.post('/editar-perfil/:id',UserController.updateUsuarios)
api.post('/upload-image-user/:id',md_upload,UserController.uploadImagePerfil)
api.post('/upload-image-portada/:id',md_upload,UserController.uploadImagePortada)
api.get('/get-image-user/:imageFile',UserController.getImageFile)

module.exports=api  