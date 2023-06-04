import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlertController, LoadingController} from "@ionic/angular";
import {AuthService} from "../services/auth.service";
import {LoginPageActions} from "../login/state/actions";
import {Store} from "@ngrx/store";
import {State} from "../state/app.state";
import {getErrorLoginState} from "../login/state/auth.reducer";
import {Observable} from "rxjs";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  credentials!: FormGroup;
  error$!: Observable<string | null>;

  constructor(
    private store: Store<State>,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  // Easy access for form fields
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

  register(e: Event) {
    e.stopPropagation();
    this.store.dispatch(LoginPageActions.registerUser({
      user: this.credentials.value
    }));
  }

  back(e: Event) {
    e.stopPropagation();
    this.router.navigate(['../'], {relativeTo: this.route})
  }
}
