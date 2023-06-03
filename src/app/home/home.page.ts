import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, tap} from "rxjs";
import {UserAuthResModel} from "../models/back-end/user-auth.model";
import {select, Store} from "@ngrx/store";
import {AppState} from "@capacitor/app";
import {selectCurrentUser} from "../login/state/auth.reducer";
import {LoginPageActions} from "../login/state/actions";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
user$!: Observable<UserAuthResModel | null>;
  selected = 'favorites';
  constructor(private router: Router,  private store: Store<AppState>, private route: ActivatedRoute) {}

  ionViewWillEnter(){
    this.selected = this.router.url.split('/')[2];
    this.user$ = this.store.pipe(select(selectCurrentUser), tap(res => console.log('userRes', res)));
  }

  changePage($event: any) {
    console.log('changed Page', $event)
  }

   logOut() {
     this.store.dispatch(LoginPageActions.logOutUser());
  }
}
