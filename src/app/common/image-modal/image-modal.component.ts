import { Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, Renderer2, SimpleChanges } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { ImageGallery } from '../../../models/gallery.model';

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
export class ImageModalComponent implements OnInit, OnChanges {
    @Input() closable = true;
    @Input() visible = false;
    @Input() currentIndex = 0;
    @Input() images: ImageGallery[] = [];
    @Input() innerWidth: number;
    @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() currentIndexChange: EventEmitter<number> = new EventEmitter<number>();

    public currentImage: ImageGallery = null;

    constructor(private renderer: Renderer2) {
    }

    @HostListener('document:keydown', ['$event'])
    onKeyDownHandler(event: KeyboardEvent) {
        if (event.key === 'Escape' && this.visible) {
            this.closeModal();
        } else if (event.key === 'ArrowLeft' && this.visible) {
            this.previousImage();
        } else if (event.key === 'ArrowRight' && this.visible) {
            this.nextImage();
        }
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        this.currentImage = this.images.find(img => img.index === this.currentIndex);
    }

    closeModal() {
        this.visible = false;
        this.currentIndex = null;
        this.visibleChange.emit(this.visible);
        this.currentIndexChange.emit(this.currentIndex);
        this.renderer.removeClass(document.body, 'modal-open');
    }

    previousImage() {
        this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.images.length - 1;
        this.currentImage = this.images[this.currentIndex];
    }

    nextImage() {
        this.currentIndex = this.currentIndex < this.images.length - 1 ? this.currentIndex + 1 : 0;
        this.currentImage = this.images[this.currentIndex];
    }

}
