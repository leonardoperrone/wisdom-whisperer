import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GalleryComponent} from './pages/gallery/gallery.component';
import {AboutComponent} from './pages/about/about.component';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import {ContactComponent} from './pages/contact/contact.component';
import {CommonModule} from '@angular/common';


const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: GalleryComponent,
    },
    {
        path: 'home/:country',
        component: GalleryComponent,
    },
    {
        path: 'contact',
        component: ContactComponent,
    },
    {
        path: 'about',
        component: AboutComponent
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];

// export const MyRoutes: ModuleWithProviders = RouterModule.forRoot(routes);

@NgModule({
    imports: [CommonModule, RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule],
})

export class AppRoutingModule {
}