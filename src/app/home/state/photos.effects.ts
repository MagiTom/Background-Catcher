import {Injectable} from '@angular/core';

import {mergeMap, map, catchError, concatMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {PhotosService} from "../../services/photos.service";
import {PhotosApiActions, PhotosPageActions} from "./actions";


@Injectable()
export class PhotosEffects {

  constructor(private actions$: Actions, private photosService: PhotosService) {
  }

  loadRandomPhotos$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(PhotosPageActions.loadRandomPhotos),
        mergeMap(() => this.photosService.getRandomPhotos()
          .pipe(
            map(photos => PhotosApiActions.loadRandomPhotosSuccess({photos})),
            catchError(error => of(PhotosApiActions.loadRandomPhotosFailure({error})))
          )
        )
      );
  });

  loadSearchPhotos$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(PhotosPageActions.loadSearchPhotos),
        concatMap(action => this.photosService.getPhotos(action.query.page, action.query.term)
          .pipe(
            map(photos => PhotosApiActions.loadSearchPhotosSuccess({photos})),
            catchError(error => of(PhotosApiActions.loadSearchPhotosFailure({error})))
          )
        )
      );
  });

  loadFavouritePhoto$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(PhotosPageActions.loadFavouritePhotos),
        concatMap(action => this.photosService.getFavouriteList()
          .pipe(
            map(photos => PhotosApiActions.loadFavouritePhotosSuccess({photos})),
            catchError(error => of(PhotosApiActions.loadFavouritePhotosFailure({error})))
          )
        )
      );
  });

  saveFavouritePhoto$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(PhotosPageActions.savePhoto),
        concatMap(action => this.photosService.addFavouriteToDatabase(action.photo)
          .pipe(
            map(photo => PhotosApiActions.savePhotoSuccess({photo})),
            catchError(error => of(PhotosApiActions.savePhotoFailure({error})))
          )))
  })

  deleteProduct$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(PhotosPageActions.deletePhoto),
        mergeMap(action =>
          this.photosService.deleteFavourite(action.id).pipe(
            map(() => PhotosApiActions.deletePhotoSuccess({ id: action.id })),
            catchError(error => of(PhotosApiActions.deletePhotoFailure({ error })))
          )
        )
      );
  });
}

