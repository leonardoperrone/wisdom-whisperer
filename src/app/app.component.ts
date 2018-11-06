import {Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  public showMenu = false;


  public toggleMenu() {
    this.showMenu = !this.showMenu;
    console.log('show menu', this.showMenu);
  }

}
