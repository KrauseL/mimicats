'use strict'
const mongoose= require('mongoose');
var app=require('./app');
var port =3800

//conexion database
mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost:27017/mimicats', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        console.log('la conexion a la base de datos se ha realizado');

        //crear servidor
        app.listen(port, ()=>{
            console.log("Servidor corriendo en http://localhost:3800")
        })
    })
    .catch(err => console.log("error"));