import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as AppState from '../../state/app.state';
import {FavouritePhotosState, RandomPhotosState, SearchPhotosState} from "./photos.reducers";

// Extends the app state to include the product feature.
// This is required because products are lazy loaded.
// So the reference to ProductState cannot be added to app.state.ts directly.
export interface State extends AppState.State {
  photosRandom: RandomPhotosState;
}

// Selector functions
const getRandomPhotosFeatureState = createFeatureSelector<RandomPhotosState>('photosRandom');
const getSearchFeatureState = createFeatureSelector<SearchPhotosState>('photosSearch');
const getFavouriteFeatureState = createFeatureSelector<FavouritePhotosState>('photosFavourite');

export const getRandomPhotos = createSelector(
  getRandomPhotosFeatureState,
  state => state.photos
);

export const getErrorRandomPhotos = createSelector(
  getRandomPhotosFeatureState,
  state => state.error
);

export const getLoadingRandomPhotos = createSelector(
  getRandomPhotosFeatureState,
  state => state.isLoading
);


export const getSearchPhotos = createSelector(
  getSearchFeatureState,
  state => state.photos
);

export const getErrorSearchPhotos = createSelector(
  getSearchFeatureState,
  state => state.error
);

export const getLoadingSearchPhotos = createSelector(
  getSearchFeatureState,
  state => state.isLoading
);

export const getFavouritePhotos = createSelector(
  getFavouriteFeatureState,
  state => state.photos
);

export const getErrorFavouritePhotos = createSelector(
  getFavouriteFeatureState,
  state => state.error
);

export const getLoadingFavouritePhotos = createSelector(
  getFavouriteFeatureState,
  state => state.isLoading
);
