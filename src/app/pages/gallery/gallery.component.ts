import {Component, HostListener, OnInit, Renderer2, ViewChild} from '@angular/core';
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
    public isChevron = true;
    public showDialog = false;
    public selectedImageIndex;
    public selectedImage = {};
    public innerWidth: any;

    constructor(private db: AngularFireDatabase, private dbStorage: AngularFireStorage,
                private route: ActivatedRoute, private renderer: Renderer2) {
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

    public goToTravel() {
        document.getElementById('travel').scrollIntoView({block: 'center', behavior: 'smooth'});
    }

    public openModal(index: number) {
        this.selectedImageIndex = index;
        // this.selectedImage = _.find(this.selectedCountryPics, {'index': index});
        this.selectedImage = this.selectedCountryPics[index];
        this.showDialog = !this.showDialog;
        this.renderer.addClass(document.body, 'modal-open');

    }
}
