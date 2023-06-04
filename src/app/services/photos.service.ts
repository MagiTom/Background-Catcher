import {inject, Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {PhotosModel, SearchPhotos} from "../models/back-end/photos.model";
import {from, map, Observable, of} from "rxjs";
import {FavouritePhoto} from "../home/state/actions/photos-page.actions";
import {Store} from "@ngrx/store";
import {State} from "../state/app.state";
import {AngularFireDatabase, AngularFireList, AngularFireObject} from "@angular/fire/compat/database";
import {addDoc, collection, collectionData, deleteDoc, doc, Firestore} from "@angular/fire/firestore";
import firebase from "firebase/compat";
import { Filesystem, Directory } from '@capacitor/filesystem';
import firestore = firebase.firestore;

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
  photossRef!: AngularFireList<any>;
  photoRef!: AngularFireObject<any>;

  constructor(private http: HttpClient, private readonly firestore: Firestore, private store: Store<State>) {

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

  deleteFavourite(id: string) {
    const photosDocRef = doc(this.firestore, `favourite/${id}`);
    return from(deleteDoc(photosDocRef));
  }

  getFavouriteList(): Observable<FavouritePhoto[]> {
    return collectionData<any>(collection(this.firestore, 'favourite'), {
      idField: 'id'
    });
  }

  addFavouriteToDatabase(photo: FavouritePhoto) {
    return from(addDoc(collection(this.firestore, "favourite"), photo)).pipe(map(() => photo));
  }


  async downLoadPhoto(webPath: string) {
    const fileName = new Date().getTime() + '.jpeg';
    const base64Data = await this.readAsBase64(webPath);
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data,
    });

    console.log(savedFile);

    // Use webPath to display the new image instead of base64 since it's
    // already loaded into memory
    return {
      filepath: fileName,
      webviewPath: webPath,
    };
  }

  private async readAsBase64(webPath: string) {
    // Fetch the photo, read as a blob, then convert to base64 format
    const response = await fetch(webPath);
    const blob = await response.blob();

    return await this.convertBlobToBase64(blob) as string;
  }

  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });
}

// https://jsmobiledev.com/article/crud-ionic-firestore/
// https://www.c-sharpcorner.com/article/how-to-download-a-file-using-file-transfer-plugin-in-ionic-3/
