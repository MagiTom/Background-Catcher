import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss'],
})
export class ImageModalComponent implements OnInit {
  favourite!: boolean;
  description = '';
  src = '';

  constructor(private modalCtrl: ModalController) {
  }

  ngOnInit() {
  }

  async cancel() {
    await this.modalCtrl.dismiss();
  }

  async confirm() {
    await this.modalCtrl.dismiss('confirm');
  }

}
