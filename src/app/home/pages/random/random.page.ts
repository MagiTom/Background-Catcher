import { Component, OnInit } from '@angular/core';
import {select, Store} from "@ngrx/store";
import {State} from "../../../state/app.state";
import {Observable} from "rxjs";
import {PhotosModel} from "../../../models/back-end/photos.model";
import {getErrorRandomPhotos, getRandomPhotos} from "../../state";
import {PhotosPageActions} from "../../state/actions";

@Component({
  selector: 'app-random',
  templateUrl: './random.page.html',
  styleUrls: ['./random.page.scss'],
})
export class RandomPage implements OnInit {
  isLoading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  photos$!: Observable<PhotosModel[]>
  constructor(private store: Store<State>) {

  }

  ngOnInit(): void {
    this.photos$ = this.store.select(getRandomPhotos);

    // Do NOT subscribe here because it uses an async pipe
    this.error$ = this.store.select(getErrorRandomPhotos);

    this.store.dispatch(PhotosPageActions.loadRandomPhotos());
  }

  ionViewWillEnter() {

  }

}
