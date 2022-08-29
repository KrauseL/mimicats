'use strict'
var Publicaciones=require('../models/publicaciones')
const publicaciones = require('../models/publicaciones')
var mongoose= require('mongoose');
var path=require('path')

function crearPublicacion(req,res) {
    var params=req.body
    var userId=req.params.id
    var publicaciones=new Publicaciones()
    if (params.titulo && params.descripcion) {
        publicaciones.titulo=params.titulo
        publicaciones.descripcion=params.descripcion
        publicaciones.vacunas=params.vacunas
        publicaciones.castrado=params.castrado
        publicaciones.animal=params.animal
        publicaciones.problemasMedicos=params.problemasMedicos
        publicaciones.genero=params.genero
        publicaciones.anos=params.anos
        publicaciones.usuario=userId
        publicaciones.save((err,publicacionesStored)=>{
            if(err) return res.status(500).send({message:'Error al guardar publicacion'})
            if (publicacionesStored) {
                res.status(200).send({publicaciones:publicacionesStored})
            }else{
                res.status(400).send({message:'no se a podido publicar'})
            }
        })
    }else{
        res.status(200).send({
            message:'Enviar todos los datos necesarios'
        })
    }
}
function mostrarPublicacionUsuario(req,res) {
    var userId=req.params.id
    var resultado =
    [
        {
            $lookup:
            {
                from:'users',
                localField:'usuario',
                foreignField:'_id',
                as:'usuario'
            }

        },
        
        { 
            $match: {'usuario._id':mongoose.Types.ObjectId(userId) }
        }
    ]
    publicaciones.aggregate(resultado).sort({'_id':-1}).exec(function(err,results){
        if(err) return res.status(500).send({message:'Error en la peticion'})

        return res.status(200).send({results})
    })
}
function eliminarPublicacion(req,res) {  
    let publicId=req.params.id
    publicaciones.deleteOne({'_id':publicId},(err,publicacion)=>{
        if(err) return res.status(500).send({message:'Error'})
        if(!publicacion) return res.status(404).send({message:'error'})
        return res.status(200).send({message:'Se elimino con exito'})
    })
}
function getPublicacion(req,res) {
    var publicId=req.params.id
    publicaciones.findById(publicId,(err,publicaciones)=>{
        if(err) return res.status(500).send({message:'error'})
        if(!publicaciones) return res.status(404).send({message:'error'})
        return res.status(200).send({publicaciones})
    })
}

module.exports={
    crearPublicacion,
    mostrarPublicacionUsuario,
    eliminarPublicacion,
    getPublicacion
}