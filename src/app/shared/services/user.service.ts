import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { user } from 'src/app/shared/intefaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {

  private _usersData : user[] = [];
  private _userLogged : user = {} as user;

  constructor(private router : Router){}

  ngOnInit(): void {
    this.loadLocalStorage();
  }

  loadLocalStorage():void{
    let usersData: user[] = JSON.parse(localStorage.getItem('usersData') ?? "[{}]")
    let userLogged : user = JSON.parse(localStorage.getItem('userLogged') ?? "{}")
    this._usersData = usersData;
    this._userLogged = userLogged;
  }

  saveLocalStorage():void{
    localStorage.setItem('usersData', JSON.stringify(this._usersData))
    localStorage.setItem('tokenUser', JSON.stringify(this._userLogged))
  }

  saveUser(user : user):void{
    this._usersData.push({...user, id: this.generateID() });
    this.saveLocalStorage();
  }

  existsEmail(email : string):boolean{
    return this._usersData.some(u => u.email === email);
  }

  login(credentials : Exclude<user, "name">):boolean{
      let user : user | undefined  = this._usersData.find(u => u.email === credentials.email)

      if(!user) return false;

      if(user.password === credentials.password){

        this._userLogged = {...user};
        this.saveLocalStorage();
        return true;
      }

      return false;
  }

  logout():void{
    this._userLogged = {} as user;
    this.router.navigate(['/'])
  }

  editUser(user : user){
    this._usersData = this._usersData.map(u => {
        if(u.id === user.id) return user;
        return u;
    })
    this._userLogged = user;
    this.saveLocalStorage();
  }

  private generateID():number{

    if(!this._usersData.length) return 1;

    let maxId = [...this._usersData].sort((a, b) => b.id - a.id);

    return maxId[0].id + 1;

  }

}
