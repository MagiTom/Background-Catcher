import {PhotosModel, SearchPhotos} from "../../models/back-end/photos.model";
import {PhotosApiActions, PhotosPageActions} from "./actions";
import {createReducer, on} from "@ngrx/store";
import {FavouritePhoto} from "./actions/photos-page.actions";

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

export interface FavouritePhotosState extends PhotosState{
  photos: FavouritePhoto[];
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

const initialFavouritePhotosState: FavouritePhotosState = {
  isLoading: false,
  photos: [],
  error: ''
}


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
      isLoading: false,
      photos: action.photos,
      error: ''
    };
  }),
  on(PhotosApiActions.loadRandomPhotosFailure, (state, action): RandomPhotosState => {
    return {
      ...state,
      isLoading: false,
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
      isLoading: false,
      photos: action.photos,
      error: ''
    };
  }),
  on(PhotosApiActions.loadSearchPhotosFailure, (state, action): SearchPhotosState => {
    return {
      ...state,
      isLoading: false,
      photos: null,
      error: action.error
    };
  }),
);

export const favouritePhotosReducer = createReducer<FavouritePhotosState>(
  initialFavouritePhotosState,
  on(PhotosPageActions.loadFavouritePhotos, (state): FavouritePhotosState => {
    return {
      ...state,
      isLoading: true
    };
  }),
  on(PhotosApiActions.loadFavouritePhotosSuccess, (state, action): FavouritePhotosState => {
    return {
      ...state,
      isLoading: false,
      photos: action.photos,
      error: ''
    };
  }),
  on(PhotosApiActions.loadFavouritePhotosFailure, (state, action): FavouritePhotosState => {
    return {
      ...state,
      isLoading: false,
      photos: [],
      error: action.error
    };
  }),
  on(PhotosPageActions.savePhoto, (state, action): FavouritePhotosState => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(PhotosApiActions.savePhotoSuccess, (state, action): FavouritePhotosState => {
    return {
      ...state,
      isLoading: false,
      photos: [...state.photos, action.photo],
      error: ''
    };
  }),
  on(PhotosApiActions.savePhotoFailure, (state, action): FavouritePhotosState => {
    return {
      ...state,
      isLoading: false,
      error: action.error
    };
  }),
)
