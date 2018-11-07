import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {Gallery1Service} from '../services/gallery1.service';
import {environment} from '../environments/environment';
import {AngularFireStorageModule} from 'angularfire2/storage';
import {LoaderComponent} from './common/loader/loader.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatProgressSpinnerModule} from '@angular/material';
import {GalleryComponent} from './pages/gallery/gallery.component';
import {AboutComponent} from './pages/about/about.component';
import {HomeComponent} from './pages/home/home.component';
import {HttpClientModule} from '@angular/common/http';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import {ContactComponent} from './pages/contact/contact.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';
import {ModalComponent} from './common/modal';
import {ModalService} from '../services/modal.service';
import {AppRoutingModule} from './app-routing.module';

@NgModule({
    declarations: [
        AppComponent,
        GalleryComponent,
        HomeComponent,
        AboutComponent,
        LoaderComponent,
        PageNotFoundComponent,
        ContactComponent,
        ModalComponent,
    ],
    imports: [
        BrowserModule,
        RouterModule,
        AppRoutingModule,
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        AngularFireStorageModule,
        AngularFireAuthModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        NgbModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
    ],
    providers: [
        Gallery1Service,
        ModalService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
