import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {LoginPageRoutingModule} from './login-routing.module';

import {LoginPage} from './login.page';
import {authReducer} from "./state/auth.reducer";
import {StoreModule} from "@ngrx/store";
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './state/auth.effects';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature('user', authReducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {
}
