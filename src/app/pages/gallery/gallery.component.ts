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
    styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
    @ViewChild('travel') travel: any;

    countriesMock = ['guatemala', 'belize', 'portugal', 'ireland', 'italy', 'germany', 'france', 'england', 'switzerland', 'studio'];
    public selectedCountryPics: GalleryImage[] = [];
    public loaded = false;
    public selectedCountry = null;
    public isChevron = true;
    public showDialog = false;
    public selectedImageIndex = 0;
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
    }

    public goToTravel() {
        document.getElementById('travel').scrollIntoView({block: 'start', behavior: 'smooth'});
    }

    public openModal(index: number) {
        this.selectedImageIndex = index;
        // this.selectedImage = _.find(this.selectedCountryPics, {'index': index});
        // this.selectedImage = this.selectedCountryPics[index];
        this.showDialog = !this.showDialog;
        this.renderer.addClass(document.body, 'modal-open');

    }
}
