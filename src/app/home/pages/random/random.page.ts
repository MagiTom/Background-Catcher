import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {State} from "../../../state/app.state";
import {Observable} from "rxjs";
import {PhotosModel, PhotosResult} from "../../../models/back-end/photos.model";
import {getErrorRandomPhotos, getFavouritePhotos, getRandomPhotos} from "../../state";
import {PhotosPageActions} from "../../state/actions";
import {FavouritePhoto} from "../../state/actions/photos-page.actions";
import {ImageModalService} from "../../../services/image-modal.service";

@Component({
  selector: 'app-random',
  templateUrl: './random.page.html',
  styleUrls: ['./random.page.scss'],
})
export class RandomPage implements OnInit {
  isLoading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  photos$!: Observable<PhotosModel[]>

  constructor(private store: Store<State>, private imageModalService: ImageModalService) {
  }

  ngOnInit(): void {
    this.photos$ = this.store.select(getRandomPhotos);
    this.error$ = this.store.select(getErrorRandomPhotos);
    this.getPhotos();
    this.store.select(getFavouritePhotos).subscribe(data => console.log('data', data));
  }

  getPhotos() {
    this.store.dispatch(PhotosPageActions.loadRandomPhotos());
  }

  getPhoto(photo: any) {
    const favouritePhoto: FavouritePhoto = {
      id: photo.id,
      url: photo.urls.small,
      username: photo.user.username,
      description: photo.description
    }
    this.store.dispatch(PhotosPageActions.savePhoto({photo: favouritePhoto}));
    this.store.select(getFavouritePhotos);
  }

  async openModal(photo: any) {
    this.imageModalService.openModal(photo.urls.small, photo.description, false).then((modelData) => {
      if (modelData.data) {
        this.getPhoto(photo);
      }
    });
  }
}
