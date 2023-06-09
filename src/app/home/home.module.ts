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
import {ImageModalModule} from "../shared/image-modal/image-modal.module";
import {ScrollTopButtonModule} from "../shared/scroll-top-button/scroll-top-button.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ImageCardModule,
        HomePageRoutingModule,
        ImageModalModule,
        StoreModule.forFeature('photosRandom', photosReducer),
        StoreModule.forFeature('photosSearch', photosSearchReducer),
        StoreModule.forFeature('photosFavourite', favouritePhotosReducer),
        EffectsModule.forFeature([PhotosEffects]),
        ScrollTopButtonModule,
    ],
  declarations: [HomePage, RandomPage, CategoriesPage, FavoritesPage]
})
export class HomePageModule {}
