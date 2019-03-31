import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Picture} from '../models/gallery.model';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { map } from "rxjs/operators";

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class Gallery1Service {
  private picUrl = 'http://localhost:4200/assets/pictures.json';

  constructor(private http: HttpClient, private db: AngularFireDatabase) {
  }

  public getPictures(): Observable<Picture[]> {
    return this.http.get(this.picUrl).pipe(
      map((response: Response) => <Picture[]> response.json()
      .tap(data => console.log(data))
      .catch(this.handleError)));
  }

  public getPicture(id: number): Observable<Picture> {
    return this.getPictures().pipe(
      map((pictures: Picture[]) => pictures.find(p => p.id === id)));
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  public getCourses(listPath): Observable<any[]> {
    return this.db.list(listPath).valueChanges();
  }

  getCountries(): AngularFireList<String> {
    console.log(this.db.list('countries'));
    return this.db.list('countries');
  }

}
