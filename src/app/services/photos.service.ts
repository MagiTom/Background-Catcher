import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {PhotosModel, SearchPhotos} from "../models/back-end/photos.model";
import {from, map, Observable} from "rxjs";
import {FavouritePhoto} from "../home/state/actions/photos-page.actions";
import {Store} from "@ngrx/store";
import {State} from "../state/app.state";
import {AngularFirestore} from "@angular/fire/compat/firestore";

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
  dataSource : any;

  constructor(private http: HttpClient, private db: AngularFirestore, private store: Store<State>) {

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

  getFavoritesPhotos() {
    // return collectionData(this.photosCollection, {
    //   idField: 'id',
    // }) as Observable<any>;
  }

  delete(id : string){
    // this.store.collection('list').doc(id).delete();
  }

  getAll(){
   return this.db.collection('favourite').valueChanges()
      // .pipe(map(response =>{
      //   return this.dataSource = response.map(item =>
      //     Object.assign({id : item.payload.doc.id}, item.payload.doc.data())
      //   );
      // }))
  }

  // createFavoritesPhoto(photo: FavouritePhoto): Observable<void> {
  //   return this.addDataToDatabase(photo).pipe(
  //     switchMap(() => this.getAll())
  //   )
  // }

  addDataToDatabase(photo: FavouritePhoto): Observable<any>{
    return from(this.db.collection('favourite').add(photo));
  }
}

// https://github.com/angular/angularfire