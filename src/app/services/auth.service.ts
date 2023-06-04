import {Injectable} from '@angular/core';
import {Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from '@angular/fire/auth';
import {UserAuthModel} from "../models/front-end/user.model";
import {from, Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {LoginApiActions, LoginPageActions} from "../login/state/actions";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: Auth, private store: Store) {
    const currentUser = this.auth.currentUser;
    if (this.auth.currentUser) {
      this.store.dispatch(LoginApiActions.loginApisSuccess({user: {email: currentUser?.email || ''}}))
    }
  }

  register(userData: UserAuthModel): Observable<any> {
    return from(createUserWithEmailAndPassword(this.auth, userData.email, userData.password))
  }

  login(userData: any): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, userData.email, userData.password))
  }

  logout(): Observable<any> {
    return from(signOut(this.auth));
  }

  test() {
    console.log('user', this.auth.currentUser)
  }
}
