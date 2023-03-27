import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {LoginApiActions, LoginPageActions} from './actions';
import {registerUser} from "./actions/login-page.actions";
import {catchError, concatMap, defer, exhaustMap, from, map, of, tap} from "rxjs";
import {AuthService} from "../../services/auth.service";
import {registerApisFailure, registerApisSuccess} from "./actions/login-api.actions";
import {Router} from "@angular/router";


@Injectable()
export class AuthEffects {


  constructor(private actions$: Actions, private authService: AuthService, private router: Router) {
  }

  createUser$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(LoginPageActions.registerUser),
        concatMap(action =>
          from(this.authService.register(action.user))
            .pipe(
              map(action => LoginApiActions.registerApisSuccess({user: {email: action.user.email}})),
              catchError(error => of(LoginApiActions.registerApisFailure({error})))
            )
        ),
        tap(() => this.router.navigateByUrl('/home', {replaceUrl: true})),
      );
  });

  loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginPageActions.loginUser),
      exhaustMap(action =>
        this.authService.login(action.user).pipe(
          map(action => LoginApiActions.loginApisSuccess({user: {email: action.user.email}})),
          tap(user => this.router.navigateByUrl('/home', {replaceUrl: true})),
          catchError(error => of(LoginApiActions.loginApisFailure({error})))
        )
      )
    )
  );

  logOutUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginPageActions.logOutUser),
      exhaustMap(action =>
        this.authService.logout().pipe(
          map(action => LoginApiActions.logOutApisSuccess()),
          tap(user => this.router.navigateByUrl('/', {replaceUrl: true})),
          catchError(error => of(LoginApiActions.logOutApisFailure({error})))
        )
      )
    )
  );

}
