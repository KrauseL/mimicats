import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { PublicacionesService } from 'src/app/services/publicaciones.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GLOBAL } from 'src/app/services/global';
import { User } from 'src/app/models/user';
import { Publicaciones } from 'src/app/models/publicaciones';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  providers: [UserService,PublicacionesService],
})
export class PerfilComponent implements OnInit {
  public edit2:boolean=false

  // usuarios
  public id: any; 
  public nombre: any;
  public email: any;
  public ubicacion: any;
  public descripcion: any;
  public numero: any;
  public image:any;
  public perfil:any
  public portada:any
  public url:any
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _userService: UserService,
    private _publicacionService:PublicacionesService
  ) {
    this.nombre = '';
    this.email = '';
    this.ubicacion = '';
    this.descripcion = '';
    this.numero = '';
    this.url=GLOBAL.url
  }
  prueba = 'nada';


  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });
    this._userService.getUser(this.id).subscribe((response) => {
      this.nombre = response.user.nombre;
      this.email = response.user.email;
      this.ubicacion = response.user.ubicacion;
      this.descripcion = response.user.descripcion;
      this.numero = response.user.numero;
      this.image=response.user.image
      this.portada=response.user.portada
      this.imgPerfilVacio(response.user.image)
      this.imgPortadaVacio(response.user.portada,'assets/img/17-fondos-de-pantalla-para-pc-de-gatitos-9-1200x675.jpg.webp')
    });
    this._publicacionService.edit.subscribe(
      result=>{
        console.log('perfil= '+ result)
      }
    )
   
  }
  imgPerfilVacio(img:any){
    if (img=='') {
      this.perfil='assets/img/perfil.webp'
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
