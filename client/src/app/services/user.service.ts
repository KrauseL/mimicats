import { Injectable} from "@angular/core";
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Observable,Subject} from "rxjs";
import { GLOBAL } from "./global";
import { User } from "../models/user";

@Injectable()
export class UserService{
    public url:string;
    public identidad:any
    public _refresh$=new Subject<void>()
    constructor(public _http:HttpClient){
        this.url=GLOBAL.url
    }
    prueba():Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','application/json')
        return this._http.get(this.url+'pruebas',{headers:headers})
    }
    registro(user: User): Observable<any>{
        let params = JSON.stringify(user)
        console.log(params)
        let headers= new HttpHeaders().set('Content-Type','application/json')
        return this._http.post(this.url+'registro',params,{headers:headers})
    }
    login(user:any):Observable<any>{
        let params =JSON.stringify(user)
        let headers=new HttpHeaders().set('Content-Type','application/json')
        return this._http.post(this.url+'login',params,{headers:headers})
    }
    getIdentidad(){
        let indentidad=localStorage.getItem('identidad')
        if (indentidad != undefined) {
            this.identidad=indentidad
        }else{
            this.identidad=null
        }
        return this.identidad
    }
    getUser(id:any):Observable<any>{

        let headers=new HttpHeaders().set('Content-Type','application/json')
        return this._http.get(this.url+'perfil/'+id,{headers:headers})
    }

    editarPerfil(user:User,id:any): Observable<any>{
        let params = JSON.stringify(user)
        let headers=new HttpHeaders().set('Content-Type','application/json')
        return this._http.post(this.url+'editar-perfil/'+id,params,{headers:headers})
    }

    // updateImgPerfil(fileToUpload:File,id:any):Observable<any>{
    //     let params=JSON.stringify(fileToUpload)
    //     // const formData: FormData = new FormData();
    //     // formData.append('fileKey', fileToUpload, fileToUpload.name);
    //     let headers=new HttpHeaders().set('Content-Type','application/json')
    //     return this._http.post(this.url+'upload-image-user/'+id,params,{headers:headers})
    // }

    


}
