import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import {CategoriesPage} from "./pages/categories/categories.page";
import {RandomPage} from "./pages/random/random.page";
import {FavoritesPage} from "./pages/favorites/favorites.page";

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'categories',
        component: CategoriesPage
      },
      {
        path: 'random',
        component: RandomPage
      },
      {
        path: 'favorites',
        component: FavoritesPage
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
