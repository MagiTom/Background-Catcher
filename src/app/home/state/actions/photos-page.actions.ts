import {createAction, props} from "@ngrx/store";
import {PhotosModel} from "../../../models/back-end/photos.model";

export interface photosQuery{
  term: string;
  page: number;
}

export const loadRandomPhotos = createAction(
  '[Photos Page] Load'
);

export const loadSearchPhotos = createAction(
  '[PhotosSearch Page] Load',
  props<{ query: photosQuery }>()
);
