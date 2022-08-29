import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { GLOBAL } from "./global";
import { observable, Observable,Subject } from "rxjs";
import { Publicaciones } from "../models/publicaciones";
import { tap } from "rxjs";
@Injectable()
export class PublicacionesService{
    public url:string
    public edit=new Subject<any>()

    constructor(public _http:HttpClient){
        this.url=GLOBAL.url

    }
 

    setEditarPublicacion(){

        this.edit.next(false)
    }
    onEdit():Observable<any>{
       return this.edit
    }
    pruebaEdit(edit:boolean){
        this.edit.subscribe((valor)=>{
            console.log(valor)
        })
        this.edit.next(edit)
    }




    crearPublicacion(publicaciones:Publicaciones,id:any):Observable<any>{
        let params=JSON.stringify(publicaciones)
        let headers=new HttpHeaders().set('Content-Type','application/json')
        return this._http.post(this.url+'perfil/'+id,params,{headers:headers})

    }
    mostrarPublicacionesUsuario(id:any):Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','application/json')
        return this._http.get(this.url+'mostrar-publicaciones/'+id,{headers:headers})
    }
    eliminarPublicacion(id:any):Observable<any>{
        let idPublic=id
        let headers=new HttpHeaders().set('Content-Type','application/json')
        return this._http.post(this.url+'eliminar-publicacion/'+idPublic,{headers:headers})
    }
    getPublicacion(id:any):Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','application/json')
        return this._http.get(this.url+'publicacion/'+id,{headers:headers})
    }

    


}