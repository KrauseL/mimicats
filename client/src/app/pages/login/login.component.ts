import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[UserService]
})
export class LoginComponent implements OnInit {
  public user:User
  public status:string
  constructor(
    private _userService:UserService
  ) {
    this.user=new User('','','','','No contiene numero','No contiene ubicacion','No contiene descripcion','','')
    this.status=''
  }

  ngOnInit(): void {
  }

  onSubmit(){
    this._userService.login(this.user).subscribe(
      (response)=>{
        if (!response.user || !response.user._id) {
          this.status='error'
        }else{
          this.status='logueado'
          localStorage.setItem('identidad',JSON.stringify(response.user))
        }
      },
      (error)=>{
        // var errorMensage=<any>error
        this.status='error'
      }
    )
  }

}
