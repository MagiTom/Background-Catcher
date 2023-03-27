import { createAction, props } from '@ngrx/store';
import {UserAuthModel} from "../../../models/front-end/user.model";
import {UserAuthResModel} from "../../../models/back-end/user-auth.model";

export const registerUser = createAction(
  '[Login Page] Register User',
  props<{ user: UserAuthModel }>()
);

export const loginUser = createAction(
  '[Login Page] Login User',
  props<{ user: UserAuthResModel }>()
);

export const logOutUser = createAction(
  '[Login Page] LogOut User'
);

