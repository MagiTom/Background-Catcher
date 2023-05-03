import {AuthState} from "../login/state/auth.reducer";
import {RandomPhotosState, SearchPhotosState} from "../home/state/photos.reducers";

export interface State {
  user: AuthState;
  photosRandom: RandomPhotosState;
  photosSearch: SearchPhotosState;
  photosFavourite: any;
}
