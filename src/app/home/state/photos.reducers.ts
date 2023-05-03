import {PhotosModel, SearchPhotos} from "../../models/back-end/photos.model";
import {PhotosApiActions, PhotosPageActions} from "./actions";
import {createReducer, on} from "@ngrx/store";

export interface PhotosState{
  isLoading: boolean;
  error: string;
}
export interface RandomPhotosState extends PhotosState{
  photos: PhotosModel[];
}

export interface SearchPhotosState extends PhotosState{
  photos: SearchPhotos | null;
}

const initialState: RandomPhotosState = {
  isLoading: false,
  photos: [],
  error: ''
};
const initialSearchState: SearchPhotosState = {
  isLoading: false,
  photos: null,
  error: ''
};

export const photosReducer = createReducer<RandomPhotosState>(
  initialState,
  on(PhotosPageActions.loadRandomPhotos, (state): RandomPhotosState => {
    return {
      ...state,
      isLoading: true
    };
  }),
  on(PhotosApiActions.loadRandomPhotosSuccess, (state, action): RandomPhotosState => {
    return {
      ...state,
      photos: action.photos,
      error: ''
    };
  }),
  on(PhotosApiActions.loadRandomPhotosFailure, (state, action): RandomPhotosState => {
    return {
      ...state,
      photos: [],
      error: action.error
    };
  }),
);

export const photosSearchReducer = createReducer<SearchPhotosState>(
  initialSearchState,
  on(PhotosPageActions.loadSearchPhotos, (state): SearchPhotosState => {
    return {
      ...state,
      isLoading: true
    };
  }),
  on(PhotosApiActions.loadSearchPhotosSuccess, (state, action): SearchPhotosState => {
    return {
      ...state,
      photos: action.photos,
      error: ''
    };
  }),
  on(PhotosApiActions.loadSearchPhotosFailure, (state, action): SearchPhotosState => {
    return {
      ...state,
      photos: null,
      error: action.error
    };
  }),
);
