import {Component, OnInit, ViewChild} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireStorage} from 'angularfire2/storage';
import {ActivatedRoute} from '@angular/router';
import {GalleryImage} from '../../models/image.model';

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
    public selectedCountry = null;

    constructor(private db: AngularFireDatabase, private dbStorage: AngularFireStorage,
                private route: ActivatedRoute) {
    }


    ngOnInit() {
        // console.log(this.imageTesting.src);
        this.route.paramMap.subscribe(params => {
            const c = params.get('country');
            if (c) {
                this.countrySelected(c);
            } else {
                this.selectedCountry = 'TRAVELS';
                this.selectedCountryPics = [];

                const promises = this.countriesMock.map((country, idx) => {
                    if (this.dbStorage.storage.ref().child('banners/' + country + '.jpg')) {
                        const imageStorageRef = this.dbStorage.storage.ref().child('banners/' + country + '.jpg');
                        const image = new Image();
                        return imageStorageRef.getDownloadURL().then(url => {
                            image.src = url;
                            return {index: idx, name: country, url: url, image: image};
                            // this.selectedCountryPics.push({index: idx, name: country, url: url});
                        });
                    }
                });

                Promise.all(promises).then((results) => {
                    this.selectedCountryPics = results;
                    const loadAll = new Array(10);
                    loadAll.fill(false);
                    this.selectedCountryPics.map((pic, idx) => {
                        if (!pic.image.complete) {
                            pic.image.onload = () => {
                                // console.log('i', ix);
                                loadAll[idx] = true;
                                if (loadAll.every(i => i === true)) {
                                    this.loaded = true;
                                }
                            };
                        } else {
                            loadAll[idx] = true;
                            if (loadAll.every(i => i === true)) {
                                this.loaded = true;
                            }
                        }
                    });
                });


            }
        });
    }

    countrySelected(country: string) {
        // this.router.navigate(['gallery', country]);
        this.selectedCountryPics = [];
        this.selectedCountry = country;
        this.loaded = false;

        const promises = this.countriesMock.map((el, i) => {
            if (this.dbStorage.storage.ref().child(country + '/' + (i + 1) + '.jpg')) {
                const imageStorageRef = this.dbStorage.storage.ref().child(country + '/' + (i + 1).toString() + '.jpg');
                const image = new Image();
                return imageStorageRef.getDownloadURL().then(url => {
                    image.src = url;
                    return {index: i, name: country, url: url, image: image};
                });
            }
        });
        Promise.all(promises).then((results) => {
            this.selectedCountryPics = results;
            const loadAll = new Array(10);
            loadAll.fill(false);
            this.selectedCountryPics.map((pic, idx) => {
                if (!pic.image.complete) {
                    pic.image.onload = () => {
                        // console.log('i', ix);
                        loadAll[idx] = true;
                        if (loadAll.every(i => i === true)) {
                            this.loaded = true;
                        }
                    };
                } else {
                    loadAll[idx] = true;
                    if (loadAll.every(i => i === true)) {
                        this.loaded = true;
                    }
                }
            });

            // console.log(document.getElementById('img-gallery').complete);
        });
    }

    public goToTravel() {
        document.getElementById('travel').scrollIntoView({block: 'center', behavior: 'smooth'});
    }

    // openImageModal(content, image: GalleryImage) {
    //   this.modalService.open(content, {size: 'lg'});
    //   this.imageModal = image;
    //   this.imageModalUrl = image.url;
    // }
    // openModal(id: string, image: GalleryImage) {
    //     console.log('openModal', id);
    //     this.modalService.open(id);
    // }
    //
    // closeModal(id: string) {
    //     this.modalService.close(id);
    // }

}
