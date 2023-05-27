import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ImageCardComponent} from "./image-card.component";
import {IonicModule} from "@ionic/angular";



@NgModule({
  declarations: [ImageCardComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [ImageCardComponent]
})
export class ImageCardModule { }
