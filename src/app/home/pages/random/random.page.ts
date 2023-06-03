import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {State} from "../../../state/app.state";
import {combineLatest, map, Observable} from "rxjs";
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
  photos$!: Observable<PhotosModel[]>;
  favouritePhotos: FavouritePhoto[] = [];

  constructor(private store: Store<State>, private imageModalService: ImageModalService) {
  }

  ngOnInit(): void {
    this.photos$ = combineLatest([this.store.select(getRandomPhotos), this.store.select(getFavouritePhotos)]).pipe(
      map(([randomPhoto, favourite]) => {
        this.favouritePhotos = favourite;
        return randomPhoto;
      })
    );
    this.error$ = this.store.select(getErrorRandomPhotos);
    this.getPhotos();
  }

  getPhotos() {
    this.store.dispatch(PhotosPageActions.loadRandomPhotos());
  }

  getPhoto(photo: any) {
    const favouritePhoto: FavouritePhoto = {
      id: photo.id,
      url: photo.urls.regular,
      username: photo.user.username,
      description: photo.description
    }
    this.store.dispatch(PhotosPageActions.savePhoto({photo: favouritePhoto}));
    this.store.select(getFavouritePhotos);
  }

  async openModal(photo: any) {
    this.imageModalService.openModal(photo.urls.regular, photo.description, false).then((modelData) => {
      if (modelData.data) {
        this.getPhoto(photo);
      }
    });
  }

  checkIfFavourite(photo: PhotosModel) {
    return this.favouritePhotos.some(fav => fav.url === photo.urls.regular);
  }
}
