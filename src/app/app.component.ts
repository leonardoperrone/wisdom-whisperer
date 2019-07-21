import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    @ViewChild('navbarNavAltMarkup') navbarNavAltMarkup: ElementRef;

    public showMenu = false;
    public isNavOpen = false;
    public innerWidth: any;


    @HostListener('window:scroll', [])
    onWindowScroll() {
        const myNav = document.getElementById('mynav');
        this.innerWidth = window.innerWidth;
        if (window.scrollY >= 50 && this.innerWidth > 768) {
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

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.innerWidth = window.innerWidth;
    }

    public toggleMenu(element: HTMLButtonElement) {
        this.innerWidth = window.innerWidth;
        const ariaExtended = element.getAttribute('aria-expanded');
        this.isNavOpen = !(ariaExtended === 'true');
        console.log('inner width', this.innerWidth);
        console.log('is aria ', ariaExtended);
        console.log('is nav open', this.isNavOpen);

    }

    public closeMenu(element: HTMLButtonElement) {
        if (this.innerWidth <= 768) {
            this.toggleMenu(element);
            this.navbarNavAltMarkup.nativeElement.classList.remove('show');
        }
    }

}
