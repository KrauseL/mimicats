'use strict'
var User=require('../models/user')
var publicaciones=require('../models/publicaciones')
var fs=require('fs')
var path=require('path')
const user = require('../models/user')
var mongoose= require('mongoose');
const { exists } = require('../models/user')
//rutas
function pruebas(req,res) {
    res.status(200).send({
        message:'Hola mundo desde el servidor'
    })
}

function registrarUsuario(req,res) {
    var params = req.body
    var user=new User()
    if (params.nombre && params.email && params.contrasena) {
        user.nombre=params.nombre
        user.email=params.email
        user.descripcion=params.descripcion
        user.numero=params.numero
        user.ubicacion=params.ubicacion
        user.contrasena=params.contrasena
        user.image=params.image
        user.portada=params.portada
        user.save((err,userStored)=>{
            if (err) return res.status(500).send({message:'Error al guardar el usuario'})
            if (userStored) {
                res.status(200).send({user:userStored})
            }else{
                res.status(400).send({message:'no se a registrado el usuario'})
            }
        })
 
    } else {
        res.status(200).send({
            message:'Envia todos las datos necesarios!!'
        })
    }
} 
function loguearUsuario(req, res) {
    var params=req.body
    var email= params.email
    User.findOne({email:email},(err,user)=>{
        if (err) return res.status(500).send({message:'Error en la peticion'})
        
        return res.status(200).send({user})
    })
}
function getUser(req,res) {
    var userId=req.params.id
    User.findById(userId,(err,user)=>{
        if(err) return res.status(500).send({message:'Error en la peticion'})

        if(!user) return res.status(404).send({message:'El usuario no existe'})

        return res.status(200).send({user})
    })
    
}

function updateUsuarios(req,res) {
    let body=req.body
    let userId=req.params.id
    user.updateOne({userId:body._id}, {
        $set:{
            nombre:body.nombre,
            email:body.email,
            descripcion:body.descripcion,
            numero:body.numero,
            ubicacion:body.ubicacion,
            contrasena:body.contrasena
        }

    },
    function(error,info) {
        if (error) {
            res.json({
                resultado:false,
                msg:'No se puede modificar el cliente',
                err
            })
        }else{
            res.json({
                resultado:true,
                info:info
            })
        }

    })
}

// imagen de perfil
function uploadImagePerfil(req,res){
    var userId = req.params.id

    if(req.files){
        var file_path=req.files.image.path
        console.log(file_path)
        var file_split=file_path.split('\\')
        var file_name=file_split[2]
        var ext_split=file_name.split('\.')
        var file_ext=ext_split[1]

        if (file_ext=='png' || file_ext=='jpg' || file_ext=='jpeg' || file_ext=='gif') {
            User.findByIdAndUpdate(userId,{image:file_name},{new:true},(err,userUpdated)=>{
                if(err) return res.status(500).send({message:'Error en la peticion'})

                if(!user) return res.status(404).send({message:'El usuario no existe'})
        
                return res.status(200).send({user:userUpdated})
            })
        }else{
            removeFilesUploads(res,file_path)
        }
    }else{
        return res.status(500).send({message:'No se han subido imagenes'})
    }

}

// imagen de portada
function uploadImagePortada(req,res){
    var userId = req.params.id

    if(req.files){
        var file_path=req.files.portada.path
        var file_split=file_path.split('\\')
        var file_name=file_split[2]
        var ext_split=file_name.split('\.')
        var file_ext=ext_split[1]

        if (file_ext=='png' || file_ext=='jpg' || file_ext=='jpeg' || file_ext=='gif') {
            User.findByIdAndUpdate(userId,{portada:file_name},{new:true},(err,userUpdated)=>{
                if(err) return res.status(500).send({message:'Error en la peticion'})

                if(!user) return res.status(404).send({message:'El usuario no existe'})
        
                return res.status(200).send({user:userUpdated})
            })
        }else{
            removeFilesUploads(res,file_path)
        }
    }else{
        return res.status(500).send({message:'No se han subido imagenes'})
    }

}

// recursos imagen
function removeFilesUploads(res,file_path){
    fs.unlink(file_path,(err)=>{
        return res.status(200).send({message:'Extension no valida'})
    })
}
function getImageFile(req,res) {
    var image_file=req.params.imageFile
    var path_file='./uploads/users/'+image_file
    fs.exists(path_file,(exists)=>{
        if (exists) {
            res.sendFile(path.resolve(path_file))
        }else{
            res.status(200).send({message:'No existe la imagen..'})
        }
    })
}

module.exports = {
    pruebas,
    registrarUsuario,
    loguearUsuario,
    getUser,
    uploadImagePerfil, 
    updateUsuarios,
    getImageFile,
    uploadImagePortada
    
}

