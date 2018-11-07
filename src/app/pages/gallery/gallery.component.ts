import {Component, HostListener, OnInit} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireStorage} from 'angularfire2/storage';
import {ActivatedRoute, Router} from '@angular/router';
import {Image} from '../../models/image.model';
import {ModalService} from '../../../services/modal.service';

@Component({
    selector: 'app-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

    countriesMock = ['belize', 'england', 'france', 'germany', 'guatemala', 'ireland', 'italy', 'portugal', 'studio', 'switzerland'];
    public selectedCountryPics: Image[] = [];
    public loaded = false;
    public selectedCountry = null;
    public imageModal: Image;
    public imageModalUrl: string;

    constructor(private db: AngularFireDatabase, private dbStorage: AngularFireStorage, private route: ActivatedRoute, private router: Router, private modalService: ModalService) {
    }

    @HostListener('window:scroll', [])
    onWindowScroll() {
        const myNav = document.getElementById('mynav');
        if (window.scrollY >= 200) {
            myNav.classList.add('nav-colored');
            myNav.classList.remove('nav-transparent');
        } else {
            myNav.classList.add('nav-transparent');
            myNav.classList.remove('nav-colored');
        }
    }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            const c = params.get('country');
            if (c) {
                this.countrySelected(c);
            } else {
                this.selectedCountry = 'TRAVELS';
                this.countriesMock.map((country) => {
                    const url = 'assets/images/banners/' + country + '.jpg';
                    this.selectedCountryPics.push({name: country, url: url});
                    if (this.selectedCountryPics.length === 10) {
                        this.loaded = true;
                    }
                });
                // this.countriesMock.map((country, idx) => {
                //     if (this.dbStorage.storage.ref().child('banners/' + country + '.jpg')) {
                //         const imageStorageRef = this.dbStorage.storage.ref().child('banners/' + country + '.jpg');
                //         imageStorageRef.getDownloadURL().then(url => {
                //             console.log('url', this.selectedCountryPics.length);
                //             this.selectedCountryPics.push({index: idx, name: country, url: url});
                //
                //             if (this.selectedCountryPics.length === 9) {
                //                 this.loaded = true;
                //             }
                //         });
                //     }
                // });
            }
        });
    }

    countrySelected(country: string) {
        // this.router.navigate(['gallery', country]);
        this.selectedCountryPics = [];
        this.selectedCountry = country;
        this.loaded = false;

        for (let i = 0; i < 10; i++) {
            if (this.dbStorage.storage.ref().child(country + '/' + (i + 1) + '.jpg')) {
                const imageStorageRef = this.dbStorage.storage.ref().child(country + '/' + (i + 1).toString() + '.jpg');
                imageStorageRef.getDownloadURL().then(url => {
                    this.selectedCountryPics.push({index: i, name: country, url: url});
                    if (this.selectedCountryPics.length === 10) {
                        this.loaded = true;
                    }
                });
            }
        }
    }

    // openImageModal(content, image: Image) {
    //   this.modalService.open(content, {size: 'lg'});
    //   this.imageModal = image;
    //   this.imageModalUrl = image.url;
    // }
    openModal(id: string, image: Image) {
        console.log('openModal', id);
        this.modalService.open(id);
    }

    closeModal(id: string) {
        this.modalService.close(id);
    }

}
