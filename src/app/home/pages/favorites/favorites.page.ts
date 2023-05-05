import { Component, OnInit } from '@angular/core';
import {PhotosService} from "../../../services/photos.service";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  constructor(private photoService: PhotosService) { }

  ngOnInit() {
    // this.photoService.getAll().subscribe(data => console.log('datatat', data))
  }

}
