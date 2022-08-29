import { Component, Input, OnInit } from '@angular/core';
import { PublicacionesService } from 'src/app/services/publicaciones.service';
import { ActivatedRoute,Router } from '@angular/router';
import { Publicaciones } from 'src/app/models/publicaciones';

@Component({
  selector: 'app-modal-public',
  templateUrl: './modal-public.component.html',
  styleUrls: ['./modal-public.component.css'],
  providers:[PublicacionesService]
})
export class ModalPublicComponent implements OnInit {
  public publicaciones:Publicaciones
  public id:any
  public alerta:string 
  // public edit:boolean=true
  constructor(
    private _publicacionService:PublicacionesService,
    private route:ActivatedRoute,
    private _router:Router
  ) {
    this.publicaciones=new Publicaciones('','','','','','','','','','')
    this.id=''
    this.alerta=''
    
  } 
  @Input() edit:boolean=true
  ngOnInit(): void {
    this.route.paramMap.subscribe((params)=>{
      this.id=params.get('id')
      this.publicaciones._id=this.id
    })
    this._publicacionService.onEdit().subscribe(
      respuesta=>{
        console.log('modal-public'+ respuesta)
      }
    )
  }
  // ngDoCheck(){
  //   this.editPrueba()
  // }
  ngSubmit(form:any){
    this._publicacionService.crearPublicacion(this.publicaciones,this.id).subscribe(
      response=>{
        this.alerta='exito'
      },
      error=>{
        console.log(<any>error)
        this.alerta='error'
      } 
    )
  }
  mostrarPublicacion(){
    this._publicacionService.mostrarPublicacionesUsuario(this.id).subscribe(
      (response)=>{
        console.log(this.id)
      },
      (error)=>{
        console.log(<any>error)
      }
    )
  }
  editPrueba(){
    this._publicacionService.onEdit().subscribe(
      respuesta=>{
        console.log('modal-public'+ respuesta)
      }
    )
  }
  

}
