import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/services/validators.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public loginGroup = this.fb.group({
    email: ['', Validators.required ],
    password: ['', Validators.required ]
  })

  constructor(  private fb : FormBuilder,
                private validatorService: ValidatorsService ){}

  isValidField(field : string):boolean | null{
    return this.validatorService.isValidField(this.loginGroup, field);
  }

  
  onHandleForm():void{
    this.loginGroup.markAllAsTouched();
    if(this.loginGroup.invalid) return;
    // TODO: add service for sign up
    console.log(this.loginGroup.value)
  }


}
