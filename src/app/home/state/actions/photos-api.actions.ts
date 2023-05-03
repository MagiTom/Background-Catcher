import {createAction, props} from "@ngrx/store";
import {PhotosModel, SearchPhotos} from "../../../models/back-end/photos.model";

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
