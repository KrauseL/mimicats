import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'], 
  providers:[UserService]
})
export class RegistroComponent implements OnInit {
  public user:User
  public status:string
  constructor(
    private _route:ActivatedRoute, 
    private _router:Router, 
    private _userService:UserService
  ) {
    this.user=new User('','','','','No contiene numero','No contiene ubicacion','No contiene descripcion','','')
    this.status=""
  }
 
  ngOnInit(): void { 
  }
  onSubmit(form:any){
    this._userService.registro(this.user).subscribe(
        response=> {
            if (response.user && response.user._id ) {
                this.status='registrado'
                
            }else{
              this.status='error'
              console.log('error')
            }
        },
        error => {
            console.log(<any>error) 
        }
    )
}

}
