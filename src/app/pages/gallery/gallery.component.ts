import { Component, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';
import { ActivatedRoute } from '@angular/router';
import { GalleryImage } from '../../models/image.model';
import { ImageGalleryService } from '../../../services/image-gallery.service';
import { map } from 'rxjs/operators';
import { ImageGallery } from '../../../models/gallery.model';

@Component({
    selector: 'app-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
    @ViewChild('travel') travel: any;

    countriesMock = ['guatemala', 'belize', 'portugal', 'ireland', 'italy', 'germany', 'france', 'england', 'switzerland', 'studio'];
    public selectedCountryPics: GalleryImage[] = [];
    public loaded = false;
    public isLongLoading = false;
    public selectedCountry = null;
    public isChevron = true;
    public showDialog = false;
    public selectedImageIndex = 0;
    public selectedImage = {};
    public innerWidth: any;
    public countries: any[];
    public selectedGallery: ImageGallery[] = [];

    public noImages = false;

    constructor(private db: AngularFireDatabase, private dbStorage: AngularFireStorage,
                private route: ActivatedRoute, private renderer: Renderer2, private galleryService: ImageGalleryService) {
    }

    @HostListener('window:scroll', [])
    onWindowScroll() {
        if (window.scrollY >= 20) {
            this.isChevron = false;
        } else {
            this.isChevron = true;
        }
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.innerWidth = window.innerWidth;
    }

    ngOnInit() {
        this.innerWidth = window.innerWidth;

        this.galleryService.getCountries().valueChanges().subscribe(countries => {
            this.countries = countries;
        });

        this.route.paramMap.subscribe(params => {
                const c = params.get('country');
                if (c) {
                    this.countrySelected(c);
                } else {
                    this.selectedCountry = 'TRAVELS';
                    this.selectedCountryPics = [];

                    this.galleryService.getGalleryByCountry('banners')
                        .snapshotChanges().pipe(
                        map(changes =>
                            changes.map(cn => ({key: cn.payload.key, ...cn.payload.val()}))))
                        .subscribe(images => {
                            this.selectedGallery = images.sort((a, b) => {
                                return a.index - b.index;
                            });
                            this.loaded = true;
                            console.log('selected gallery', this.selectedGallery);
                        });


                    // const promises = this.countriesMock.map((country, idx) => {
                    //     if (this.dbStorage.storage.ref().child('banners/' + country + '.jpg')) {
                    //         const imageStorageRef = this.dbStorage.storage.ref().child('banners/' + country + '.jpg');
                    //         const image = new Image();
                    //         return imageStorageRef.getDownloadURL().then(url => {
                    //             image.src = url;
                    //             return {index: idx, name: country, url: url, image: image};
                    //         });
                    //     }
                    // });
                    //
                    // Promise.all(promises).then((results) => {
                    //     this.selectedCountryPics = results;
                    //     const loadAll = new Array(10);
                    //     loadAll.fill(false);
                    //     this.selectedCountryPics.map((pic, idx) => {
                    //         if (!pic.image.complete) {
                    //             pic.image.onload = () => {
                    //                 loadAll[idx] = true;
                    //                 if (loadAll.every(i => i === true)) {
                    //                     this.loaded = true;
                    //                 }
                    //             };
                    //         } else {
                    //             loadAll[idx] = true;
                    //             if (loadAll.every(i => i === true)) {
                    //                 this.loaded = true;
                    //             }
                    //         }
                    //     });
                    // });


                }
            }
        );
    }

    countrySelected(country: string) {
        this.selectedCountryPics = [];
        this.selectedCountry = country.toLowerCase();
        this.loaded = false;

        this.galleryService.getGalleryByCountry(this.selectedCountry)
            .snapshotChanges().pipe(
            map(changes =>
                changes.map(cn => ({key: cn.payload.key, ...cn.payload.val()}))))
            .subscribe(images => {
                this.selectedGallery = images.sort((a, b) => {
                    return a.index - b.index;
                }).map(img => {
                    img.thumbnailImgElement = new Image();
                    img.thumbnailImgElement.src = img.urlThumbnailPic;
                    img.thumbnailImgElement.onload = () => {
                        this.loaded = true;
                    };
                    return img;
                });

                this.selectedGallery.forEach(img => {
                    img.mainImgElement = new Image();
                    img.mainImgElement.src = img.urlMainPic;
                    img.mainImgElement.onload = () => {
                    };
                });

                if (this.selectedGallery.length === 0) {
                    this.noImages = true;
                    this.loaded = true;
                }
                console.log('selected gallery', this.selectedGallery);
            });

        // const promises = this.countriesMock.map((el, i) => {
        //     if (this.dbStorage.storage.ref().child(country + '/' + (i + 1) + '.jpg')) {
        //         const imageStorageRef = this.dbStorage.storage.ref().child(country + '/' + (i + 1).toString() + '.jpg');
        //         const image = new Image();
        //         return imageStorageRef.getDownloadURL().then(url => {
        //             image.src = url;
        //             return {index: i, name: country, url: url, image: image};
        //         });
        //     }
        // });
        // Promise.all(promises).then((results) => {
        //     this.selectedCountryPics = results;
        //     const loadAll = new Array(10);
        //     loadAll.fill(false);
        //     const startTime = new Date();
        //     this.selectedCountryPics.map((pic, idx) => {
        //         if (!pic.image.complete) {
        //             pic.image.onload = () => {
        //                 const endTime = new Date();
        //                 let timeDiff = endTime.getTime() - startTime.getTime();
        //                 timeDiff /= 1000;
        //                 if (Math.round(timeDiff) > 5) {
        //                     this.isLongLoading = true;
        //                 } else {
        //
        //                     this.isLongLoading = false;
        //                 }
        //                 loadAll[idx] = true;
        //                 if (loadAll.every(i => i === true)) {
        //                     this.loaded = true;
        //                 }
        //             };
        //         } else {
        //             loadAll[idx] = true;
        //             if (loadAll.every(i => i === true)) {
        //                 this.loaded = true;
        //             }
        //         }
        //     });
        // });
    }

    public goToTravel() {
        document.getElementById('travel').scrollIntoView({block: 'center', behavior: 'smooth'});
    }

    public openModal(index: number) {
        this.selectedImageIndex = index;
        // this.selectedImage = _.find(this.selectedCountryPics, {'index': index});
        // this.selectedImage = this.selectedCountryPics[index];
        this.showDialog = !this.showDialog;
        this.renderer.addClass(document.body, 'modal-open');

    }
}
