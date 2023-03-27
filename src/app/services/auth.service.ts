import {Injectable} from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from '@angular/fire/auth';
import {UserAuthModel} from "../models/front-end/user.model";
import {defer, from, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: Auth) {
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
}
