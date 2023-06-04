import {Component, OnInit, ViewChild} from '@angular/core';
import {combineLatest, map, Observable} from "rxjs";
import {PhotosResult, SearchPhotos} from "../../../models/back-end/photos.model";
import {getErrorSearchPhotos, getFavouritePhotos, getSearchPhotos} from "../../state";
import {PhotosPageActions} from "../../state/actions";
import {Store} from "@ngrx/store";
import {State} from "../../../state/app.state";
import {FavouritePhoto, photosQuery} from "../../state/actions/photos-page.actions";
import {categories, Category} from "../../util/categories";
import {ImageModalService} from "../../../services/image-modal.service";
import {IonContent} from "@ionic/angular";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  @ViewChild('content', { static: false }) content!: IonContent;
  isLoading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  photos$!: Observable<SearchPhotos | null>
  query!: photosQuery;
  categories = categories;
  favouritePhotos: FavouritePhoto[] = [];
  searchValue = '';
  constructor(private store: Store<State>, private imageModalService: ImageModalService) { }

  ngOnInit() {
    this.query = {
      term: this.categories[0].name,
      page: 1
    }
    this.photos$ = combineLatest([this.store.select(getSearchPhotos), this.store.select(getFavouritePhotos)]).pipe(
      map(([randomPhoto, favourite]) => {
        this.favouritePhotos = favourite;
        return randomPhoto;
      })
    );
    this.error$ = this.store.select(getErrorSearchPhotos);
    this.getPhotos();
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

  getCategory(name: string) {
    this.query = {
      ...this.query,
      term: name
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
