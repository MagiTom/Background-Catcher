import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {PhotosResult, SearchPhotos} from "../../../models/back-end/photos.model";
import {getErrorSearchPhotos, getSearchPhotos} from "../../state";
import {PhotosPageActions} from "../../state/actions";
import {Store} from "@ngrx/store";
import {State} from "../../../state/app.state";
import {FavouritePhoto, photosQuery} from "../../state/actions/photos-page.actions";
import {categories, Category} from "../../util/categories";

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
  categories = categories;
  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.query = {
      term: 'office',
      page: 1
    }
    this.photos$ = this.store.select(getSearchPhotos);
    this.error$ = this.store.select(getErrorSearchPhotos);
    // this.getPhotos();
  }

  getPhotos(){
    this.store.dispatch(PhotosPageActions.loadSearchPhotos({query: this.query}));
  }

  getPhoto(photo: PhotosResult) {
    const favouritePhoto: FavouritePhoto = {
      id: photo.id,
      url: photo.urls.small,
      username: photo.user.username,
      description: photo.description
    }
    this.store.dispatch(PhotosPageActions.savePhoto({ photo: favouritePhoto }))
  }

  getCategory(category: Category) {
    this.query = {
      ...this.query,
      term: category.name
    }
    this.getPhotos();
  }
}
