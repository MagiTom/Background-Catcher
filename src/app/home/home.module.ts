import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import {RandomPage} from "./pages/random/random.page";
import {CategoriesPage} from "./pages/categories/categories.page";
import {FavoritesPage} from "./pages/favorites/favorites.page";
import {favouritePhotosReducer, photosReducer, photosSearchReducer} from "./state/photos.reducers";
import {PhotosEffects} from "./state/photos.effects";
import {EffectsModule} from "@ngrx/effects";
import {StoreModule} from "@ngrx/store";
import {ImageCardModule} from "../shared/image-card/image-card.module";
import {ImageModalComponent} from "../shared/image-modal/image-modal.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImageCardModule,
    HomePageRoutingModule,
    StoreModule.forFeature('photosRandom', photosReducer),
    StoreModule.forFeature('photosSearch', photosSearchReducer),
    StoreModule.forFeature('photosFavourite', favouritePhotosReducer),
    EffectsModule.forFeature([PhotosEffects]),
  ],
  declarations: [HomePage, RandomPage, CategoriesPage, FavoritesPage, ImageModalComponent]
})
export class HomePageModule {}
