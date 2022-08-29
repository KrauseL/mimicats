import { Component, OnInit,Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { PublicacionesService } from 'src/app/services/publicaciones.service';


@Component({
  selector: 'app-user-publicacion',
  templateUrl: './user-publicacion.component.html',
  styleUrls: ['./user-publicacion.component.css'],
  providers:[PublicacionesService]
})
export class UserPublicacionComponent implements OnInit {
  @Input() id:any 
  public array:any
  public edit1:boolean=true
  public suscribir:any
  constructor(
    public _publicacionService:PublicacionesService
  ) { 
    this.suscribir=Subscription
  }

  ngOnInit(): void {
    this.mostrarPublicacion()
    this._publicacionService.edit.subscribe(
      result=>{
        console.log('user-modal= '+ result)
      }
    )
  }
  mostrarPublicacion(){
    this._publicacionService.mostrarPublicacionesUsuario(this.id).subscribe(
      (response)=>{
        this.array=response.results
        // this.ngOnInit()
      },
      (error)=>{
        console.log(<any>error)
      }
    )
  }
  eliminarPublicacion(idPublic:any){
    console.log(idPublic)
    this._publicacionService.eliminarPublicacion(idPublic).subscribe(
      (response)=>{
        console.log('Se elimino con exito')
        this.mostrarPublicacion()
      },
      (error)=>{
        console.log(<any>error)
      }
    )
  }
  // editPrueba(edit:boolean){
  //   this._publicacionService.pruebaEdit(edit)
  // }
}
