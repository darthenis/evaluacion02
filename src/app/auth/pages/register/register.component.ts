import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/services/validators.service';

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
        rPassword: ['', [Validators.required]]
      }, {
        validators: [
          this.validatorService.isFieldOneEqualFieldTwo('password', 'rPassword')
        ]
  })
    

  constructor(private fb : FormBuilder,
              private validatorService : ValidatorsService){}

  onHandleForm():void{
    this.formRegister.markAllAsTouched();
    if(this.formRegister.invalid) return;
    // TODO: add service for sign up
    console.log(this.formRegister.value)
  }

  isValidField(field : string):boolean | null{
    return this.validatorService.isValidField(this.formRegister, field);
  }

  getError(field : string){
    return this.validatorService.getError(this.formRegister, field);
  }

}
