import {Component, OnInit} from '@angular/core';
import {PhotosService} from "../../../services/photos.service";
import {Observable} from "rxjs";
import {FavouritePhoto} from "../../state/actions/photos-page.actions";
import {Store} from "@ngrx/store";
import {State} from "../../../state/app.state";
import {PhotosPageActions} from "../../state/actions";
import {getErrorFavouritePhotos, getFavouritePhotos} from "../../state";
import {ModalController} from "@ionic/angular";
import {ImageModalService} from "../../../services/image-modal.service";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  isLoading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  photos$!: Observable<FavouritePhoto[] | null>

  constructor(private photoService: PhotosService, private store: Store<State>,
              private modalCtrl: ModalController, private imageModalService: ImageModalService) {
  }

  ngOnInit() {
    this.photos$ = this.store.select(getFavouritePhotos);
    this.error$ = this.store.select(getErrorFavouritePhotos);
    this.store.dispatch(PhotosPageActions.loadFavouritePhotos());
  }

  removePhoto(photo: FavouritePhoto) {
    this.store.dispatch(PhotosPageActions.deletePhoto({id: photo.id}))
  }

  async openModal(photo: FavouritePhoto) {
    this.imageModalService.openModal(photo.url, photo.description, true).then((modelData) =>{
        if (modelData.data) {
          this.removePhoto(photo);
        }
    });
  }
}
