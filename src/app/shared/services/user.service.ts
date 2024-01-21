import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { user } from 'src/app/shared/intefaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {

  private _usersData! : BehaviorSubject<user[]>;
  private _userLogged : user = {} as user;

  constructor(  private router : Router,
                private http : HttpClient ){}


  ngOnInit(): void {
    this.loadLocalStorage();
    this.persistenceLoadUsersData()
            .subscribe(users => {
              this._usersData.next(users);
            })
  }

  persistenceSaveUsersData():Observable<user[]>{
    return this.http.post<user[]>('assets/usersData.json', this._usersData)
  }

  persistenceLoadUsersData():Observable<user[]>{
    return this.http.get<user[]>('assets/usersData.json');
  }

  loadLocalStorage():void{
    let userLogged : user = JSON.parse(localStorage.getItem('userLogged') ?? "{}")
    this._userLogged = userLogged;
  }

  saveLocalStorage():void{
    localStorage.setItem('usersData', JSON.stringify(this._usersData))
    localStorage.setItem('tokenUser', JSON.stringify(this._userLogged))
  }

  saveUser(user : user):void{
    this._usersData.subscribe(users => {
      let newUsers = users.concat({...user, id : this.generateID()})
      this._usersData.next(newUsers)
      this.persistenceSaveUsersData()
    })
  }

  existsEmail(email : string):boolean{
    return this._usersData.value.some(u => u.email === email)
  }

  login(credentials : Exclude<user, "name">):boolean{
      let user : user | undefined  = this._usersData.value.find(u => u.email === credentials.email)
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
      
    let newData = this._usersData.value.map(u => {
        if(u.id === user.id) return user;
        return u;
    })

    this._usersData.next(newData);
    this._userLogged = user;
    this.persistenceSaveUsersData();
    this.saveLocalStorage();
  }

  private generateID():number{

    if(!this._usersData.value.length) return 1;

    let maxId = [...this._usersData.value].sort((a, b) => b.id - a.id);

    return maxId[0].id + 1;

  }

}
