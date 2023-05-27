import { Component, OnInit } from '@angular/core';
import {PhotosService} from "../../../services/photos.service";
import {Observable} from "rxjs";
import {SearchPhotos} from "../../../models/back-end/photos.model";
import {FavouritePhoto} from "../../state/actions/photos-page.actions";
import {Store} from "@ngrx/store";
import {State} from "../../../state/app.state";
import {PhotosPageActions} from "../../state/actions";
import {getErrorFavouritePhotos, getErrorSearchPhotos, getFavouritePhotos, getSearchPhotos} from "../../state";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  isLoading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  photos$!: Observable<FavouritePhoto[] | null>
  constructor(private photoService: PhotosService, private store: Store<State>) { }

  ngOnInit() {
    this.photos$ = this.store.select(getFavouritePhotos);
    this.error$ = this.store.select(getErrorFavouritePhotos);

    this.store.dispatch(PhotosPageActions.loadFavouritePhotos());
  }

  removePhoto(photo: FavouritePhoto) {
    this.store.dispatch(PhotosPageActions.deletePhoto({ id: photo.id }))
  }
}
