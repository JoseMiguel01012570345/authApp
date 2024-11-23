import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';


@NgModule({
  declarations: [ AuthLayoutComponent ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
