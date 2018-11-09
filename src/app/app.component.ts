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
        if (window.scrollY >= 100) {
            myNav.classList.add('nav-link-small');
            myNav.classList.remove('nav-large');
        } else {
            myNav.classList.add('nav-large');
            myNav.classList.remove('nav-link-small');
        }
    }

    public toggleMenu() {
        this.showMenu = !this.showMenu;
        console.log('show menu', this.showMenu);
    }


}
