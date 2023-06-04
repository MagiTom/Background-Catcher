import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, tap} from "rxjs";
import {UserAuthResModel} from "../models/back-end/user-auth.model";
import {select, Store} from "@ngrx/store";
import {AppState} from "@capacitor/app";
import {selectCurrentUser} from "../login/state/auth.reducer";
import {LoginPageActions} from "../login/state/actions";
import {MenuController} from "@ionic/angular";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  user$!: Observable<UserAuthResModel | null>;
  selected = 'favorites';
  routingElements = {
    categories: 'categories',
    random: 'random',
    favorites: 'favorites'
  }

  constructor(private router: Router,
              private route: ActivatedRoute,
              private store: Store<AppState>,
              private menu: MenuController) {
  }

  ionViewWillEnter() {
    const currentUrl = this.router.url.split('/')[2];
    currentUrl ? this.selected = currentUrl : this.selected;
    this.router.navigate([`${this.selected}`], {relativeTo: this.route})
    this.user$ = this.store.pipe(select(selectCurrentUser));
  }


  logOut() {
    this.store.dispatch(LoginPageActions.logOutUser());
  }

  async closeMenu(url: string) {
    this.selected = url;
    await this.menu.close();
  }
}
