import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, of, switchMap, throwError } from 'rxjs';
import { user } from 'src/app/shared/intefaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _usersData : user[] = []
  private _userLogged : user = {} as user;

  constructor(  private router : Router,
                private http : HttpClient ){
                  this.loadLocalStorage();
                }

  private loadLocalStorage():void{
    let userLogged : user = JSON.parse(localStorage.getItem('loggedUser') ?? "{}")
    let usersData = JSON.parse(localStorage.getItem('usersData') ?? "[]")
    this._userLogged = userLogged;
    this._usersData = usersData;
    console.log(this._usersData)
  }

  private saveLocalStorage():void{
    localStorage.setItem('usersData', JSON.stringify(this._usersData))
    localStorage.setItem('loggedUser', JSON.stringify(this._userLogged))
  }

  private existsEmail(email : string):Observable<boolean>{
        if(this._usersData.some(u => u.email === email)) return throwError(() => new Error('Already exits'))
        return of(false)
  }

  private saveUser(user : user):Observable<boolean>{
              this._usersData = this._usersData.concat({...user, id : this.generateID()})
              this.saveLocalStorage()
              return of(true)
  }

  registerUser(user : user):Observable<boolean>{
    return this.existsEmail(user.email)
                .pipe(
                  catchError(err => {
                    console.log('err')
                    throw err
                  }),
                  switchMap(() => this.saveUser(user) ),
                )
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
