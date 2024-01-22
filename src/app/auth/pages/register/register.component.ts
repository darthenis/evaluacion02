import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
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
              private validatorService : ValidatorsService,
              private userService : UserService ){}

  onHandleForm():void{
    this.formRegister.markAllAsTouched();
    if(this.formRegister.invalid) return;
    this.userService.registerUser(this.formRegister.value)
              .subscribe({
                next: res => alert("logrado"),
                error: err => alert(err),
              })
  }

  isValidField(field : string):boolean | null{
    return this.validatorService.isValidField(this.formRegister, field);
  }

  getError(field : string){
    return this.validatorService.getError(this.formRegister, field);
  }

}
