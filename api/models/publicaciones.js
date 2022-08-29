'use strict'
var mongoose = require('mongoose')
var Schema=mongoose.Schema

var PublicacionesSchema=Schema({
    titulo:String,
    descripcion:String,
    usuario:mongoose.Types.ObjectId,
    vacunas:String,
    castrado:String,
    animal:String,
    problemasMedicos:String,
    anos:String,
    genero:String

})
module.exports=mongoose.model('Publicaciones',PublicacionesSchema)