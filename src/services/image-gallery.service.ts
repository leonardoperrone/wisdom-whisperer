import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { ImageGallery } from '../models/gallery.model';

@Injectable({
    providedIn: 'root'
})
export class ImageGalleryService {
    public basePath = '/uploads';

    constructor(private db: AngularFireDatabase) {
    }

    getCountries(): AngularFireList<String> {
        console.log(this.db.list('countries'));
        return this.db.list('countries');
    }

    getGalleryByCountry(country: string): AngularFireList<ImageGallery> {
        console.log(country);
        return this.db.list(this.basePath, ref =>
            ref.orderByChild('country').equalTo(country));
    }
}
