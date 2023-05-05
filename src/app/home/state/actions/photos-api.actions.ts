import {createAction, props} from "@ngrx/store";
import {PhotosModel, SearchPhotos} from "../../../models/back-end/photos.model";
import {FavouritePhoto} from "./photos-page.actions";

export const loadRandomPhotosSuccess = createAction(
  '[Photos API] Load Success',
  props<{ photos: PhotosModel[] }>()
);

export const loadRandomPhotosFailure = createAction(
  '[Photos API] Load Fail',
  props<{ error: string }>()
);

export const loadSearchPhotosSuccess = createAction(
  '[PhotosSearch API] Load Success',
  props<{ photos: SearchPhotos }>()
);

export const loadSearchPhotosFailure = createAction(
  '[PhotosSearch API] Load Fail',
  props<{ error: string }>()
);

export const loadFavouritePhotosSuccess = createAction(
  '[PhotosFavourite API] Load Success',
  props<{ photos: FavouritePhoto[] }>()
);

export const loadFavouritePhotosFailure = createAction(
  '[PhotosFavourite API] Load Fail',
  props<{ error: string }>()
);

export const savePhotoSuccess = createAction(
  '[Photos API] Save Photo Success',
  props<{ photo: FavouritePhoto }>()
);

export const savePhotoFailure = createAction(
  '[Photos API] Save Photo Fail',
  props<{ error: string }>()
);
