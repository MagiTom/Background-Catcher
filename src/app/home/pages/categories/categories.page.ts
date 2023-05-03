import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {PhotosModel, SearchPhotos} from "../../../models/back-end/photos.model";
import {getErrorRandomPhotos, getErrorSearchPhotos, getRandomPhotos, getSearchPhotos} from "../../state";
import {PhotosPageActions} from "../../state/actions";
import {Store} from "@ngrx/store";
import {State} from "../../../state/app.state";
import {photosQuery} from "../../state/actions/photos-page.actions";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  isLoading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  photos$!: Observable<SearchPhotos | null>
  query!: photosQuery;
  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.query = {
      term: 'office',
      page: 1
    }
    this.photos$ = this.store.select(getSearchPhotos);

    // Do NOT subscribe here because it uses an async pipe
    this.error$ = this.store.select(getErrorSearchPhotos);

    this.store.dispatch(PhotosPageActions.loadSearchPhotos({query: this.query}));
  }

}
