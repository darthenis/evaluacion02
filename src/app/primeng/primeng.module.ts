import { NgModule } from '@angular/core';

import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';





@NgModule({
  exports:[
    ButtonModule,
    InputTextModule,
    PasswordModule,
    PanelModule
  ]
})
export class PrimengModule { }
