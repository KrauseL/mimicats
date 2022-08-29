import { Component,OnInit,DoCheck } from '@angular/core';
import { Route,ActivatedRoute,Params, Router } from '@angular/router';
import { UserService } from './services/user.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[UserService]
})
export class AppComponent implements OnInit,DoCheck{
  title = 'mimicats';
  public nombre:string
  public identidad: any
  public iden:any
  constructor(
    private _userService:UserService,
    private _route:ActivatedRoute,
    private _router:Router
  ){
    this.nombre=''
    this.iden
  }
  ngOnInit() {
    this.identidad=this._userService.getIdentidad()
    if (this.identidad) {
      var elementos=JSON.parse(this.identidad)
      this.nombre=elementos.nombre
      this.iden=elementos._id
    }
    

  }
  ngDoCheck(){
    this.identidad=this._userService.getIdentidad()
    if (this.identidad) {
      var elementos=JSON.parse(this.identidad)
      this.nombre=elementos.nombre
      this.iden=elementos._id
    }
  }
  logout(){
    localStorage.clear()
    this.identidad=null
    this._router.navigate(['/'])
  }
}
