import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  private _patternPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ // Minimum eight characters, at least one letter and one number
  private _patternEmail = /^\S+@\S+\.\S+$/


  get patternPassword():RegExp{
    return this._patternPassword;
  }

  get patternEmail():RegExp{
    return this._patternEmail;
  }

  isFieldOneEqualFieldTwo( field1 : string, field2: string){

    return ( formGroup: AbstractControl):ValidationErrors | null =>{

      const fieldValue1 = formGroup.get(field1)?.value;
      const fieldValue2 = formGroup.get(field2)?.value;

      if( fieldValue1 !== fieldValue2 ) {

        console.log('aca')
        formGroup.get(field2)?.setErrors({ notEqual : true })

        return { notEqual : true }

      }

      formGroup.get(field2)?.setErrors(null);
      return null;

    }

  }

  public isValidField( form: FormGroup, field: string ) {
    return form.controls[field].errors && form.controls[field].touched;
  }

  getError(form : FormGroup, field : string):string | null{
    const errors = form.controls[field].errors;
    if(errors){
      return Object.keys(errors)[0]
    }
    return null;
  }


}
