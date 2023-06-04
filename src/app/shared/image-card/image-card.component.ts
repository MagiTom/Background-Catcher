import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FavouritePhoto} from "../../home/state/actions/photos-page.actions";
import {PhotosService} from "../../services/photos.service";
import {ToastController} from "@ionic/angular";

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.scss'],
})
export class ImageCardComponent implements OnInit {
  @Input() src = '';
  @Input() author = '';
  @Input() favourite = false;
  @Output() clickAction = new EventEmitter();
  @Output() openCard = new EventEmitter();

  constructor(private photoService: PhotosService, public toastController: ToastController) {
  }

  ngOnInit() {
  }

  goToAction(e: Event) {
    e.stopPropagation();
    this.clickAction.emit();
  }

  async downLoadImage(e: Event) {
    e.stopPropagation();
    await this.photoService.downLoadPhoto(this.src);
    await this.displayToast();
  }

  displayToast() {
    this.toastController.create({
      message: 'Image downloaded!',
      position: 'bottom',
      duration: 2000
    }).then((toast) => {
      toast.present();
    });
  }

  openCardAction() {
    this.openCard.emit();
  }

}
