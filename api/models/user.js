'use strict'

var mongoose = require('mongoose')
var Schema=mongoose.Schema

var UserSchema=Schema({
    nombre:String,
    email:String, 
    contrasena:String,
    numero:String, 
    ubicacion:String,
    descripcion:String,
    image:String,
    portada:String
})
module.exports=mongoose.model('User',UserSchema)