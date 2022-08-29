import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-pruebas',
  templateUrl: './pruebas.component.html',
  styleUrls: ['./pruebas.component.css'],
  providers:[UserService]
})
export class PruebasComponent implements OnInit {

  constructor(
    private _userService:UserService
  ) { } 

  ngOnInit(): void {
    this._userService.prueba().subscribe(
      response=> {
        console.log(response)
      }
    )
  }

}
