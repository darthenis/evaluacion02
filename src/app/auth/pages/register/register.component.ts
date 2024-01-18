import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { regexEmail, regexPassword } from 'src/app/shared/validators/validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public formRegister : FormGroup = this.fb.group({
    name : ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern(this.validatorService.patternEmail)]],
    password: ['', [Validators.required, Validators.pattern(this.validatorService.patternPassword)]],
    rpassword: ['', Validators.required]
  })

  constructor(private fb : FormBuilder,
              private validatorService : ValidatorsService){}

  onHandleForm():void{
    console.log(this.formRegister.value)
    console.log(this.formRegister.errors)
  }

}
