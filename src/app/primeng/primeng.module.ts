import { NgModule } from '@angular/core';

import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';



@NgModule({
  exports:[
    ButtonModule,
    InputTextModule,
    PasswordModule,
  ]
})
export class PrimengModule { }
