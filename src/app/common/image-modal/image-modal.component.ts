import {Component, EventEmitter, HostListener, Input, OnInit, Output, Renderer2} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {GalleryImage} from '../../models/image.model';

@Component({
    selector: 'app-image-modal',
    templateUrl: './image-modal.component.html',
    styleUrls: ['./image-modal.component.scss'],
    animations: [
        trigger('dialog', [
            transition('void => *', [
                style({transform: 'scale3d(.3, .3, .3)'}),
                animate(100)
            ]),
            transition('* => void', [
                animate(100, style({transform: 'scale3d(.0, .0, .0)'}))
            ])
        ])
    ]
})
export class ImageModalComponent implements OnInit {
    @Input() closable = true;
    @Input() visible: boolean;
    @Input() currentIndex: number;
    @Input() images: GalleryImage[];
    @Input() currentImage: GalleryImage;
    @Input() innerWidth: any;
    @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private renderer: Renderer2) {
    }

    @HostListener('document:keydown', ['$event'])
    onKeyDownHandler(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            this.closeModal();
        }
    }

    ngOnInit() {
    }

    closeModal() {
        this.visible = false;
        this.visibleChange.emit(this.visible);
        this.renderer.removeClass(document.body, 'modal-open');
    }

    previousImage() {
        this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.currentIndex;
        this.currentImage = this.images[this.currentIndex];
    }

    nextImage() {
        this.currentIndex = this.currentIndex < this.images.length - 1 ? this.currentIndex + 1 : this.currentIndex;
        this.currentImage = this.images[this.currentIndex];

    }

}
