import {Component, OnInit} from '@angular/core';
import {combineLatest, map, Observable} from "rxjs";
import {PhotosModel, PhotosResult, SearchPhotos} from "../../../models/back-end/photos.model";
import {getErrorSearchPhotos, getFavouritePhotos, getRandomPhotos, getSearchPhotos} from "../../state";
import {PhotosPageActions} from "../../state/actions";
import {Store} from "@ngrx/store";
import {State} from "../../../state/app.state";
import {FavouritePhoto, photosQuery} from "../../state/actions/photos-page.actions";
import {categories, Category} from "../../util/categories";
import {ImageModalService} from "../../../services/image-modal.service";

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
  favouritePhotos: FavouritePhoto[] = [];
  constructor(private store: Store<State>, private imageModalService: ImageModalService) { }

  ngOnInit() {
    this.query = {
      term: 'office',
      page: 1
    }
    this.photos$ = combineLatest([this.store.select(getSearchPhotos), this.store.select(getFavouritePhotos)]).pipe(
      map(([randomPhoto, favourite]) => {
        this.favouritePhotos = favourite;
        return randomPhoto;
      })
    );
    this.error$ = this.store.select(getErrorSearchPhotos);
    // this.getPhotos();
  }

  getPhotos(){
    this.store.dispatch(PhotosPageActions.loadSearchPhotos({query: this.query}));
  }

  getPhoto(photo: PhotosResult) {
    const favouritePhoto: FavouritePhoto = {
      id: photo.id,
      url: photo.urls.regular,
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

  async openModal(photo: any) {
    this.imageModalService.openModal(photo.urls.regular, photo.description, false).then((modelData) => {
      if (modelData.data) {
        this.getPhoto(photo);
      }
    });
  }
  checkIfFavourite(photo: PhotosResult) {
    return this.favouritePhotos.some(fav => fav.url === photo.urls.regular);
  }
}
