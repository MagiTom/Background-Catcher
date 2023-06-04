import {createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';
import {LoginApiActions, LoginPageActions} from './actions';
import {UserAuthResModel} from "../../models/back-end/user-auth.model";

export const authFeatureKey = 'auth';

export interface AuthState {
  userData: UserAuthResModel | null,
  error: string;
}

export const initialState: AuthState = {
  userData: null,
  error: ''
};

const selectAuthFeatureState = createFeatureSelector<AuthState>('user');

export const authReducer = createReducer<AuthState>(
  initialState,
  on(LoginApiActions.loginApisSuccess, (state, action): AuthState => {
    return {
      ...state,
      userData: action.user,
      error: '',
    };
  }),
  on(LoginApiActions.loginApisFailure, (state, action): AuthState => {
    return {
      ...state,
      userData: null,
      error: action.error,
    };
  }),
  on(LoginApiActions.registerApisSuccess, (state, action): AuthState => {
    return {
      ...state,
      userData: action.user,
      error: '',
    };
  }),
  on(LoginApiActions.registerApisFailure, (state, action): AuthState => {
    return {
      ...state,
      userData: null,
      error: action.error
    };
  }),
  on(LoginApiActions.logOutApisSuccess, (state, action): AuthState => {
    return {
      ...state,
      userData: null,
      error: ''
    };
  }),
  on(LoginApiActions.loginApisFailure, (state, action): AuthState => {
    return {
      ...state,
      userData: null,
      error: action.error,
    };
  }),
);

export const selectCurrentUser = createSelector(
  selectAuthFeatureState,
  state => state.userData
);
export const getErrorLoginState = createSelector(
  selectAuthFeatureState,
  state => state.error
);
