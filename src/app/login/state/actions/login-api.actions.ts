import { createAction, props } from '@ngrx/store';
import {UserAuthResModel} from "../../../models/back-end/user-auth.model";

export const loginApisSuccess = createAction(
  '[LoginApi] LoginApis Success',
  props<{ user: UserAuthResModel }>()
);

export const loginApisFailure = createAction(
  '[LoginApi] LoginApis Failure',
  props<{ error: any }>()
);

export const registerApisSuccess = createAction(
  '[LoginApi] RegisterApis Success',
  props<{ user: UserAuthResModel }>()
);

export const registerApisFailure = createAction(
  '[LoginApi] RegisterApis Failure',
  props<{ error: any }>()
);

export const logOutApisSuccess = createAction(
  '[LoginApi] LogOutApis Success',
  // props<{ user: UserAuthResModel }>()
);

export const logOutApisFailure = createAction(
  '[LoginApi] LogOutApis Failure',
  props<{ error: any }>()
);
