import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlertController, LoadingController} from "@ionic/angular";
import {AuthService} from "../services/auth.service";
import {Store} from "@ngrx/store";
import {State} from "../state/app.state";
import {LoginApiActions, LoginPageActions} from './state/actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials!: FormGroup;

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
  }

  async login() {
    // const loading = await this.loadingController.create();
    // await loading.present();
    //
    // const user = await this.authService.login(this.credentials.value);
    // await loading.dismiss();
    //
    // if (user) {
    //   this.router.navigateByUrl('/home', {replaceUrl: true});
    // } else {
    //   this.showAlert('Login failed', 'Please try again!');
    // }
    this.store.dispatch(LoginPageActions.loginUser({
      user: this.credentials.value
    }));

  }

  goToRegistration() {
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
