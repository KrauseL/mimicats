import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PublicacionesService } from 'src/app/services/publicaciones.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.css'],
  providers:[PublicacionesService]
})
export class PublicacionComponent implements OnInit {
  public arrayImg:any
  public img1:any='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgcdn.emol.cl%2Finternacional%2Ffiles%2F2018%2F08%2Fgato.jpg&f=1&nofb=1'
  public img2:any='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpetyzoo.com%2Fwp-content%2Fuploads%2F2016%2F04%2Fcatnip-gatos-petyzoo-1.jpg&f=1&nofb=1'
  public img3:any='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F3.bp.blogspot.com%2F-g1e9Q7jE-3o%2FUf2YQhqgZ5I%2FAAAAAAAAYIA%2Ft9VRMJ-ABkk%2Fw1200-h630-p-k-no-nu%2Fgatos%2B(1).jpg&f=1&nofb=1'
  public img:any=''
  public public:any={
    titulo:'',
    descripcion:'',
    usuario:'',
    vacunas:'',
    castrado:'',
    animal:'',
    problemasMedicos:'',
    anos:'',
    genero:'',
    idUser:''
  }
  public user:any={
    nombre:'',
    email:'',
    numero:'',
    ubicacion:''
  }
  public id:any
  constructor(
    private route:ActivatedRoute,
    private _publicacionService:PublicacionesService,
    private _userService:UserService
  ) {
    this.id=''
    this.arrayImg=[this.img1,this.img2,this.img3]
    this.img=this.img1
  }

  ngOnInit(): void {
    console.log(this.arrayImg)
    this.route.paramMap.subscribe((params)=>{
      this.id=params.get('id')
    })
    this.mostrarPublicacion()
  }
  mostrarPublicacion(){
    this._publicacionService.getPublicacion(this.id).subscribe((response)=>{
      console.log(response)
      this.public.titulo=response.publicaciones.titulo
      this.public.descripcion=response.publicaciones.descripcion
      this.public.vacunas=response.publicaciones.vacunas
      this.public.castrado=response.publicaciones.castrado
      this.public.animal=response.publicaciones.animal
      this.public.problemasMedicos=response.publicaciones.problemasMedicos
      this.public.anos=response.publicaciones.anos
      this.public.genero=response.publicaciones.genero
      this.public.idUser=response.publicaciones.usuario
      this._userService.getUser(this.public.idUser).subscribe((response)=>{
        this.user.nombre=response.user.nombre
        this.user.numero=response.user.numero
        this.user.email=response.user.email
        this.user.ubicacion=response.user.ubicacion
      })
    })
  }
  imgPublic(img:any){
    this.img=img
  }


}
