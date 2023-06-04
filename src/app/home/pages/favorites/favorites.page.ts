import {Component, OnInit, ViewChild} from '@angular/core';
import {PhotosService} from "../../../services/photos.service";
import {map, Observable, tap} from "rxjs";
import {FavouritePhoto} from "../../state/actions/photos-page.actions";
import {Store} from "@ngrx/store";
import {State} from "../../../state/app.state";
import {PhotosPageActions} from "../../state/actions";
import {getErrorFavouritePhotos, getFavouritePhotos} from "../../state";
import {IonContent, ModalController} from "@ionic/angular";
import {ImageModalService} from "../../../services/image-modal.service";
import {download} from "ionicons/icons";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  @ViewChild('content', { static: false }) content!: IonContent;
  isLoading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  photos$!: Observable<FavouritePhoto[] | null>

  constructor(private photoService: PhotosService, private store: Store<State>,
              private modalCtrl: ModalController, private imageModalService: ImageModalService) {
  }

  ngOnInit() {
    this.photos$ = this.store.select(getFavouritePhotos).pipe(map(data => !data || !data?.length? null : data));
    this.error$ = this.store.select(getErrorFavouritePhotos);
    this.store.dispatch(PhotosPageActions.loadFavouritePhotos());
  }

  removePhoto(photo: FavouritePhoto) {
    this.store.dispatch(PhotosPageActions.deletePhoto({id: photo.id}))
  }

  async openModal(photo: FavouritePhoto) {
    this.imageModalService.openModal(photo.url, photo.description, true).then((modelData) =>{
        if (modelData.data) {
          this.removePhoto(photo);
        }
    });
  }

  protected readonly download = download;

}
