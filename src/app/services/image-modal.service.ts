import {Injectable} from '@angular/core';
import {Store} from "@ngrx/store";
import {State} from "../state/app.state";
import {ModalController} from "@ionic/angular";
import {ImageModalComponent} from "../shared/image-modal/image-modal.component";

@Injectable({
  providedIn: 'root'
})
export class ImageModalService {
  constructor(private store: Store<State>, private modalCtrl: ModalController) { }

  async openModal(src: string, description: string, isFavouritePage: boolean) {
    const modal = await this.modalCtrl.create({
      component: ImageModalComponent,
      componentProps: {
        favourite: isFavouritePage,
        description,
        src
      },
    });
    await modal.present();
    return modal.onDidDismiss();
  }
}
