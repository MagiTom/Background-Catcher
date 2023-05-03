import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {PhotosModel, SearchPhotos} from "../models/back-end/photos.model";
import {Observable} from "rxjs";
import {addDoc, collection, collectionData, Firestore} from "@angular/fire/firestore";
import {fromPromise} from "rxjs/internal/observable/innerFrom";

@Injectable({
  providedIn: 'root'
})
export class PhotosService {
  url = environment.unsplashApi;
  headers = new HttpHeaders({
    // Authorization: 'Client-ID ' + environment.UNSPLASH_API_KEY,
    'Content-Type': 'application/json',
    'Accept-Version': 'v1'
  })

  photosCollection;

  constructor(private http: HttpClient, private readonly firestore: Firestore) {
    this.photosCollection = collection(this.firestore, 'favorites');
  }

  getPhotos(page: number, query: string) {
    const options = {
      params: new HttpParams()
        .set('client_id', environment.UNSPLASH_API_KEY)
        .set('page', page)
        .set('query', query),
      headers: this.headers
    };
    return this.http.get<SearchPhotos>(`${this.url}/search/photos`, options)
  }

  getRandomPhotos(): Observable<PhotosModel[]> {
    const count = 10;
    const options = {
      params: new HttpParams()
        .set('client_id', environment.UNSPLASH_API_KEY)
        .set('count', count),
      headers: this.headers
    };
    return this.http.get<PhotosModel[]>(`${this.url}/photos/random`, options)
  }

  getFavoritesPhotos(){
    return collectionData(this.photosCollection, {
      idField: 'id',
    }) as Observable<any>;
  }

  createFavoritesPhoto(photo: any) {
    return fromPromise(addDoc(this.photosCollection, photo));
  }
}
// https://betterprogramming.pub/angular-13-firebase-crud-tutorial-with-angularfire-7-2d6980dcc091
