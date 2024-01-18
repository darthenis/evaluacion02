import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  private _patternPassword = "^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$" // Minimum eight characters, at least one letter and one number
  private _patternEmail = '/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/'


  get patternPassword():string{
    return this._patternPassword;
  }

  get patternEmail():string{
    return this._patternEmail;
  }

}
