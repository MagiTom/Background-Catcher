import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ScrollTopButtonComponent} from "./scroll-top-button.component";
import {IonicModule} from "@ionic/angular";



@NgModule({
  declarations: [ScrollTopButtonComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [ScrollTopButtonComponent]
})
export class ScrollTopButtonModule { }
