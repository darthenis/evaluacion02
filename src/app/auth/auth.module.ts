import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { PrimengModule } from '../primeng/primeng.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthRoutingModule,
    PrimengModule
  ]
})
export class AuthModule { }
