import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ImageModalComponent} from "./image-modal.component";
import {IonicModule} from "@ionic/angular";



@NgModule({
  declarations: [ImageModalComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [ImageModalComponent]
})
export class ImageModalModule { }
