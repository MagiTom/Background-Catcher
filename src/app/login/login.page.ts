import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlertController, LoadingController} from "@ionic/angular";
import {AuthService} from "../services/auth.service";
import {Store} from "@ngrx/store";
import {State} from "../state/app.state";
import {LoginApiActions, LoginPageActions} from './state/actions';
import {Observable} from "rxjs";
import {getErrorFavouritePhotos} from "../home/state";
import {getErrorLoginState} from "./state/auth.reducer";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials!: FormGroup;
  error$!: Observable<string | null>;

  constructor(private fb: FormBuilder,
              private loadingController: LoadingController,
              private alertController: AlertController,
              private authService: AuthService,
              private router: Router, private store: Store<State>) {
  }

  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
  }

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.error$ = this.store.select(getErrorLoginState);
  }

  async login(e: Event) {
    e.stopPropagation();
    this.store.dispatch(LoginPageActions.loginUser({
      user: this.credentials.value
    }));

  }

  goToRegistration(e: Event) {
    e.stopPropagation();
    this.router.navigate(['registration'])
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
