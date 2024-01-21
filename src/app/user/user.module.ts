import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { PrimengModule } from '../primeng/primeng.module';
import { ViewDataComponent } from './pages/view-data/view-data.component';


@NgModule({
  declarations: [
    ViewDataComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    PrimengModule
  ]
})
export class UserModule { }
