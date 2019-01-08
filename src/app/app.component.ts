import {Component, HostListener} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app';
    public showMenu = false;

    @HostListener('window:scroll', [])
    onWindowScroll() {
        const myNav = document.getElementById('mynav');
        if (window.scrollY >= 50) {
            myNav.classList.add('nav-link-small');
            myNav.classList.remove('nav-large');
        } else {
            myNav.classList.add('nav-large');
            myNav.classList.remove('nav-link-small');
        }
        if (window.scrollY >= 50) {
            myNav.classList.add('nav-colored');
            myNav.classList.remove('nav-transparent');
        } else {
            myNav.classList.add('nav-transparent');
            myNav.classList.remove('nav-colored');
        }
    }

    public toggleMenu() {
        this.showMenu = !this.showMenu;
    }


}
