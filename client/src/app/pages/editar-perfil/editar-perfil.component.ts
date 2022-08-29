import { Component, OnInit,Output, Renderer2 } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute,Router } from '@angular/router';
import { ImageCroppedEvent,LoadedImage } from 'ngx-image-cropper';
import { UploadService } from 'src/app/services/upload.service';
import { GLOBAL } from 'src/app/services/global';
import { async } from '@angular/core/testing';
import { User } from 'src/app/models/user';
import { ThisReceiver } from '@angular/compiler';
@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css'],
  providers:[UserService,UploadService]
})
export class EditarPerfilComponent implements OnInit { 
  form: any={
    _id:'',
    nombre:'',
    email:'',
    ubicacion:'',
    descripcion:'',
    numero:'',
    contrasena:'',
    image:''
  }
  public user:any
  public id:any
  public idIden:any
  public perfil:any
  public portada:any
  public pruebaMensaje:string
  public identidad:any
  public url:string
  constructor(
    private _userService:UserService,
    private _uploadService:UploadService,
    private route:ActivatedRoute,
    private _router:Router
  ) {
    this.id=''
    this.pruebaMensaje='mensaje prueba'
    this.user=this._userService.getIdentidad()
    this.url=GLOBAL.url
  }
  status=''

  imageChangedEvent: Array<File>=[]
  imgPrevia:any=''
  croppedImage: any='';

  imageChangedPortada: Array<File>=[]
  imgPreviaPortada:any=''
  croppedPortada: any='';
  // editar foto de perfil
  filePerfil(event: any): void {
    this.imageChangedEvent = <Array<File>>event.target.files
    this.imgPrevia=event
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  // editar foto de portada
  filePortada(event:any){
    this.imageChangedPortada=<Array<File>>event.target.files
    this.imgPreviaPortada=event
    console.log(this.imgPreviaPortada[0])
  }
  imageCroppedPortada(event: ImageCroppedEvent){
    this.croppedPortada=event.base64
    
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params)=>{
      this.id=params.get('id')
      this.form._id=this.id
    })
    this._userService.getUser(this.id).subscribe((response) => {
      this.form.nombre = response.user.nombre;
      this.form.email = response.user.email;
      this.form.ubicacion = response.user.ubicacion;
      this.form.descripcion = response.user.descripcion;
      this.form.numero = response.user.numero;
      this.form.contrasena=response.user.contrasena
      this.form.image=response.user.image
      this.form.portada=response.user.portada
      this.imgPerfilVacio(response.user.image,'assets/img/perfil.webp')
      this.imgPortadaVacio(response.user.portada,'assets/img/17-fondos-de-pantalla-para-pc-de-gatitos-9-1200x675.jpg.webp')
      console.log(response.user.portada)
    });

    this.identidad=this._userService.getIdentidad()
    if (this.identidad) {
      var elementos=JSON.parse(this.identidad)
      this.idIden=elementos._id
    }
    if (this.idIden != this.id) {
      this._router.navigate(['/'])
    }

  }
  getNombre(){
    return this.pruebaMensaje
  }
  ngSubmit(form:any){
    localStorage.setItem('identidad',JSON.stringify(this.form))
    let user=JSON.parse(this.user)

    this._userService.editarPerfil(this.form,this.id).subscribe(
      response =>{
        this.status='correcto'
        // this._uploadService.makeFileRequestPerfil(this.url+'upload-image-user/'+this.id,this.imageChangedEvent,'image')
        // .then((result:any)=>{
        //   this.form.image=result.image
        //   localStorage.setItem('identidad',JSON.stringify(result.user))
        // })
        this._uploadService.makeFileRequestPerfil(this.url+'upload-image-portada/'+this.id,this.imageChangedPortada,'portada')
        .then((result:any)=>{
          this.form.portada=result.portada
          localStorage.setItem('identidad',JSON.stringify(result.user))
        })
        
      },
      error=>{
        this.status='error'
        console.error(<any>error);
        
      }
    )
  }
  imgPerfilVacio(img:any,imgVaciaPerfil:any){
    if (img=='') {
      this.perfil=imgVaciaPerfil
    }else{
      this.perfil=this.url+'get-image-user/'+img
    }
  }
  imgPortadaVacio(img:any,imgVaciaPerfil:any){
    if (img=='') {
      this.portada=imgVaciaPerfil
    }else{
      this.portada=this.url+'get-image-user/'+img
    }
  }

}
