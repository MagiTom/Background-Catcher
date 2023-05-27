import {createAction, props} from "@ngrx/store";
import {PhotosModel} from "../../../models/back-end/photos.model";

export interface photosQuery {
  term: string;
  page: number;
}

export interface FavouritePhoto {
  id: string;
  url: string;
  username: string;
  description: string;
}

export const loadRandomPhotos = createAction(
  '[Photos Page] Load'
);

export const loadSearchPhotos = createAction(
  '[PhotosSearch Page] Load',
  props<{ query: photosQuery }>()
);

export const loadFavouritePhotos = createAction(
  '[PhotosFavourite Page] Load'
);

export const savePhoto = createAction(
  '[Photos Page] Save Photo',
  props<{ photo: FavouritePhoto }>()
);

export const deletePhoto = createAction(
  '[Photos Page] Delete Photo',
    props<{ id: string }>()
)
