import { Injectable, OnInit } from '@angular/core';
import { user } from 'src/app/shared/intefaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {

  private _usersData : user[] = [];

  ngOnInit(): void {
    this.loadLocalStorage();
  }

  loadLocalStorage():void{
    let usersData: user[] = JSON.parse(localStorage.getItem('usersData') ?? "[{}]")
    this._usersData = usersData;
  }

  saveLocalStorage():void{
    localStorage.setItem('usersData', JSON.stringify(this._usersData))
  }

  saveUser(user : user):void{
    this._usersData.push(user);
    this.saveLocalStorage();
  }

  existsEmail(email : string):boolean{
    return this._usersData.some(u => u.email === email);
  }

}
