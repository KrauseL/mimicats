import { Injectable } from "@angular/core";
import { GLOBAL } from "./global";

@Injectable()
export class UploadService{
    public url:string
    constructor(){
        this.url=GLOBAL.url
    }
    makeFileRequestPerfil(url:string,file:Array<File>,name:string){
        return new Promise(function(resolve,reject){
            var formData: any=new FormData()
            var xhr=new XMLHttpRequest()

            for (let i = 0; i < file.length; i++) {
                formData.append(name,file[i], file[i].name)
            }
            xhr.onreadystatechange=function () {
                if (xhr.readyState==4) {
                    if (xhr.status==200) {
                        resolve(JSON.parse(xhr.response))
                    }else{
                        reject(xhr.response)
                    }
                }
            }
            xhr.open('POST',url,true)
            xhr.send(formData)
        })
    }
}