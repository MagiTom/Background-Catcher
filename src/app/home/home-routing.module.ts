import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'categories',
        loadChildren: () => import('./pages/categories/categories.module').then( m => m.CategoriesPageModule)
      },
      {
        path: 'random',
        loadChildren: () => import('./pages/random/random.module').then( m => m.RandomPageModule)
      },
      {
        path: 'favorites',
        loadChildren: () => import('./pages/favorites/favorites.module').then( m => m.FavoritesPageModule)
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
